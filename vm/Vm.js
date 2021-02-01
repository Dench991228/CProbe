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
 */
var code = new Array();//代码段
var ip = 1;//IP寄存器
var globalSpace = new Array();//全局变量空间
var stack = new Array();//栈空间
var heap = new Array();//堆空间
var cp = 0x00000000;//代码偏移指针
var gp = 0x00000000;//全局变量偏移指针
var hp = 0x00000000;//堆偏移指针
var sp = 0x00000000;//栈偏移指针
var cbp = 0x00000000;//代码段基指针
var gbp = 0x001fffff;//全局变量基指针
var hbp = 0x003fffff;//堆基指针
var sbp = 0x00ffffff;//栈基指针


/**
 * 进栈原子操作（只操作一个字节）
 */
function pushStack(num){
    stack.push(num);
    esp += 1;
}

/**
 * 出栈原子操作（只操作一个字节）
 */
function popStack(){
    return stack.pop();
}

/**
 * 读入指令码
 */
function getNewCode(newCode){
    code.push(newCode);
    cp += 1;
    run();
}

/**
 * 获取新的全局变量（单个字节读入）
 */
function getNewCode(newGlobalBit){
    code.push(newGlobalBit);
    gp += 1;
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
         */
        var instruction =  code[ip];
        var opt = instruction.opt;
        var optnum = instruction.optnum;
        
    }
}