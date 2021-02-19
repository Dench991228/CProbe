const SymbolEntry = require("./SymbolEntry").SymbolEntry
const SymbolTable = require("../Symbols/SymbolTable").SymbolTable;
const VariableDecl = require("../Symbols/VariableDecl").VariableDecl;

function EnumerationDecl(){
    SymbolEntry.call(this);
    this.Constants= new SymbolTable();
    return this;
}
EnumerationDecl.enumConstantEntry = function(ident, initialized){
    let result = new VariableDecl();
    result.Identifier = ident;
    result.Initialized = initialized;
    return result;
}
EnumerationDecl.prototype.Constants = new SymbolTable();//记录这个enumerator的常数
exports.EnumerationDecl = EnumerationDecl;