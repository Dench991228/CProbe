function SymbolTable(){
    this.fatherTable = null;// symbol table of higher level
    this.fields = [];// fields in this level of symbol table，因为是列表，所以可以比较方便的获得偏移量相关的信息
    this.index = {};//索引，key是identifier，value是fields中的下标
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
    if(this.index.hasOwnProperty(identifier)){
        throw new Error("identifier already been declared");
    }
    this.fields.push(entry);
    this.index[identifier] = this.fields.length-1;
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