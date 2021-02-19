const SymbolEntry = require("./SymbolEntry").SymbolEntry
const SymbolTable = require("../Symbols/SymbolTable").SymbolTable;

function EnumerationDecl(){
    SymbolEntry.call(this);
    this.Constants= new SymbolTable();
    return this;
}
EnumerationDecl.prototype.Constants = new SymbolTable();//记录这个enumerator的常数
exports.EnumerationDecl = EnumerationDecl;