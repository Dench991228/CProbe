// Generated from C.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('./antlr4/index');
const CListener = require('./CListener').CListener
var VariableDeclaration = require("./declaration/VariableDeclaration").VariableDeclaration
var VariableDeclarator = require("./declaration/VariableDeclarator").VariableDeclarator
var Dict = require("./common/Contexts").ContextDict

// This class defines a complete listener for a parse tree produced by CParser.
function CustomListener() {
    CListener.call(this)
    return this;
}
/*与编译过程相关的状态信息*/
CustomListener.prototype.CurrentDeclaration = new VariableDeclaration();
CustomListener.prototype = Object.create(CListener.prototype);
CustomListener.prototype.constructor = CListener;

CustomListener.prototype.enterPrimaryExpression = function(ctx){
    document.getElementById("output").innerHTML+=ctx.getText();
}
CustomListener.prototype.exitIterationStatement = function(ctx){
    document.getElementById("output").innerHTML += ctx.getText();
}
/**
 * 进入新的声明对象的时候需要创建一个新的被声明对象
 * */
CustomListener.prototype.enterInitDeclarator = function(ctx){
    this.CurrentDeclaration.CurrentDeclarator = new VariableDeclarator();
}
/**
 * 离开的时候，将被声明对象的信息打印出来，我瞅瞅
 * */
CustomListener.prototype.exitInitDeclarator = function(ctx){
    document.getElementById("output").innerHTML+=this.CurrentDeclaration.CurrentDeclarator.toString()+"<br>";
}
/**
 * 进入新的声明语句之后，需要创建新的声明状态
 * */
CustomListener.prototype.enterDeclaration = function(ctx){
    this.CurrentDeclaration = new VariableDeclaration();
}
/*收到了一个BasicTypeSpecifier*/
CustomListener.prototype.exitBasicTypeSpecifier = function(ctx){
    this.CurrentDeclaration.addTypeSpecifier(ctx);
}
/*收到了一个TypeQualifier*/
CustomListener.prototype.exitTypeQualifier = function(ctx){
    this.CurrentDeclaration.addTypeQualifier(ctx);
}
/*收到了一个Storage Specifier*/
CustomListener.prototype.exitStorageClassSpecifier = function(ctx){
    this.CurrentDeclaration.addStorageSpecifier(ctx);
}
/*离开了Declaration，展示相关信息*/
CustomListener.prototype.exitDeclaration = function(ctx){
    document.getElementById("output").innerHTML+= (this.CurrentDeclaration.toString()+"<br>");
    let count_child = ctx.getChildCount();
    console.log("exiting declaration");
    for(let i = 0;i < count_child; i++){
        if(ctx.getChild(i).ruleIndex!==undefined){
            console.log(ctx.getChild(i).getText()+":"+ctx.getChild(i).ruleIndex)
        }else{
            console.log(ctx.getChild(i).getText()+":"+ctx.getChild(i).symbol)
        }
    }
}
/*研究一下离开指针的时候指针是个什么状态*/
CustomListener.prototype.exitPointer = function(ctx){
    let count = ctx.getChildCount();
    if(ctx.getChild(count-1).ruleIndex===Dict['RULE_typeQualifierList']){//只要最后一个是QualifierList，就要考虑是不是常量指针
        if(ctx.getChild(count-1).getText().search("const")!==-1){//包含const
            this.CurrentDeclaration.CurrentDeclarator.addPointer(true);
        }else{
            this.CurrentDeclaration.CurrentDeclarator.addPointer(false);
        }
    }else{//最后连个QualifierList都没有，显然是非常数指针
        this.CurrentDeclaration.CurrentDeclarator.addPointer(false);
    }
}

CustomListener.prototype.enterPointer = function(ctx){
    console.log("enter pointer: "+ctx.getText());
}

exports.CustomListener = CustomListener;