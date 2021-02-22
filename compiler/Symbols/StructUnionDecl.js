const SymbolTable = require("./SymbolTable").SymbolTable;

function StructUnionDecl(){
    let SymbolEntry = require("./SymbolEntry").SymbolEntry;
    SymbolEntry.call(this);
    this.StructTable = new SymbolTable();
    return this;
}
StructUnionDecl.prototype.StructTable = undefined;//用来记录声明信息，理论上是一个符号表
StructUnionDecl.prototype.Type = undefined;//struct or union
exports.StructUnionDecl = StructUnionDecl;