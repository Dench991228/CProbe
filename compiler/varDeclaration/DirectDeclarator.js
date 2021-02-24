//不包含括号的declarator，包括若干层指针和数组，相当于是DirectDeclarator
function DirectDeclarator(){
    this.ArraySizes = undefined;
    this.ConstPtr = undefined;
    this.Callable = false;
    this.Param = undefined;
}
DirectDeclarator.prototype.ArraySizes = undefined;//数组各个维度的constantExpression
DirectDeclarator.prototype.ConstPtr = undefined;//用来描述各个指针是不是constant
DirectDeclarator.prototype.Callable = false;//描述是不是一个函数
DirectDeclarator.prototype.Param = undefined;//参数列表

DirectDeclarator.prototype.addArrayDimension = function(expr){
    if(this.ArraySizes === undefined){
        this.ArraySizes = [];
    }
    this.ArraySizes.unshift(expr);
}

DirectDeclarator.prototype.addPointer = function(isConstant){
    if(this.ConstPtr === undefined){
        this.ConstPtr = [];
    }
    this.ConstPtr.unshift(isConstant);
}
exports.DirectDeclarator = DirectDeclarator;