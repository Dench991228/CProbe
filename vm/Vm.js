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
var bp = 7;//帧指针
var cbp = 0x00000000;//代码段基指针
var gbp = 0x001fffff;//全局变量基指针
var hbp = 0x003fffff;//堆基指针
var sbp = 0x00ffffff;//栈基指针
var loc = 0;//loc指针
var arg = 0;//arg指针

var funlist = new Array()
//funlist[0] = { locNum: 0, argNum: 0, retNum: 0, ip: 0 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip
//funlist[1] = { locNum: 0, argNum: 0, retNum: 1, ip: 3 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip
//funlist[2] = { locNum: 1, argNum: 0, retNum: 1, ip: 7 }//funlist[id].argNum + funlist[id].retNum + funlist[id].locNum + funlist[optnum].ip

function runAll(codeList,functionList,globalList){
    code = codeList
    funlist = functionList
    globalSpace = globalList
    while (code[ip].opt != "exit") {
        run();
    }
}

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
                ip += 1
                break;
            case "push":
                var num = optnum
                if (num < 0) {
                    num = 0xffffffff + num + 1
                }
                else if (num > 0xffffffff) {
                    num = Number(num) - 0xffffffff
                }
                pushNum(num)
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
                ip += 1
                break;
            case "loca":  
                temp = loc - 8*optnum 
                pushNum(temp)
                ip += 1
                break;
            case "arga":  
                temp = arg - 8*optnum
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
                ip += 1
                // temp1 = popNum()
                // temp2 = popNum()
                // console.log(temp1 + temp2)
                // pushNum(temp1 + temp2)
                break;
            case "sub.i":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left - right)
                ip += 1
                break;
            case "mul.i":  
                right = popNum()
                left = popNum()
                var res = 0
                var x = Number(left)
                var y = Number(right)
                for (var i = 0; i < 32; i++) {//32位长度为满足测试数据，大小可根据实际修改 
                    if ((y & 1) == 1) {//y的最低位是否为1
                        res += x;//计算相乘的结果 
                    }
                    x <<= 1;
                    y >>= 1;
                }
                pushNum(res)
                ip += 1
                break;
            case "div.i":  
                right = popNum()//除数
                left = popNum()//被除数
                var result,fuhao=0;
                if(right>0x7fffffff){
                    fuhao += 1
                    right = 0xffffffff - right + 1
                }
                if(left>0x7ffffffff){
                    fuhao += 1
                    left = 0xffffffff - left + 1
                }
                result = left/right
                if(fuhao == 1){
                    result = 0xffffffff - result + 1
                }
                pushNum(result)
                ip += 1
                break;
            case "add.f": 
                right = popBytes()
                left = popBytes()
                pushNum(SingleToHex(HexToFloat(left) + HexToFloat(right)))
                // pushNum(HexToFloat(popBytes()) + HexToFloat(popBytes()))
                ip += 1
                break;
            case "sub.f":  
                right = popBytes()
                left = popBytes()
                pushNum(SingleToHex(HexToFloat(left) - HexToFloat(right)))
                ip += 1
                break;
            case "mul.f":  
                pushNum(SingleToHex(HexToFloat(popBytes()) * HexToFloat(popBytes())))
                ip += 1
                break;
            case "div.f":  
                right = HexToFloat(popBytes())
                left = HexToFloat(popBytes())
                var result = left / right
                console.log(right)
                console.log(left)
                console.log(result)
                pushNum(SingleToHex(result))
                ip += 1
                break;
            case "div.u":  
                right = BigInt(popNum() >>> 0)
                left = BigInt(popNum() >>> 0)
                console.log(right)
                console.log(left)
                console.log(left / right)
                pushNum(left / right)
                ip += 1
                break;
            case "shl":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left << right)
                ip += 1
                break;
            case "shr": 
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >> right)
                ip += 1
                break;
            case "and":  
                pushNum(BigInt(popNum()) & BigInt(popNum()))
                ip += 1
                break;
            case "or":  
                pushNum(BigInt(popNum()) | BigInt(popNum()))
                ip += 1
                break;
            case "xor":  
                pushNum(BigInt(popNum()) ^ BigInt(popNum()))
                ip += 1
                break;
            case "not":  
                temp = popNum()
                res = ~ temp
                if (res < 0) {
                    res = 0xffffffff + res + 1
                }
                else if (res > 0xffffffff) {
                    res = Number(res) - 0xffffffff
                }
                pushNum(res)
                ip += 1
                break;
            case "cmp.i":  
                right = popNum()
                left = popNum()
                right_fu = 0
                left_fu = 0
                if(right > 0x7fffffff){
                    right_fu = 1
                    right = 0xffffffff + 1 - right
                }
                if (left > 0x7fffffff){
                    left_fu = 1
                    left = 0xffffffff + 1 - left
                }
                if((left_fu + right_fu) == 1){
                    if (right_fu == 1) {
                        pushNum(1)
                    }
                    else {
                        pushNum(0xffffffff)
                    }
                }
                else {
                    if (left > right) {
                        pushNum(1)
                    }
                    else if (left < right) {
                        pushNum(0xffffffff)
                    }
                    else {
                        pushNum(0)
                    }
                }
                ip += 1
                break;
            case "cmp.u":   
                right = popNum()
                left = popNum()
                if (left > right) {
                    pushNum(1)
                }
                else if (left < right) {
                    pushNum(0xffffffff)
                }
                else {
                    pushNum(0)
                }
                ip += 1
                break;
            case "cmp.f":  
                right = HexToFloat(popBytes())
                left = HexToFloat(popBytes())
                if (left > right) {
                    pushNum(1)
                }
                else if (left < right) {
                    pushNum(0xffffffff)
                }
                else {
                    pushNum(0)
                }
                ip += 1
                break;
            case "neg.i": 
                pushNum(BigInt(-popNum())) 
                ip += 1
                break;
            case "neg.f":  
                pushNum(-HexToFloat(popBytes()))
                ip += 1
                break;
            case "itof":  
                num = popNum()
                if (num > 0x7fffffff) {
                    num = num - (0xffffffff + 1)
                }
                pushNum(SingleToHex(num))
                ip += 1
                break;
            case "ftoi":
                num = parseInt(HexToFloat(popBytes()))
                if (num < 0) {
                    num = 0xffffffff + num + 1
                }
                else if (num > 0xffffffff) {
                    num = Number(num) - 0xffffffff
                }
                pushNum(num) 
                ip += 1
                break;
            case "shrl":  
                right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >>> right)
                ip += 1
                break;
            case "set.lt":
                temp = popNum()
                if(temp>0x7fffffff)
                    pushNum(1)
                else
                    pushNum(0)
                ip += 1
                break;
            case "set.gt":
                temp = popNum()
                if(temp<=0x7fffffff)
                    pushNum(1)
                else
                    pushNum(0)
                ip += 1
                break;
            case "br":
                ip += (optnum + 1)
                break;
            case "br.false":
                temp = popNum()
                if(temp===0)
                    ip += (optnum + 1)
                break;
            case "br.true":
                temp = popNum()
                if(temp!==0)
                    ip += (optnum + 1)
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
                console.log("oldbp: 0x00" + (sbp - bp).toString(16))
                pushNum((sbp - bp))
                bp = sp
                console.log("sp:"+sp)
                console.log("newbp: 0x00" + (sbp - bp).toString(16))
                pushNum(ip+1)
                ip = funlist[optnum].ip
                pushNum(id)
                id = optnum
                console.log("argNum:" + funlist[id].argNum)
                console.log("retNum:" + funlist[id].retNum)
                arg = sbp - bp + (funlist[id].argNum*8 + 8*funlist[id].retNum) 
                console.log("arg: 0x00" + arg.toString(16))
                loc = sbp - bp - 3*8
                console.log("loc: 0x00" + loc.toString(16))
                console.log("fun:" + id)
                sp = sbp - loc - 8
                for (var i = 0; i < funlist[id].locNum ; i ++){
                    pushNum(0)
                }
                break;
            case "ret": 
                sp = bp + 2*8 
                while(stack.length>sp+1){i
                    stack.pop()
                }
                // printStack()
                console.log("newbp: 0x00" + (sbp - bp).toString(16))
                // console.log("newbp: 0x00" + (sbp - bp).toString(16))
                // console.log("sp: 0x00" + (sbp-sp).toString(16))
                id = popNum()
                // printStack()
                console.log("id:" + id)
                ip = popNum()
                // printStack()
                console.log("ip:" + ip)
                bp = sbp - popNum()
                // printStack()
                console.log("oldbp: 0x00" + (sbp - bp).toString(16))
                arg = sbp - bp + (funlist[id].argNum * 8 + 8 * funlist[id].retNum)
                console.log("arg: 0x00" + arg.toString(16))
                loc = sbp - bp - 3 * 8
                console.log("loc: 0x00" + loc.toString(16))
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
        console.log("sp: 0x00" + (sbp - sp).toString(16))
        printStack()
    }
    else{
        return;
    }
}

// 输入要入栈的数字，位数默认64，执行大端法入栈操作
function pushNum(num){
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
    return out
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
        num = num + popStack() 
    }
    // return parseInt(num, 16)
    // 根据其他指令选择int或double解释
    return num
}

// 用于load.x
function loadNum(bits){
    if(bits%8!==0)
        throw new Error("error bits")
    bits /= 8
    let stemp="", addr = popNum()
    console.log(addr.toString(16))
    // console.log(0x0123456789abcdef)
    for(let i=0; i<bits ; i++){
        stemp = stemp + accessAddress(addr+i) 
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
    // console.log(val.toString(16))
    // console.log(addr.toString(16))
    let snum = val.toString(16)
    if(snum.length>=bits){
        snum = snum.substr(snum.length-bits)
    }
    else {
        for(let i=bits-snum.length; i>0; i--)
            snum = "0" + snum 
    }
    // console.log(snum)
    for(let i=0; i<bits; i+=2){
        // console.log(i)
        // console.log((addr + 7 - i / 2).toString(16))
        storeAddress(addr + 7 -i/2, snum.substr(bits-2-i, 2))
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