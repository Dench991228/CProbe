function SymbolEntry(){
    this.Size = 0;
    return this;
}
SymbolEntry.prototype.Size = 0;//这个表项的大小，用来应对sizeof
SymbolEntry.prototype.Identifier = undefined;//这个表项的identifier
exports.SymbolEntry = SymbolEntry;