const Declaration = require("./Declaration").VariableDeclaration;
const DirectDeclarator = require("./DirectDeclarator").DirectDeclarator;
/**
 * 用来记录一个declarator相关的情况，比如每一级的指针是不是常数，以及数组一共有多少维，每一层都是一个括号
 * */
function VariableDeclarator(){
    this.Identifier = undefined;
    this.ArraySize = 0;
    this.ConstantPointer = undefined;
    this.Type = "variable";
    this.Params = undefined;
    this.CurrentParamDecl = new Declaration();
    this.DirectDeclarators = [];
    return this;
}

VariableDeclarator.prototype.Identifier = undefined;//主要用来跟踪这个declarator的名字
VariableDeclarator.prototype.ArraySize = 0;//用来跟踪数组的大小
VariableDeclarator.prototype.ConstantPointer = [];//用来跟踪每一级的指针是不是常量，如果是的话就是一个true否则是false
VariableDeclarator.prototype.Type = "variable";//用来记录类型，包括variable,array,function,typedef
VariableDeclarator.prototype.Params = [];//这个declarator的参数列表，里面装的是Symbol Entry
VariableDeclarator.prototype.CurrentParamDecl = undefined;//用来记录当前正在被声明的参数
VariableDeclarator.prototype.DirectDeclarators = [];//各级Declarator

/**
 * 给当前正在被声明的对象添加一级指针
 * @param isConstant 新加进来的一级指针是不是常数指针
 * */
VariableDeclarator.prototype.addPointer = function(isConstant){
    let current_declarator = this.DirectDeclarators.peekFirst();
    current_declarator.addPointer(isConstant);
}

/**
 * 遇到形如directDeclarator -> '(' declarator ')'的情况时，需要在栈中加一个Declarator
 * */
VariableDeclarator.prototype.addDeclarator = function(){
    this.DirectDeclarators.unshift(new DirectDeclarator());
}

/**
 * 给当前的declarator添加一个数组维度的尺寸
 * */
VariableDeclarator.prototype.addArrayDimension = function(expr){
    this.DirectDeclarators.peekFirst().addArrayDimension(expr);
}

VariableDeclarator.prototype.toString = function(){
    let identifier_name = "Identifier: "+this.Identifier;
    let pointer_information = "Pointer: "+ this.ConstantPointer;
    let array_information = "Array Size: "+this.ArraySize;
    return identifier_name+"<br>"+pointer_information+"<br>"+array_information;
}

exports.VariableDeclarator = VariableDeclarator;