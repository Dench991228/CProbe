# 虚拟机

# 目前进度
callname 指令感觉很鸡肋，先没做
剩余scan和print系列
控制台显示栈图已完成

# 接口
 
函数 
> runAll(codelist,functionlist,globallist)

其中codelist,functionlist,globallist
## 示例如下
```
var codelist = [
    {opt:"globa",num:0},//操作指令+操作数
    {opt:"push",num:1},
    {opt:"store.64"},
    {opt:"stackalloc",num:1},
    {opt:"call",num:1},
    {opt:"popn",num:1},
    {opt:"exit"},
    {opt:"arga",num:0},
    {opt:"globa",num:0},
    {opt:"load.64"},
    {opt:"store.64"},
    {opt:"ret"}
  ]
  var functionlist = [
    { locNum: 0, argNum: 0, retNum: 0, ip: 0 },//局部变量数+参数数+返回值占空间数+第一条指令IP
    { locNum: 0, argNum: 0, retNum: 1, ip: 7 }
  ]
  var globallist = [
    {len:8,item:"0000000000000000"},
    {len:4,item:"6d61696e"},
    {len:6,item:"5f7374617274"}
  ]
```

## 示例源代码
```
let s:int = 1;

fn main()->int{
    return s;
}
```

## 示例编译伪代码
```
static: 0 0 0 0 0 0 0 0 (`\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}\u{0}`)

static: 6D 61 69 6E (`main`)

static: 5F 73 74 61 72 74 (`_start`)


fn [2] 0 0 -> 0 {
    0: GlobA(0)
    1: Push(1)
    2: Store64
    3: StackAlloc(1)
    4: Call(1)
    5: PopN(1)
    6: exit
}

fn [1] 0 0 -> 1 {
    0: ArgA(0)
    1: GlobA(0)
    2: Load64
    3: Store64
    4: Ret
}
```

## 注意注意!!!!!
和编译原理大作业代码有所不同，_start 最后一条指令必须是exit（无参数），用于识别程序退出

## console显示栈图示例

```
[11]: alloc 1

           |      code      |     
           |................|     
           |     global     |     
0x00200000 |0000000000000001|      
0x00200008 |6d61696e5f737461|      
0x00200010 |7274000000000000| <- gp  0x00200011
           |................|     
0x003fffe8 |000000000020000c| <- glp 0x003fffe8
0x003ffff0 |0000000000200008|      
0x003ffff8 |0000000000200000|      
           |      heap      |     
0x00400000 |0100000001000000| <- hp  0x00400007
           |................|     
0x00ffffe0 |0000000000400004| <- sp  0x00ffffe0
0x00ffffe8 |0000000000000005|      
0x00fffff0 |0000000000fffff8|      
0x00fffff8 |0000000000000001|      
           |     stack      |    
```