/** 进程空间 16MB
 * 虚拟机一个单位逻辑上是1字节，实际上每个字节都是用1个8字节number表示
 * |——————————————————————| 0MB 0x00000000
 * |                      | 代码段（指针不可访问，随解释执行向下生长）
 * |                      | 
 * |——————————————————————| 2MB 0x001fffff
 * |                      | 全局变量段
 * |                      |
 * |——————————————————————| 4MB 0x003fffff 
 * |          堆          | （堆从小地址向大地址生长）
 * |          |           |
 * |          √           |
 * |                      |
 * |                      |
 * |                      |
 * |                      |
 * |          ^           |
 * |          |           |
 * |          栈          | （栈从大地址向小地址生长）
 * |——————————————————————| 16MB 0x00ffffff
 * 
 * 采用大端法存储
 * 例如 0x12345678
 * | 0x12 | 0x34 | 0x56 | 0x78 |
 * --->     地址从小到大     --->
 */
var id = 0//当前被调用的函数ID
var code = new Array();//代码段
var ip = 0;//IP寄存器
var globalSpace = new Array();//全局变量空间
var stack = new Array();//栈空间
var heap = new Array();//堆空间
var cp = -1;//代码偏移指针
var gp = -1;//全局变量偏移指针
var hp = -1;//堆偏移指针
var sp = -1;//栈偏移指针
var bp = 0;//帧指针
var cbp = 0x00000000;//代码段基指针
var gbp = 0x001fffff;//全局变量基指针
var hbp = 0x003fffff;//堆基指针
var sbp = 0x00ffffff;//栈基指针
var loc = 0;//loc指针
var arg = 0;//arg指针

var funlist = new Array()
funlist[0] = { locNum: 0, argNum: 0, retNum: 0, ip: 0 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip
funlist[1] = { locNum: 0, argNum: 0, retNum: 1, ip: 3 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip
funlist[2] = { locNum: 1, argNum: 0, retNum: 0, ip: 7 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip

function printStack(){
    var l = stack.length
    var out = ""
    for(var i = l-1;i>=0 ;i -=8){
        out = out + '|' + stack[i] + stack[i-1]
            + stack[i-2] + stack[i-3] + stack[i-4]
            + stack[i - 5] + stack[i - 6] + stack[i - 7] + '| 0x00' + (sbp - i).toString(16) + '\n'
    }
    console.log(out)
}

/**
 * 进栈原子操作（只操作一个字节）
 */
function pushStack(num){
    stack.push(num);
    sp += 1;
}

/**
 * 出栈原子操作（只操作一个字节）
 */
function popStack(){
    sp -= 1;
    return stack.pop();
}

/**
 * 获取新的全局变量（单个字节读入）
 */
function getNewCode(newGlobalBit){
    globalSpace.push(newGlobalBit);
    gp += 1;
}

/**
 * 读入指令码
 */
function putNewCode(newCode){
    code.push(newCode);
    cp += 1;
}

/**
 * 绝对逻辑地址访问
 */
function accessAddress(address){
    // console.log("add")
    // console.log(address)
    // console.log("sbp")
    // console.log(sbp)
    // console.log("sp")
    // console.log(sp)
    // console.log("-")
    // console.log(sbp - sp)
    if(address<0x00200000||address>0x00ffffff){
        return "illegal";
    }
    else if(address<0x00400000&&address>0x001fffff){//在全局变量段
        return globalSpace[address-gbp];
    }
    else if(address<0x01000000&&address>0x003fffff){
        // console.log("in!")
        if(address<=(hp+hbp)){//在堆段
            return heap[address];
        }
        else if(address>=(sbp-sp)){//在栈段
            // console.log(stack[sbp-address])
            return stack[sbp-address];
        }
        else{
            return "illegal";
        }
    }
}

// 逻辑地址存储，待补充
function storeAddress(address, val){
    // console.log("add")
    // console.log(address)
    // console.log("sbp")
    // console.log(sbp)
    // console.log("sp")
    // console.log(sp)
    // console.log("-")
    // console.log(sbp - sp)
    // console.log(address) 
    if (address < 0x00200000 || address > 0x00ffffff) {
        print("illegal")
    }
    else if (address < 0x00400000 && address > 0x001fffff) {//在全局变量段
        globalSpace[address - gbp] = val
    }
    else if (address < 0x01000000 && address > 0x003fffff) {
        if (address <= (hp + hbp)) {//在堆段
            heap[address] = val
        }
        else if (address >= (sbp - sp)) {//在栈段
            // console.log(stack[sbp-address])
            stack[sbp - address] = val
        }
        else {
            return "illegal";
        }
    }
}

/**
 * 指令执行模块
 */
function run(){
    if(ip<code.length){
        console.log("ip:[" + ip + "],code:" + code[ip].opt + " " + code[ip].num);
        /**
         * 下面是需要执行的指令
         * 无操作数指令
         * var instruct = {opt:"nop"}
         * 有操作数指令
         * var instruct = {opt:"push",num:100}
         */
        var instruction =  code[ip];//获取此时的指令对象
        // console.log(instruction)
        var opt = instruction.opt;//指令
        var optnum = instruction.num;//指令操作数
        // console.log(opt)
        // console.log(optnum)
        let temp, stemp //临时变量
        switch (opt){
            case "nop":  
                return
                break;
            case "push":
                pushNum(optnum)
                ip += 1
                break;
            case "pop":
                popNum()
                ip += 1
                break;
            case "popn":
                for(let i=0; i<optnum; i++){
                    popNum()
                }
                break;
            case "dup":
                temp = popNum()
                pushNum(temp)
                pushNum(temp)
                break;
            case "loca":  
                temp = sbp - (loc + optnum) 
                pushNum(temp)
                ip += 1
                break;
            case "arga":  
                temp = sbp - (arg + optnum)
                pushNum(temp)
                ip += 1
                break;
            case "globa":  
                pushNum(gbp + bp)
                ip += 1
                break;
            case "load.8":
                loadNum(8)
                ip += 1
                break;
            case "load.16":
                loadNum(16)
                ip += 1
                break;
            case "load.32":
                loadNum(32)
                ip += 1
                break;
            case "load.64":
                loadNum(64)
                ip += 1
                break;
            case "store.8":
                storeNum(8)
                ip += 1
                break;
            case "store.16":
                storeNum(16)
                ip += 1
                break;
            case "store.32":
                storeNum(32)
                ip += 1
                break;
            case "store.64":
                storeNum(64)
                ip += 1
                break;
            case "alloc":  
                break;
            case "free":  
                break;
            case "stackalloc":
                for(var i=0;i<optnum;i++){
                    pushNum(0)
                }
                ip += 1
                break;
            case "add.i": 
                pushNum(BigInt(popNum()) + BigInt(popNum()))
                // temp1 = popNum()
                // temp2 = popNum()
                // console.log(temp1 + temp2)
                // pushNum(temp1 + temp2)
                break;
            case "sub.i":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left - right)
                break;
            case "mul.i":  
                pushNum(BigInt(popNum()) * BigInt(popNum()))
                break;
            case "div.i":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left / right)
                break;
            case "add.f":  
                pushNum(HexToFloat(popBytes()) + HexToFloat(popBytes()))
                break;
            case "sub.f":  
                right = HexToFloat(popBytes())
                left = HexToFloat(popBytes())
                pushNum(left - right)
                break;
            case "mul.f":  
                pushNum(HexToFloat(popBytes()) * HexToFloat(popBytes()))
                break;
            case "div.f":  
                right = HexToFloat(popBytes())
                left = HexToFloat(popBytes())
                pushNum(left / right)
                break;
            case "div.u":  
                right = BigInt(popNum() >>> 0)
                left = BigInt(popNum() >>> 0)
                pushNum(left / right)
                break;
            case "shl":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left << right)
                break;
            case "shr": 
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >> right)
                break;
            case "and":  
                pushNum(BigInt(popNum()) & BigInt(popNum()))
                break;
            case "or":  
                pushNum(BigInt(popNum()) | BigInt(popNum()))
                break;
            case "xor":  
                pushNum(BigInt(popNum()) ^ BigInt(popNum()))
                break;
            case "not":  
                pushNum(!BigInt(popNum()))
                break;
            case "cmp.i":  
                right = popNum()
                left = popNum()
                if (left > right) {
                    pushNum(1n)
                }
                else if (left < right) {
                    pushNum(-1n)
                }
                else {
                    pushNum(0n)
                }
                ip += 1
                break;
            case "cmp.u":   
                left = popNum() >>> 0
                if (left > right) {
                    pushNum(1n)
                }
                else if (left < right) {
                    pushNum(-1n)
                }
                else {
                    pushNum(0n)
                }
                break;
            case "cmp.f":  
                right = HexToFloat(popBytes())
                left = HexToFloat(popBytes())
                if (left > right) {
                    pushNum(1n)
                }
                else if (left < right) {
                    pushNum(-1n)
                }
                else {
                    pushNum(0n)
                }
                break;
            case "neg.i": 
                pushNum(BigInt(-popNum())) 
                break;
            case "neg.f":  
                pushNum(-HexToFloat(popBytes()))
                break;
            case "itof":  
                pushNum(parseInt(popBytes(), 16))
                break;
            case "ftoi": 
                pushNum(BigInt(parseInt(HexToFloat(popBytes())))) 
                break;
            case "shrl":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >>> right)
                break;
            case "set.lt":
                temp = popNum()
                if(temp<0)
                    pushNum(1)
                else
                    pushNum(0)
                break;
            case "set.gt":
                temp = popNum()
                if(temp>0)
                    pushNum(1)
                else
                    pushNum(0)
                break;
            case "br":
                ip += optnum
                break;
            case "br.false":
                temp = popNum()
                if(temp===0)
                    ip += optnum
                break;
            case "br.true":
                temp = popNum()
                if(temp!==0)
                    ip += optnum
                break;
            /**
             * | -            | < - 栈顶（表达式栈）
             * | d            | ↑          loc.1
             * | c            | 局部变量   loc.0
             * |==============| 
             * | id           |
             * | % ip         |  
             * | % bp         | 虚拟机数据 <-BP
             * |==============|
             * | b            | ↑          arg.2
             * | a            | 参数       arg.1
             * | _ret         | 返回值     arg.0
             * | ...          |
            */
            case "call":  
                pushNum(bp)
                console.log("oldbp: 0x00" + (sbp - bp).toString(16))
                console.log("newbp: 0x00" + (sbp - sp).toString(16))
                bp = sp
                pushNum(ip+1)
                ip = funlist[optnum].ip
                pushNum(id)
                id = optnum
                arg = bp - (funlist[id].argNum*8 + 8*funlist[id].retNum) - 9
                loc = bp + 3*8
                console.log("arg:"+arg)
                console.log("loc:" + loc)
                sp = loc + funlist[id].locNum
                for (var i = 0; i < funlist[id].locNum ; i ++){
                    pushNum(0)
                }
                break;
            case "ret": 
                sp = bp + 2*8 +1
                while(stack.length>sp){
                    stack.pop()
                }
                // printStack()
                console.log("newbp:"+bp)
                console.log("sp:" + sp)
                // console.log("newbp: 0x00" + (sbp - bp).toString(16))
                // console.log("sp: 0x00" + (sbp-sp).toString(16))
                id = popNum()
                // printStack()
                console.log("id:" + id)
                ip = popNum()
                // printStack()
                console.log("ip:" + ip)
                bp = popNum()
                // printStack()
                console.log("bp:" + bp)
                sp = arg
                arg = bp - (funlist[id].argNum + funlist[id].retNum)
                loc = bp + 2
                sp = loc + funlist[id].locNum
                printStack()
                run()
                break;
            case "callname":  break;
            case "scan.i":  break;
            case "scan.c":  break;
            case "scan.f":  break;
            case "print.i":  break;
            case "print.c":  break;
            case "print.f":  break;
            case "print.s":  break;
            case "println":  break;
            case "panic":  break;
        }
        printStack()
        run();
    }
    else{
        return;
    }
}

// 输入要入栈的数字，位数默认64，执行大端法入栈操作
function pushNum(num){
    if(num<0){
        num = 0xffffffff + num
    }
    else if(num >= 0xffffffff){
        num = Number(num) - 0xffffffff
    }
    let bits=64
    if(bits%4!==0)
        bits = bits-(bits%4)+4
    bits /= 4
    let snum = num.toString(16)
    // console.log(snum)
    if(snum.length>=bits){
        snum = snum.substr(snum.length-bits)
    }
    else {
        for(let i=bits-snum.length; i>0; i--)
            snum = "0" + snum
    }
    // console.log(num)
    // console.log(num.toString(16))
    for(i=bits - 2; i>=0; i-=2){
        // subsnum = snum.substr(i, 2)
        // console.log(subsnum)
        // console.log(parseInt(subsnum, 16))
        // pushStack(parseInt(subsnum, 16))
        pushStack(snum.substr(i, 2))
    }
}

// 位数默认64，执行大端法出栈操作
function popNum(){
    let bits=64
    if(bits%4!==0)
        bits = bits-(bits%4)+4
    if(bits>64)
        throw new Error("error bits")
    bits /= 8
    num = ""
    for(let i=bits - 1; i>=0; i--){
        num =  num + popStack()
        // console.log(num)
    }
    // console.log(parseInt(num, 16))
    var out = parseInt(num, 16)
    if(out > 0xffffffff){
        out = out - 0xffffffff
    }
    return out
}

// 用于load.x
function loadNum(bits){
    if(bits%8!==0)
        throw new Error("error bits")
    bits /= 8
    let stemp="", addr = popNum()
    // console.log(addr)
    // console.log(0x0123456789abcdef)
    for(let i=0; i<bits ; i++){
        stemp = accessAddress(addr-i) + stemp
    }
    pushNum(stemp)
    // return parseInt(stemp, 16)
}

// 用于store.x
function storeNum(bits){
    if(bits%8!==0)
        throw new Error("error bits")
    bits /= 4
    let val = popNum(), addr = popNum()
    // console.log("1")
    // console.log(val)
    // console.log(addr)
    let snum = val.toString(16)
    if(snum.length>=bits){
        snum = snum.substr(snum.length-bits)
    }
    else {
        for(let i=bits-snum.length; i>0; i--)
            snum = snum + "0"
    }
    for(let i=0; i<bits; i+=2){
        storeAddress(addr+i/2, snum.substr(bits-2-i, 2))
        //stemp = accessAddress(addr-i) + stemp
    }
    // return parseInt(stemp, 16)
}

function pushBytes(snum) {
    for (let i = 0; i < 16; i += 2) {
        // subsnum = snum.substr(i, 2)
        // console.log(subsnum)
        // console.log(parseInt(subsnum, 16))
        // pushStack(parseInt(subsnum, 16))
        pushStack(snum.substr(i, 2))
    }
}

// 位数默认64，执行大端法出栈操作
function popBytes() {
    let bits = 64
    if (bits % 4 !== 0)
        bits = bits - (bits % 4) + 4
    if (bits > 64)
        throw new Error("error bits")
    bits /= 8
    num = ""
    for (let i = 0; i < bits; i++) {
        num = popStack() + num
    }
    // return parseInt(num, 16)
    // 根据其他指令选择int或double解释
    return num
}

/*function popNum() {
    return parseInt(popBytes(), 16)
}*/

function SingleToHex(num) {
    if (num == "") {
        return "";
    }

    num = parseFloat(num);
    if (isNaN(num) == true) {
        throw new Error("wrong float");
    }
    if (num == 0) {
        return "0000000000000000";
    }
    var s, e, f;
    if (num > 0) {
        s = 0;
    }
    else {
        s = 1;
        num = - num;
    }
    f = num.toString(2);
    if (f >= 1) {
        if (f.indexOf(".") == -1) {
            f = f + ".0";
        }
        e = f.indexOf(".") - 1;
    }
    else {
        e = 1 - f.indexOf("1");
    }
    if (e >= 0) {
        f = f.replace(".", "");
    }
    else {
        f = f.substring(f.indexOf("1"));
    }
    if (f.length > 53) {
        f = f.substr(0, 53);
    }
    else {
        f = FillString(f, 53, false)
    }
    f = f.substring(1);
    e = (e + 1023).toString(2);
    e = FillString(e, 11, true);
    var r = parseInt(s + e + f, 2).toString(16);
    FillString(r, 8, true);
    return r
}

function HexToFloat(bytes) {
    var n = parseInt(bytes, 16).toString(2)
    n = FillString(n, 64, true);
    var s = n.substring(0, 1);
    var e = n.substring(1, 12);
    var f = n.substring(12);
    if (e != 0) f = "1" + f;
    e = parseInt(e, 2) - 1023;
    if (e >= 0) {
        f = f.substr(0, e + 1) + "." + f.substring(e + 1)
    }
    else {
        f = "0." + FillString(f, f.length - e - 1, true)
    }
    if (f.indexOf(".") == -1) {
        f = f + ".0";
    }
    var a = f.split(".");
    var mi = parseInt(a[0], 2);
    var mf = 0;
    for (var i = 0; i < a[1].length; i++) {
        mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
    }
    f = mi + mf;
    if (s == 1) {
        f = 0 - f;
    }
    return f;
}

/**
 * 字符串加前/后缀0
 * @param {} t 要处理的字符串
 * @param {} n 总长
 * @param {} b true:前 false:后
 */
function FillString(t, n, b) {
    if ((t == "") || (n <= t.length)) {
        return t;
    }
    var l = t.length;
    for (let i = 0; i < n - l; i++) {
        if (b == true) {
            t = '0' + t;
        }
        else {
            t += '0';
        }
    }
    return t;
}