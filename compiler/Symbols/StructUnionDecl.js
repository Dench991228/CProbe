const SymbolTable = require("./SymbolTable").SymbolTable;
const SymbolEntry = require("./SymbolEntry").SymbolEntry

function StructUnionDecl(){
    SymbolEntry.call(this);
    this.StructTable = new SymbolTable();
    return this;
}
StructUnionDecl.prototype.StructTable = undefined;//用来记录声明信息，理论上是一个符号表
exports.StructUnionDecl = StructUnionDecl;