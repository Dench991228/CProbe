const SymbolEntry = require("./SymbolEntry").SymbolEntry

function EnumerationDecl(){
    SymbolEntry.call(this);
    this.Constants= {};
    return this;
}
EnumerationDecl.prototype.Constants = {};//记录这个enumerator的常数
exports.EnumerationDecl = EnumerationDecl;