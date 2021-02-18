function SymbolTable(){
    this.fatherTable = null;// symbol table of higher level
    this.fields = {};// fields in this level of symbol table
    return this
}

SymbolTable.prototype.fatherTable = undefined;
SymbolTable.prototype.fields = {};//key 是identifier, value是entry
/**
 * 在符号表中添加一个新的表项
 * @param identifier 表项对应的identifier
 * @param entry 表项
 * */
SymbolTable.prototype.addSymbol = function(identifier, entry){
    if(this.fields.containsKey(identifier)){
        throw new Error("identifier already been declared");
    }
    this.fields[identifier] = entry;
}
/**
 * 进入新的作用域的时候，使用这个方法获得一张新的符号表
 * */
SymbolTable.prototype.newField = function(){
    let new_table = new SymbolTable();
    new_table.fatherTable = this;
    return new_table;
}
exports.SymbolTable = SymbolTable;