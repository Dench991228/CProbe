function SymbolTable(){
    this.fatherTable = null;// symbol table of higher level
    this.fields = {};// fields in this level of symbol table
    return this
}

SymbolTable.prototype.fatherTable = undefined;
SymbolTable.prototype.fields = {};//key 是identifier, value是entry
exports.SymbolTable = SymbolTable;