let VariableDecl = require("./VariableDecl").VariableDecl;
const StructUnionDecl = require("./StructUnionDecl").StructUnionDecl;
function SymbolEntry(){
    this.Size = 0;
    this.Identifier = undefined;
    return this;
}
SymbolEntry.prototype.Size = 0;//这个表项的大小，用来应对sizeof
SymbolEntry.prototype.Identifier = undefined;//这个表项的identifier
exports.SymbolEntry = SymbolEntry;