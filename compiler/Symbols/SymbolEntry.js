const VariableDecl = require("./VariableDecl").VariableDecl;
function SymbolEntry(){
    this.Size = 0;
    this.Identifier = undefined;
    return this;
}
SymbolEntry.prototype.Size = 0;//这个表项的大小，用来应对sizeof
SymbolEntry.prototype.Identifier = undefined;//这个表项的identifier
/**
 * 创造一个enumeration constant
 * @param ident 标识符
 * @param initialized 有没有被初始化
 * @return 返回一个符号表项，表示这个符号
 */
SymbolEntry.prototype.enumConstantEntry = function(ident, initialized){
    let result = new VariableDecl();
    result.Identifier = ident;
    result.Initialized = initialized;
    return result;
}
exports.SymbolEntry = SymbolEntry;