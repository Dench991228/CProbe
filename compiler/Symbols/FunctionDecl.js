const SymbolEntry = require("./SymbolEntry").SymbolEntry

function FunctionDecl(){
    SymbolEntry.call(this);
    this.paramTypes = [];
    this.returnType = [];
    return this;
}
FunctionDecl.prototype.paramTypes = [];//用来记录函数的参数的类型，不用管Qualifier
FunctionDecl.prototype.returnType = undefined;//用来记录函数的返回值，不用管Qualifier
FunctionDecl.prototype.definited = false;//用来记录这个函数是只有一个header还是已经完成了
FunctionDecl.prototype.Instructions = [];//这个函数的指令
exports.FunctionDecl = FunctionDecl;