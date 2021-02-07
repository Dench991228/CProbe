function VariableDeclarator(){
    return this;
}

VariableDeclarator.prototype.Identifier = undefined;//主要用来跟踪这个declarator的名字
VariableDeclarator.prototype.ArraySize = [];//用来跟踪数组的大小
VariableDeclarator.prototype.ConstantPointer = [];//用来跟踪每一级的指针是不是常量


exports.VariableDeclarator = VariableDeclarator;