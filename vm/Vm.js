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
var code = new Array();//代码段
var ip = 1;//IP寄存器
var globalSpace = new Array();//全局变量空间
var stack = new Array();//栈空间
var heap = new Array();//堆空间
var cp = -1;//代码偏移指针
var gp = -1;//全局变量偏移指针
var hp = -1;//堆偏移指针
var sp = -1;//栈偏移指针
var cbp = 0x00000000;//代码段基指针
var gbp = 0x001fffff;//全局变量基指针
var hbp = 0x003fffff;//堆基指针
var sbp = 0x00ffffff;//栈基指针


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
    run();
}

/**
 * 绝对逻辑地址访问
 */
function accessAddress(address){
    if(address<0x00200000||address>0x00ffffff){
        return "illegal";
    }
    else if(address<0x00400000&&address>0x001fffff){//在全局变量段
        return globalSpace[address-gbp];
    }
    else if(address<0x01000000&&address>0x003fffff){
        if(address<=(hp+hbp)){//在堆段
            return heap[address];
        }
        else if(address>=(sbp-sp)){//在栈段
            return stack[address];
        }
        else{
            return "illegal";
        }
    }
}

// 逻辑地址存储，待补充
function storeAddress(address, val){}

/**
 * 指令执行模块
 */
function run(){
    if(ip >= cp){ //此时IP寄存器中的目标指令尚未解释，需等待指令
        return;
    }
    else{ //此时可以执行指令
        /**
         * 下面是需要执行的指令
         * 无操作数指令
         * var instruct = {opt:"nop"}
         * 有操作数指令
         * var instruct = {opt:"push",num:100}
         */
        var instruction =  code[ip];//获取此时的指令对象
        var opt = instruction.opt;//指令
        var optnum = instruction.num;//指令操作数
        let temp, stemp //临时变量
        switch (opt){
            case "nop":  break;
            case "push":
                pushNum(optnum)
                break;
            case "pop":
                popNum()
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
                sp += optnum 
                
                break;
            case "arga":  break;
            case "globa":  break;
            case "load.8":
                loadNum(8)
                break;
            case "load.16":
                loadNum(16)
                break;
            case "load.32":
                loadNum(32)
                break;
            case "load.64":
                loadNum(64)
                break;
            case "store.8":
                storeNum(8)
                break;
            case "store.16":
                storeNum(16)
                break;
            case "store.32":
                storeNum(32)
                break;
            case "store.64":
                storeNum(64)
                break;
            case "alloc":  break;
            case "free":  break;
            case "stackalloc":  sp-=8; break;
            case "add.i":  break;
            case "sub.i":  break;
            case "mul.i":  break;
            case "div.i":  break;
            case "add.f":  break;
            case "sub.f":  break;
            case "mul.f":  break;
            case "div.f":  break;
            case "div.u":  break;
            case "shl":  break;
            case "shr":  break;
            case "and":  break;
            case "or":  break;
            case "xor":  break;
            case "not":  break;
            case "cmp.i":  break;
            case "cmp.u":  break;
            case "cmp.f":  break;
            case "neg.i":  break;
            case "neg.f":  break;
            case "itof":  break;
            case "ftoi":  break;
            case "shrl":  break;
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
            case "call":  break;
            case "ret":  break;
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
    }
}

// 输入要入栈的数字，位数默认64，执行大端法入栈操作
function pushNum(num){
    let bits=64
    if(bits%4!==0)
        bits = bits-(bits%4)+4
    bits /= 4
    let snum = num.toString(16)
    if(snum.length>=bits){
        snum = snum.substr(snum.length-bits)
    }
    else {
        for(let i=bits-snum.length; i>0; i--)
            snum = "0" + snum
    }

    for(i=0; i<bits; i+=2){
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
    for(let i=0; i<bits; i++){
        num = popStack() + num
    }
    return parseInt(num, 16)
}

// 用于load.x
function loadNum(bits){
    if(bits%8!==0)
        throw new Error("error bits")
    bits /= 8
    let stemp="", addr = popNum()
    for(let i=0; i<bits; i++){
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
    let snum = val.toString(16)
    if(snum.length>=bits){
        snum = snum.substr(snum.length-bits)
    }
    else {
        for(let i=bits-snum.length; i>0; i--)
            snum = "0" + snum
    }
    for(let i=0; i<bits; i+=2){
        storeAddress(addr-i/2, snum.substr(bits-2-i, 2))
        // stemp = accessAddress(addr-i) + stemp
    }
    // return parseInt(stemp, 16)
}