const SymbolEntry = require("./SymbolEntry").SymbolEntry

function FunctionDecl(){
    SymbolEntry.call(this);
    this.paramTypes = [];
    this.returnType = [];
    return this;
}
FunctionDecl.prototype.paramTypes = [];//用来记录函数的参数的类型，不用管Qualifier
FunctionDecl.prototype.returnType = undefined;//用来记录函数的返回值，不用管Qualifier
exports.FunctionDecl = FunctionDecl;