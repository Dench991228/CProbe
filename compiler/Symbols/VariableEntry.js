function VariableEntry(){
    SymbolEntry.call(this);
}
VariableEntry.prototype.ConstantPointer = [];//用来记录指针相关的信息
VariableEntry.prototype.ArrayDimension = 0;//用来记录数组的维度（常数）
VariableEntry.prototype.Size = 0;//用来计算这个标识符的大小