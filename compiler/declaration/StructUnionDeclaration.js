/*用来记录一个struct声明的过程*/
let ruleDict = require("../common/Contexts").ContextDict
let tokenDict = require("../common/CToken").Tokens
let VariableDeclarator = require("./VariableDeclarator").VariableDeclarator
function StructUnionDeclaration(){
    return this;
}
StructUnionDeclaration.prototype.CurrentDeclarator = undefined;//记录当前正在被声明的东西
StructUnionDeclaration.prototype.IsConstant = false;//是不是常数
StructUnionDeclaration.prototype.Type = undefined;//是哪一种类型
StructUnionDeclaration.prototype.Signed = undefined;//有没有符号位
StructUnionDeclaration.prototype.Name = undefined;//如果上面不是基本类型，那这里就是具体的类型
/**
 * 给当前的struct/Union中被声明的东西添加一个typeSpecifier
 * 注意不能嵌套声明enum/struct
 * @param ctx 新加入的typeSpecifier
 * */
StructUnionDeclaration.prototype.addTypeSpecifier = function(ctx){
    if(ctx.getChild(0).ruleIndex===ruleDict['RULE_structOrUnionSpecifier']){//struct 或者 union
        if(this.Type!==undefined)throw new Error("conflicting type");
        else {
            this.Type = ctx.getChild(0).getChild(0).getText();
            if(ctx.getChild(0).getChild(ctx.getChild(0).getChildCount()-1)===tokenDict['RightBrace']){
                throw new Error("nested declaration of struct or union not supported!")
            }
            this.Name = ctx.getChild(0).getChild(1).getText();
        }
    }else if(ctx.getChild(0).ruleIndex===ruleDict['RULE_enumSpecifier']){//enum
        if(this.Type!==undefined)throw new Error("conflicting type");
        else {
            this.Type = ctx.getChild(0).getChild(0).getText();
            if(ctx.getChild(0).getChild(ctx.getChild(0).getChildCount()-1)===tokenDict['RightBrace']){
                throw new Error("nested declaration of enumeration constant not supported!")
            }
            this.Name = ctx.getChild(0).getChild(1).getText();
        }
    }else if(ctx.getChild(0).ruleIndex===ruleDict['RULE_typedefName']){//自定义类型

    }else{//基本类型
        switch (ctx.getText()){
            case "unsigned":
                if(this.Signed===true)throw new Error("signed or not signed?");
                else this.Signed = false;
                break;
            case "signed":
                if(this.Signed===false)throw new Error("signed or not signed?");
                else this.Signed = true;
                break;
            default:
                if(this.Type!==undefined)throw new Error("conflicting type: "+ctx.getText());
                else this.Type = ctx.getText();
                break;
        }
    }
}
/**
 * 给当前的struct/Union中被声明的东西添加一个Qualifier
 * @param ctx 新加入的typeQualifier
 * */
StructUnionDeclaration.prototype.addTypeQualifier = function(ctx){
    if(ctx.getText()==="const")this.IsConstant = true;
}
/**
 * 给当前的成员声明添加一个declarator
 * */
StructUnionDeclaration.prototype.newDeclarator = function(){
    this.CurrentDeclarator = new VariableDeclarator();
}
/**
 * 导出当前的declarator，并且把前面的声明什么的也加上，基本上就是符号表中的内容了
 * */
StructUnionDeclaration.prototype.exportDeclarator = function(){
    let result = {}
    let declarator = this.CurrentDeclarator;
    result.Name = this.Name;
    result.Type = this.Type;
    result.Signed = this.Signed;
    result.IsConstant = this.IsConstant;
    for(let item in declarator){
        if(!(declarator[item] instanceof Function)){
            result[item] = declarator[item]
        }
    }
    return result;
}
exports.StructDeclaration = StructUnionDeclaration