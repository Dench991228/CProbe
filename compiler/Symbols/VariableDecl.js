const SymbolEntry = require("./SymbolEntry").SymbolEntry;
const SymbolTable = require("./SymbolTable").SymbolTable;

function VariableDecl(){
    SymbolEntry.call(this);
    this.ConstantPointer = [];
    this.ArrayDimension = 0;
    this.IsStatic = false;
    this.IsConstant = false;
    this.Signed = true;
    this.Type = undefined;
    this.Value = undefined;
    this.Initialized = false;
    this.Members = undefined;
    this.Params = undefined;
    return this;
}
VariableDecl.prototype.ConstantPointer = [];//用来记录指针相关的信息
VariableDecl.prototype.ArrayDimension = 0;//用来记录数组的维度（常数）
VariableDecl.prototype.IsStatic = false;//用来表示存储方式
VariableDecl.prototype.IsConstant = false;//记录是不是常数
VariableDecl.prototype.Signed = false;//有没有符号
VariableDecl.prototype.Type = undefined;//类型
VariableDecl.prototype.Name = undefined;//类型的具体名字，比如struct的名字
VariableDecl.prototype.Value = undefined;//这个符号的值，只用管常量就行
VariableDecl.prototype.Initialized = false;//表示这个符号有没有被初始化过
VariableDecl.prototype.Members = undefined;//符号表，记录这个变量的成员变量，主要是用来处理匿名struct
VariableDecl.prototype.Params = undefined;//其实也是符号表，用来记录函数指针的参数信息
exports.VariableDecl = VariableDecl;