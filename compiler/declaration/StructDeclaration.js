/*用来记录一个struct声明的过程*/
function StructDeclaration(){
    return this;
}
this.prototype.CurrentDeclarator = undefined;//记录当前正在被声明的东西
this.prototype.IsConstant = false;//是不是常数
this.prototype.Type = undefined;//是哪一种类型
this.prototype.Name = undefined;//如果上面不是基本类型，那这里就是具体的类型
exports.StructDeclaration = StructDeclaration