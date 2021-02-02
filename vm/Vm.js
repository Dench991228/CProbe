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
        switch (opt){
            case "nop":  break;
            case "push":  break;
            case "pop":  break;
            case "popn":  break;
            case "dup":  break;
            case "loca":  break;
            case "arga":  break;
            case "globa":  break;
            case "load.8":  break;
            case "load.16":  break;
            case "load.32":  break;
            case "load.64":  break;
            case "store.8":  break;
            case "store.16":  break;
            case "store.32":  break;
            case "store.64":  break;
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
            case "set.lt":  break;
            case "set.gt":  break;
            case "br":  break;
            case "br.false":  break;
            case "br.true":  break;
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