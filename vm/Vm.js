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
function pushStack(num) {
    stack.push(num);
    sp += 1;
}

/**
 * 出栈原子操作（只操作一个字节）
 */
function popStack() {
    sp -= 1;
    return stack.pop();
}

/**
 * 获取新的全局变量（单个字节读入）
 */
function getNewCode(newGlobalBit) {
    globalSpace.push(newGlobalBit);
    gp += 1;
}

/**
 * 读入指令码
 */
function putNewCode(newCode) {
    code.push(newCode);
    cp += 1;
    run();
}

/**
 * 绝对逻辑地址访问
 */
function accessAddress(address) {
    if (address < 0x00200000 || address > 0x00ffffff) {
        return "illegal";
    }
    else if (address < 0x00400000 && address > 0x001fffff) {//在全局变量段
        return globalSpace[address - gbp];
    }
    else if (address < 0x01000000 && address > 0x003fffff) {
        if (address <= (hp + hbp)) {//在堆段
            return heap[address];
        }
        else if (address >= (sbp - sp)) {//在栈段
            return stack[address];
        }
        else {
            return "illegal";
        }
    }
}

// 逻辑地址存储，待补充
function storeAddress(address, val) { }

/**
 * 指令执行模块
 */
function run() {
    if (ip > cp) { //此时IP寄存器中的目标指令尚未解释，需等待指令
        return;
    }
    else { //此时可以执行指令
        /**
         * 下面是需要执行的指令
         * 无操作数指令
         * var instruct = {opt:"nop"}
         * 有操作数指令
         * var instruct = {opt:"push",num:100}
         */
        var instruction = code[ip];//获取此时的指令对象
        var opt = instruction.opt;//指令
        var optnum = instruction.num;//指令操作数
        let temp, left, right //临时变量

        switch (opt) {
            case "nop": break;
            case "push":
                pushNum(optnum)
                break;
            case "pop":
                popBytes()
                break;
            case "popn":
                for (let i = 0; i < optnum; i++) {
                    popBytes()
                }
                break;
            case "dup":
                temp = popBytes()
                pushBytes(temp)
                pushBytes(temp)
                break;
            case "loca": break;
            case "arga": break;
            case "globa": break;
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
            case "alloc": break;
            case "free": break;
            case "stackalloc": sp -= 8; break;
            case "add.i":
                pushNum(BigInt(popNum()) + BigInt(popNum()))
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
                pushNum(HexToFloat(popbytes()) + HexToFloat(popbytes()))
                break;
            case "sub.f":
                right = HexToFloat(popbytes())
                left = HexToFloat(popbytes())
                pushNum(left - right)
                break;
            case "mul.f":
                pushNum(HexToFloat(popbytes()) * HexToFloat(popbytes()))
                break;
            case "div.f":
                right = HexToFloat(popbytes())
                left = HexToFloat(popbytes())
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
            case "shr": right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >> right)
                break;
            case "and": pushNum(BigInt(popNum()) & BigInt(popNum()))
                break;
            case "or": case "and": pushNum(BigInt(popNum()) | BigInt(popNum()))
                break;
            case "xor":
                pushNum(BigInt(popNum()) ^ BigInt(popNum()))
                break;
            case "not": pushNum(!BigInt(popNum()))
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
                break;
            case "cmp.u": right = popNum() >>> 0
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
                right = HexToFloat(popbytes())
                left = HexToFloat(popbytes())
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
                pushNum(-HexToFloat(popbytes()))
                break;
            case "itof":
                pushNum(parseInt(popBytes(), 16))
                break;
            case "ftoi":
                pushNum(BigInt(parseInt(HexToFloat(popBytes()))))
                break;
            case "shrl": right = BigInt(popNum())
                left = BigInt(popNum())
                pushNum(left >>> right)
                break;
            case "set.lt":
                temp = popNum()
                if (temp < 0)
                    pushNum(1n)
                else
                    pushNum(0n)
                break;
            case "set.gt":
                temp = popNum()
                if (temp > 0)
                    pushNum(1n)
                else
                    pushNum(0n)
                break;
            case "br":
                ip += optnum
                break;
            case "br.false":
                temp = popNum()
                if (temp === 0)
                    ip += optnum
                break;
            case "br.true":
                temp = popNum()
                if (temp !== 0)
                    ip += optnum
                break;
            case "call": break;
            case "ret": break;
            case "callname": break;
            case "scan.i": break;
            case "scan.c": break;
            case "scan.f": break;
            case "print.i": 
            console.log(popNum())
            break;
            case "print.c": break;
            case "print.f": break;
            case "print.s": break;
            case "println": break;
            case "panic": break;
        }
    }
}

// 输入要入栈的数字，位数默认64，执行大端法入栈操作
function pushNum(num) {
    // let bits=64
    // if(bits%4!==0)
    //     bits = bits-(bits%4)+4
    // bits /= 4
    bits = 16
    let snum
    if (typeof num == "bigint") {
        snum = num.toString(16)
        if (snum.length >= bits) {
            snum = snum.substr(snum.length - bits)
        }
        else {
            for (let i = bits - snum.length; i > 0; i--)
                snum = "0" + snum
        }
    }
    else if (typeof num == "number") {
        snum = SingleToHex(num)
    }

    pushBytes(snum)
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

function popNum() {
    return parseInt(popBytes(), 16)
}

// 用于load.x
function loadNum(bits) {
    if (bits % 8 !== 0)
        throw new Error("error bits")
    bits /= 8
    let stemp = "", addr = popNum()
    for (let i = 0; i < bits; i++) {
        stemp = accessAddress(addr - i) + stemp
    }
    pushBytes(stemp)
    // return parseInt(stemp, 16)
}

// 用于store.x
function storeNum(bits) {
    if (bits % 8 !== 0)
        throw new Error("error bits")
    bits /= 4
    let val = popNum(), addr = popNum()
    let snum = val.toString(16)
    if (snum.length >= bits) {
        snum = snum.substr(snum.length - bits)
    }
    else {
        for (let i = bits - snum.length; i > 0; i--)
            snum = "0" + snum
    }
    for (let i = 0; i < bits; i += 2) {
        storeAddress(addr - i / 2, snum.substr(bits - 2 - i, 2))
        // stemp = accessAddress(addr-i) + stemp
    }
    // return parseInt(stemp, 16)
}

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

