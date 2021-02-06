function SymbolTable(){
    this.fatherTable = null;// symbol table of higher level
    this.fields = {};// fields in this level of symbol table
    return this
}

exports.SymbolTable = SymbolTable;