/**
 * 这个类用来跟踪函数声明以及定义的过程
 * */
function FunctionDeclaration(){

}
FunctionDeclaration.prototype.returnType = undefined;//这个函数的返回值
FunctionDeclaration.prototype.parameters = [];//这个函数的参数列表
/**
 * 把这个函数导出到符号表
 * @return 这个函数的符号表项
 * */
FunctionDeclaration.prototype.exportFunc = function(){

}
exports.FunctionDeclaration = FunctionDeclaration;