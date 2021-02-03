// Generated from C.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('./antlr4/index');
const CListener = require('./CListener').CListener

// This class defines a complete listener for a parse tree produced by CParser.
function CustomListener() {
    CListener.call(this)
    return this;
}

CustomListener.prototype = Object.create(CListener.prototype);
CustomListener.prototype.constructor = CListener;

CustomListener.prototype.enterPrimaryExpression = function(ctx){
    document.getElementById("output").innerHTML+=ctx.getText();
}
exports.CustomListener = CustomListener;