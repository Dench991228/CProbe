// Generated from C.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('./antlr4/index');
const CListener = require('./CListener').CListener
var VariableDeclaration = require("./VariableDeclaration").VariableDeclaration

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

CustomListener.prototype.exitDeclaration = function(ctx){
    let count_child = ctx.getChildCount();
    for(let i = 0;i < count_child; i++){
        console.log(ctx.getChild(i).getText());
    }
}

CustomListener.prototype.exitIterationStatement = function(ctx){
    document.getElementById("output").innerHTML += ctx.getText();
}
/*进入新的声明过程，创建新的声明信息对象*/
CustomListener.prototype.enterDeclaration = function(ctx){
    this.CurrentDeclaration = new VariableDeclaration();
}
/*收到了一个BasicTypeSpecifier*/
CustomListener.prototype.exitBasicTypeSpecifier = function(ctx){
    this.CurrentDeclaration.addTypeSpecifier(ctx);
}
/*离开了Declaration，展示相关信息*/
CustomListener.prototype.exitDeclaration = function(ctx){
    document.getElementById("output").innerHTML+= (this.CurrentDeclaration.toString()+"<br>");
}

exports.CustomListener = CustomListener;