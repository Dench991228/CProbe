/**
 * 用来记录一个declarator相关的情况，比如每一级的指针是不是常数，以及数组一共有多少维
 * */
function VariableDeclarator(){
    this.Identifier = undefined;
    this.ArraySize = 0;
    this.ConstantPointer = [];
    this.Type = "variable";
    return this;
}

VariableDeclarator.prototype.Identifier = undefined;//主要用来跟踪这个declarator的名字
VariableDeclarator.prototype.ArraySize = 0;//用来跟踪数组的大小
VariableDeclarator.prototype.ConstantPointer = [];//用来跟踪每一级的指针是不是常量，如果是的话就是一个true否则是false
VariableDeclarator.prototype.Type = "variable";//用来记录类型，包括variable,array,function,typedef

/**
 * 给当前正在被声明的对象添加一级指针
 * @param isConstant 新加进来的一级指针是不是常数指针
 * */
VariableDeclarator.prototype.addPointer = function(isConstant){
    this.ConstantPointer.push(isConstant)
}

VariableDeclarator.prototype.toString = function(){
    let identifier_name = "Identifier: "+this.Identifier;
    let pointer_information = "Pointer: "+ this.ConstantPointer;
    let array_information = "Array Size: "+this.ArraySize;
    return identifier_name+"<br>"+pointer_information+"<br>"+array_information;
}

exports.VariableDeclarator = VariableDeclarator;