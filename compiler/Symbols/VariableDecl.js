const SymbolEntry = require("./SymbolEntry").SymbolEntry;

function VariableDecl(){
    SymbolEntry.call(this);
    this.ConstantPointer = [];
    this.ArrayDimension = [];
    this.IsStatic = false;
    this.IsConstant = false;
    this.Signed = false;
    this.Type = undefined;
    return this;
}
VariableDecl.prototype.ConstantPointer = [];//用来记录指针相关的信息
VariableDecl.prototype.ArrayDimension = [];//用来记录数组的维度（常数）
VariableDecl.prototype.IsStatic = false;//用来表示存储方式
VariableDecl.prototype.IsConstant = false;//记录是不是常数
VariableDecl.prototype.Signed = false;//有没有符号
VariableDecl.prototype.Type = undefined;//类型