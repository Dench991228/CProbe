/*用来关注声明的时候的共性，比如各种类型什么的*/
function Declaration(){
    this.Name = undefined;
    this.IsStatic = false;
    this.Signed = undefined;
    this.IsConstant = false;
    this.CurrentDeclarator = undefined;
    this.Type = undefined;
    this.Enumerators = {};
    this.IsDeclaration = false;
    return this;
}

Declaration.prototype.IsStatic = false;//记录其存储方式
/*类型相关*/
Declaration.prototype.Type = undefined;//描述这个标识符的类型，比如基本类型，struct，enumeration，typedef
Declaration.prototype.Name = undefined;//如果不是基本类型，这里对应的就是struct/enumeration/typedef的名字
Declaration.prototype.Signed = undefined;
Declaration.prototype.IsConstant = false;//是不是常量，用来对付const
Declaration.prototype.Enumerators = {};//key是enumerator constant，value是是否完成了初始化
Declaration.prototype.IsDeclaration = false;//enumeration或者struct是不是新声明的
/*被声明的东西*/
Declaration.prototype.CurrentDeclarator = undefined;//记录当前正在被声明的Declarator
Declaration.prototype.ExportEntry = function(){//把当前的声明导出成一个符号表表项
    return this;
}
/**
 * 增加一个storage specifier，目前只考虑static，先不考虑register，auto，extern之类的
 * */
Declaration.prototype.addStorageSpecifier = function(specifier){
    if(specifier.getText()==="static"){
        this.IsStatic = true;
    }
}
/**
 * 增加一个storage specifier，并且检查有没有冲突，理论上来讲，只允许unsigned signed与其他整数类型组合，否则不行，现在先只管基本变量类型
 * 之后要考虑typeName，struct，enum之类的
 * @param specifier 输入的storage specifier
 * */
Declaration.prototype.addBasicTypeSpecifier = function(specifier){
    if(this.Type === "struct"||this.Type==="typedef"||this.Type==="enum"){
        throw new Error("Conflicting Type!");
    }
    if(this.Signed!==undefined&&specifier.getText()==="unsigned"){
        if(this.Signed===true){
            throw new Error("unsigned is conflict with signed");
        }else{
            this.Signed = false;
        }
    }else if(this.Signed!==undefined&&specifier.getText()==="signed"){
        if(this.Signed === false){
            throw new Error("signed is conflict with unsigned");
        }else{
            this.Signed = true;
        }
    }else{//检查在不是signed/unsigned的情况下，是个啥基本类型类型
        if(specifier.getText()==="signed"){
            this.Signed = true;
        }else if(specifier.getText()==="unsigned"){
            this.Signed = false;
        }else{
            if(this.Type===undefined){
                this.Type = specifier.getText();
            }else{
                throw new Error("conflicting type: "+this.Type+" and "+specifier.getText());
            }
        }
    }
}
Declaration.prototype.addTypeQualifier = function(specifier){
    if(this.IsConstant===false){
        this.IsConstant = true
    }
}

Declaration.prototype.toString = function(ctx){
    let type = "type: "+ (this.Type!==undefined?this.Type:"integer(default)");
    if(this.Type==="enum"){
        let enumeration = "enumerators: ["
        for(let enumerator in this.Enumerators){
            enumeration+=("{"+enumerator+":"+this.Enumerators[enumerator]+"},");
        }
        enumeration+="]";
        return type+"<br>"+"name: "+this.Name+"<br>"+"enumerators: "+enumeration+"<br>";
    }else{
        let isStatic = "static: "+ this.IsStatic;
        let constant = "constant: "+this.IsConstant;
        let signed = "signed: "+(this.Signed===undefined?"signed":this.Signed);
        let type = "type: "+ (this.Type!==undefined?this.Type:"integer(default)");
        return isStatic+"<br>"+constant+"<br>"+signed+"<br>"+type+"<br>";
    }
}

exports.VariableDeclaration = Declaration