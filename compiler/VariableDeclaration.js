/*用来关注声明的时候的共性，比如各种类型什么的*/
function VariableDeclaration(){
    return this;
}
/*主要用来关注指针和数组的情况*/
function VariableDeclarator(){
    return this;
}

VariableDeclaration.prototype.StorageSpecifier = [];//记录其存储方式
/*类型相关*/
VariableDeclaration.prototype.Type = undefined;//描述这个标识符的类型，比如基本类型，struct，enumeration，typedef
VariableDeclaration.prototype.Signed = undefined;
VariableDeclaration.prototype.TypeQualifier = [];//记录类型特点，比如const，volatile之类的
/*被声明的东西*/
VariableDeclaration.prototype.CurrentDeclarator = undefined;//记录当前正在被声明的Declarator
VariableDeclaration.prototype.ExportEntry = function(){//把当前的声明导出成一个符号表表项

}
/**
 * 增加一个storage specifier，并且检查有没有冲突，理论上来讲，只允许unsigned signed与其他整数类型组合，否则不行，现在先只管基本变量类型
 * 之后要考虑typeName，struct，enum之类的
 * @param specifier 输入的storage specifier
 * */
VariableDeclaration.prototype.addStorageSpecifier = function(specifier){
    this.StorageSpecifier.unshift(specifier);
}
VariableDeclaration.prototype.addTypeSpecifier = function(specifier){
    if(specifier.getText()==="unsigned"){
        if(this.Signed!==undefined&&this.Signed===true){
            throw new Error("unsigned is conflict with signed");
        }else{
            this.Signed = false;
        }
    }else if(specifier.getText()==="signed"){
        if(this.Signed!==undefined&&this.Signed === false){
            throw new Error("signed is conflict with unsigned");
        }else{
            this.Signed = true;
        }
    }else{//检查在不是signed/unsigned的情况下，是个啥基本类型类型
        if(this.Type===undefined){
            this.Type = specifier.getText();
        }else{
            throw new Error("conflicting type: "+this.Type+" and "+specifier.getText());
        }
    }
}
VariableDeclaration.prototype.addTypeQualifier = function(specifier){
    this.TypeQualifier.unshift(specifier);
}

exports.VariableDeclaration = VariableDeclaration
exports.VariableDeclarator = VariableDeclarator