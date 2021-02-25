// Generated from C.g4 by ANTLR 4.7
// jshint ignore: start
const TerminalNode = require("./antlr4/tree/Tree").TerminalNode;
Object.prototype.toString = function(){
    let result = "";
    for(let item in this){
        if(!(this[item] instanceof Function)&&this[item]!==undefined){
            result += item+": "+this[item]+"<br>"
        }
    }
    return result;
}

Array.prototype.peekLast = function(){
    let result = this.pop();
    this.push(result);
    return result;
}

Array.prototype.peekFirst = function(){
    let result = this.shift();
    this.unshift(result);
    return result;
}

var antlr4 = require('./antlr4/index');
const CListener = require('./CListener').CListener
var VariableDeclaration = require("./varDeclaration/Declaration").VariableDeclaration
var VariableDeclarator = require("./varDeclaration/VariableDeclarator").VariableDeclarator
var Dict = require("./common/Contexts").ContextDict
var Tokens = require("./common/CToken").Tokens
const SymbolTable = require("./Symbols/SymbolTable").SymbolTable

// This class defines a complete listener for a parse tree produced by CParser.
function MyCustomListener() {
    CListener.call(this);
    this.DeclarationStack = [];
    this.DeclaratorStack = [];
    this.SymbolTableStack = [];
    this.SymbolTableStack.push(new SymbolTable());
    return this;
}

MyCustomListener.prototype = Object.create(CListener.prototype);
MyCustomListener.prototype.constructor = MyCustomListener;
MyCustomListener.prototype.DeclarationStack = [];//用来记录各种各样的declaration
MyCustomListener.prototype.DeclaratorStack = [];//用来记录各种各样的declarator
MyCustomListener.prototype.SymbolTableStack = [];//栈式符号表

// Enter a parse tree produced by CParser#primaryExpression.
MyCustomListener.prototype.enterPrimaryExpression = function(ctx) {
    console.log("primary expression: "+ctx.getText())
};

// Exit a parse tree produced by CParser#primaryExpression.
MyCustomListener.prototype.exitPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#postfixExpression.
MyCustomListener.prototype.enterPostfixExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#postfixExpression.
MyCustomListener.prototype.exitPostfixExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#argumentExpressionList.
MyCustomListener.prototype.enterArgumentExpressionList = function(ctx) {
};

// Exit a parse tree produced by CParser#argumentExpressionList.
MyCustomListener.prototype.exitArgumentExpressionList = function(ctx) {
};


// Enter a parse tree produced by CParser#unaryExpression.
MyCustomListener.prototype.enterUnaryExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#unaryExpression.
MyCustomListener.prototype.exitUnaryExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#unaryOperator.
MyCustomListener.prototype.enterUnaryOperator = function(ctx) {
};

// Exit a parse tree produced by CParser#unaryOperator.
MyCustomListener.prototype.exitUnaryOperator = function(ctx) {
};


// Enter a parse tree produced by CParser#castExpression.
MyCustomListener.prototype.enterCastExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#castExpression.
MyCustomListener.prototype.exitCastExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#multiplicativeExpression.
MyCustomListener.prototype.enterMultiplicativeExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#multiplicativeExpression.
MyCustomListener.prototype.exitMultiplicativeExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#additiveExpression.
MyCustomListener.prototype.enterAdditiveExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#additiveExpression.
MyCustomListener.prototype.exitAdditiveExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#shiftExpression.
MyCustomListener.prototype.enterShiftExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#shiftExpression.
MyCustomListener.prototype.exitShiftExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#relationalExpression.
MyCustomListener.prototype.enterRelationalExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#relationalExpression.
MyCustomListener.prototype.exitRelationalExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#equalityExpression.
MyCustomListener.prototype.enterEqualityExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#equalityExpression.
MyCustomListener.prototype.exitEqualityExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#andExpression.
MyCustomListener.prototype.enterAndExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#andExpression.
MyCustomListener.prototype.exitAndExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#exclusiveOrExpression.
MyCustomListener.prototype.enterExclusiveOrExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#exclusiveOrExpression.
MyCustomListener.prototype.exitExclusiveOrExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#inclusiveOrExpression.
MyCustomListener.prototype.enterInclusiveOrExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#inclusiveOrExpression.
MyCustomListener.prototype.exitInclusiveOrExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#logicalAndExpression.
MyCustomListener.prototype.enterLogicalAndExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#logicalAndExpression.
MyCustomListener.prototype.exitLogicalAndExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#logicalOrExpression.
MyCustomListener.prototype.enterLogicalOrExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#logicalOrExpression.
MyCustomListener.prototype.exitLogicalOrExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#conditionalExpression.
MyCustomListener.prototype.enterConditionalExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#conditionalExpression.
MyCustomListener.prototype.exitConditionalExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#assignmentExpression.
MyCustomListener.prototype.enterAssignmentExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#assignmentExpression.
MyCustomListener.prototype.exitAssignmentExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#assignmentOperator.
MyCustomListener.prototype.enterAssignmentOperator = function(ctx) {
};

// Exit a parse tree produced by CParser#assignmentOperator.
MyCustomListener.prototype.exitAssignmentOperator = function(ctx) {
};


// Enter a parse tree produced by CParser#expression.
MyCustomListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#expression.
MyCustomListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#constantExpression.
MyCustomListener.prototype.enterConstantExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#constantExpression.
MyCustomListener.prototype.exitConstantExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#varDeclaration.
MyCustomListener.prototype.enterDeclaration = function(ctx) {
    this.DeclarationStack.push(new VariableDeclaration());
};

// Exit a parse tree produced by CParser#varDeclaration.
/**
 * 退出一个声明的时候，把之前的enum，union，struct什么的都给导出，如果没有名字（名字是*），那就没有它
 * */
MyCustomListener.prototype.exitDeclaration = function(ctx) {
    let current_declaration = this.DeclarationStack.pop();
    console.log("inner declaration: "+current_declaration.HasInnerDeclaration);
    if(current_declaration.Type==="struct"||current_declaration.Type==="union"&&current_declaration.HasInnerDeclaration){
        current_declaration.exportDeclaration(this.SymbolTableStack.peekLast());
    }else if(current_declaration.Type==="enum"&&current_declaration.HasInnerDeclaration){
        current_declaration.exportDeclaration(this.SymbolTableStack.peekLast());
    }
    document.getElementById("table").innerHTML+=this.SymbolTableStack.peekLast()+"<br>";
};


// Enter a parse tree produced by CParser#declarationSpecifiers.
MyCustomListener.prototype.enterDeclarationSpecifiers = function(ctx) {
};

// Exit a parse tree produced by CParser#declarationSpecifiers.
MyCustomListener.prototype.exitDeclarationSpecifiers = function(ctx) {
};


// Enter a parse tree produced by CParser#declarationSpecifiers2.
MyCustomListener.prototype.enterDeclarationSpecifiers2 = function(ctx) {
};

// Exit a parse tree produced by CParser#declarationSpecifiers2.
MyCustomListener.prototype.exitDeclarationSpecifiers2 = function(ctx) {
};


// Enter a parse tree produced by CParser#declarationSpecifier.
MyCustomListener.prototype.enterDeclarationSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#declarationSpecifier.
MyCustomListener.prototype.exitDeclarationSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#initDeclaratorList.
MyCustomListener.prototype.enterInitDeclaratorList = function(ctx) {
};

// Exit a parse tree produced by CParser#initDeclaratorList.
MyCustomListener.prototype.exitInitDeclaratorList = function(ctx) {
};


// Enter a parse tree produced by CParser#initDeclarator.
MyCustomListener.prototype.enterInitDeclarator = function(ctx) {
    let new_declarator = new VariableDeclarator();
    this.DeclarationStack.peekLast().CurrentDeclarator = new_declarator;
    this.DeclaratorStack.push(new_declarator);
};

// Exit a parse tree produced by CParser#initDeclarator.
MyCustomListener.prototype.exitInitDeclarator = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    let declarator = current_declaration.exportDeclarator(this.SymbolTableStack.peekLast());
    this.DeclaratorStack.pop();
    console.log(declarator);
    document.getElementById("output").innerHTML+= declarator+"<br>"
};


// Enter a parse tree produced by CParser#storageClassSpecifier.
MyCustomListener.prototype.enterStorageClassSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#storageClassSpecifier.
MyCustomListener.prototype.exitStorageClassSpecifier = function(ctx) {
    let current_declaration = this.DeclaratorStack.peekLast();
    current_declaration.addStorageSpecifier(ctx);
};


// Enter a parse tree produced by CParser#BasicTypeSpecifier.
MyCustomListener.prototype.enterBasicTypeSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#BasicTypeSpecifier.
/**
 * 加上一个基本类型的typeSpecifier，仅在不声明structOrUnion的时候使用
 * */
MyCustomListener.prototype.exitBasicTypeSpecifier = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    current_declaration.addBasicTypeSpecifier(ctx);
};


// Enter a parse tree produced by CParser#StructUnionSpecifier.
MyCustomListener.prototype.enterStructUnionSpecifier = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    current_declaration.addTypeSpecifier(ctx);
};

// Exit a parse tree produced by CParser#StructUnionSpecifier.
MyCustomListener.prototype.exitStructUnionSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#EnumerationSpecifier.
MyCustomListener.prototype.enterEnumerationSpecifier = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    current_declaration.addTypeSpecifier(ctx);
};

// Exit a parse tree produced by CParser#EnumerationSpecifier.
MyCustomListener.prototype.exitEnumerationSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#TypeDefSpecifier.
MyCustomListener.prototype.enterTypeDefSpecifier = function(ctx) {
    let current_declaration = this.DeclaratorStack.peekLast();
    current_declaration.addTypeSpecifier(ctx);
};

// Exit a parse tree produced by CParser#TypeDefSpecifier.
MyCustomListener.prototype.exitTypeDefSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#structOrUnionSpecifier.
/**
 * 开始进行struct的分析，此时需要进入一个新的符号表，并且把当前的declaration变成struct，顺便把当前的状态改成正在声明
 * 如果不是匿名的，就要记录其名字
 * 仅在非声明structOrUnion过程中有用
 * */
MyCustomListener.prototype.enterStructOrUnionSpecifier = function(ctx) {
    this.SymbolTableStack.push(new SymbolTable());
};

// Exit a parse tree produced by CParser#structOrUnionSpecifier.
/**
 * 离开了structOrUnion的声明，弹出一个符号表
 * */
MyCustomListener.prototype.exitStructOrUnionSpecifier = function(ctx) {
    this.DeclarationStack.peekLast().StructMember = this.SymbolTableStack.pop();
};


// Enter a parse tree produced by CParser#structOrUnion.
MyCustomListener.prototype.enterStructOrUnion = function(ctx) {
};

// Exit a parse tree produced by CParser#structOrUnion.
MyCustomListener.prototype.exitStructOrUnion = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclarationList.
/**
 * 进入structDeclarationList，创建新的符号表
 * */
MyCustomListener.prototype.enterStructDeclarationList = function(ctx) {
    this.DeclarationStack.peekLast().HasInnerDeclaration = true;
};

// Exit a parse tree produced by CParser#structDeclarationList.
MyCustomListener.prototype.exitStructDeclarationList = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclaration.
/**
 * 初始化新的struct成员的声明状态
 * */
MyCustomListener.prototype.enterStructDeclaration = function(ctx) {
    let new_declaration = new VariableDeclaration();
    this.DeclarationStack.push(new_declaration);
};

// Exit a parse tree produced by CParser#structDeclaration.
MyCustomListener.prototype.exitStructDeclaration = function(ctx) {
    let current_declaration = this.DeclarationStack.pop();
    current_declaration.exportDeclaration(this.SymbolTableStack.peekLast());
};


// Enter a parse tree produced by CParser#specifierQualifierList.
MyCustomListener.prototype.enterSpecifierQualifierList = function(ctx) {
};

// Exit a parse tree produced by CParser#specifierQualifierList.
MyCustomListener.prototype.exitSpecifierQualifierList = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclaratorList.
MyCustomListener.prototype.enterStructDeclaratorList = function(ctx) {
};

// Exit a parse tree produced by CParser#structDeclaratorList.
MyCustomListener.prototype.exitStructDeclaratorList = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclarator.
/**
 * 进入一个新的structDeclarator，创建一个新的declarator
 * */
MyCustomListener.prototype.enterStructDeclarator = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    let declarator = new VariableDeclarator();
    current_declaration.CurrentDeclarator = declarator;
    this.DeclaratorStack.push(declarator);
};

// Exit a parse tree produced by CParser#structDeclarator.
/**
 * 离开structDeclarator的时候需要导出相关信息
 * */
MyCustomListener.prototype.exitStructDeclarator = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    current_declaration.exportDeclarator(this.SymbolTableStack.peekLast());
    this.DeclaratorStack.pop();
};


// Enter a parse tree produced by CParser#enumSpecifier.
MyCustomListener.prototype.enterEnumSpecifier = function(ctx) {
    let current_declaration = this.DeclarationStack.peekLast();
    current_declaration.Type="enum";
    console.log(ctx.getText());
    if(ctx.getChild(ctx.getChildCount()-1).symbol.type===Tokens.RightBrace){//新声明的enum
        if(ctx.getChild(1).symbol.type===Tokens.Identifier){//具名的，需要导出
            current_declaration.Name = ctx.getChild(1).getText();
            console.log("name of enum: "+current_declaration.Name);
            current_declaration.HasInnerDeclaration = true;
        }else{//匿名的，不需要导出到符号表
            current_declaration.Name = "*";
            current_declaration.HasInnerDeclaration = true;
        }
    }else{//具名的，但是没有名字
        current_declaration.Name = ctx.getChild(1).getText();
        current_declaration.HasInnerDeclaration = false;
    }
};

// Exit a parse tree produced by CParser#enumSpecifier.
/**
 * 遇到一个EnumerationSpecifier，这个时候需要把状态改为声明enum的状态，并且记录相应信息。
 * 仅在非声明struct的过程中有用
 * */
MyCustomListener.prototype.exitEnumSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#enumeratorList.
/**
 * 进入enumeratorList，所以必定是新声明
 * TODO 考虑当前符号表中的enum
 * */
MyCustomListener.prototype.enterEnumeratorList = function(ctx) {
};

// Exit a parse tree produced by CParser#enumeratorList.
MyCustomListener.prototype.exitEnumeratorList = function(ctx) {
};


// Enter a parse tree produced by CParser#enumerator.
MyCustomListener.prototype.enterEnumerator = function(ctx) {
};

// Exit a parse tree produced by CParser#enumerator.
/**
 * 离开一个enumerator的时候应该初始化相关的identifier，以及判断它有没有被初始化
 * TODO 需要考虑符号表中有没有这个identifier
 * TODO 初始化的时候需要有相关的expression的内容
 * */
MyCustomListener.prototype.exitEnumerator = function(ctx) {
    let enumerator = ctx.getChild(0).getText();
    let current_declaration = this.DeclarationStack.peekLast();
    if(enumerator in current_declaration.Enumerators){
        throw new Error(enumerator+" has already been declared in this enumerator");
    }else{
        current_declaration.Enumerators[enumerator] = ctx.getChildCount() !== 1;
    }
};


// Enter a parse tree produced by CParser#enumerationConstant.
MyCustomListener.prototype.enterEnumerationConstant = function(ctx) {
};

// Exit a parse tree produced by CParser#enumerationConstant.
MyCustomListener.prototype.exitEnumerationConstant = function(ctx) {
};


// Enter a parse tree produced by CParser#atomicTypeSpecifier.
MyCustomListener.prototype.enterAtomicTypeSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#atomicTypeSpecifier.
MyCustomListener.prototype.exitAtomicTypeSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#typeQualifier.
MyCustomListener.prototype.enterTypeQualifier = function(ctx) {
};

// Exit a parse tree produced by CParser#typeQualifier.
MyCustomListener.prototype.exitTypeQualifier = function(ctx) {
    this.DeclarationStack.peekLast().addTypeQualifier(ctx);
};


// Enter a parse tree produced by CParser#functionSpecifier.
MyCustomListener.prototype.enterFunctionSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#functionSpecifier.
MyCustomListener.prototype.exitFunctionSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#alignmentSpecifier.
MyCustomListener.prototype.enterAlignmentSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#alignmentSpecifier.
MyCustomListener.prototype.exitAlignmentSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#declarator.
MyCustomListener.prototype.enterDeclarator = function(ctx) {
    this.DeclaratorStack.peekLast().addDeclarator();
}

// Exit a parse tree produced by CParser#declarator.
MyCustomListener.prototype.exitDeclarator = function(ctx) {
    console.log("declarator: "+ctx.getText());
};


// Enter a parse tree produced by CParser#directDeclarator.
/**
 * 离开一个directDeclarator的情况，现在需要分别考虑普通的声明和struct中的声明
 * TODO 声明函数的情况还没有考虑
 * */
MyCustomListener.prototype.enterDirectDeclarator = function(ctx) {
    console.log("entering direct declarator: "+ctx.getText());
    let current_declarator = this.DeclaratorStack.peekLast();
    let length = ctx.getChildCount();
    if(length === 1){//产生identifier的情况
        current_declarator.Identifier = ctx.getText();
    }else if(ctx.getChild(length-1).symbol.type===Tokens.RightBracket){//产生一个数组
        console.log("constant expression: "+ctx.getChild(length-2).getText());
        current_declarator.addArrayDimension(ctx.getChild(length-2).getText());
    }else{//要么是函数，要么是'(' declarator ')'，也就是函数指针的情况之类
        if(ctx.getChild(length-2) instanceof TerminalNode&&ctx.getChild(length-2).symbol.type===Tokens.LeftParen){
            current_declarator.setCallable();
            console.log("callable detected");
        }else if(ctx.getChild(length-2).ruleIndex === Dict.RULE_parameterTypeList){
            current_declarator.setCallable();
            console.log("callable detected");
        }
    }
};

// Exit a parse tree produced by CParser#directDeclarator.
MyCustomListener.prototype.exitDirectDeclarator = function(ctx) {
};


// Enter a parse tree produced by CParser#pointer.
/**
 * 考虑产生指针的各种情况，需要把在struct内和外面分开讨论
 * */
MyCustomListener.prototype.enterPointer = function(ctx) {
    let count = ctx.getChildCount();
    let declarator = this.DeclaratorStack.peekLast();
    console.log("ptr at this level: "+ctx.getText());
    if(ctx.getChild(count-1).ruleIndex===Dict['RULE_typeQualifierList']){
        if(ctx.getChild(count-1).getText().search("const")!==-1){//包含const
            declarator.addPointer(true);
        }else{
            declarator.addPointer(false);
        }
    }else{
        declarator.addPointer(false);
    }
};

// Exit a parse tree produced by CParser#pointer.
MyCustomListener.prototype.exitPointer = function(ctx) {
};


// Enter a parse tree produced by CParser#typeQualifierList.
MyCustomListener.prototype.enterTypeQualifierList = function(ctx) {
};

// Exit a parse tree produced by CParser#typeQualifierList.
MyCustomListener.prototype.exitTypeQualifierList = function(ctx) {
};


// Enter a parse tree produced by CParser#parameterTypeList.
/**
 * 进入一个paramTypeList，推入一个新的符号表
 * */
MyCustomListener.prototype.enterParameterTypeList = function(ctx) {
    this.SymbolTableStack.push(new SymbolTable());
};

// Exit a parse tree produced by CParser#parameterTypeList.
/**
 * 离开一个parameterTypeList，弹出一个符号表，并且将这个符号表交给最顶上的declarator
 * TODO setParam
 * */
MyCustomListener.prototype.exitParameterTypeList = function(ctx) {
    let current_table = this.SymbolTableStack.pop();
    let current_declarator = this.DeclaratorStack.peekLast();
    console.log(current_table);
};


// Enter a parse tree produced by CParser#parameterList.
MyCustomListener.prototype.enterParameterList = function(ctx) {
};

// Exit a parse tree produced by CParser#parameterList.
MyCustomListener.prototype.exitParameterList = function(ctx) {
};


// Enter a parse tree produced by CParser#parameterDeclaration.
/**
 * 进入一个parameterDeclaration，此时应该信创建一个declaration放到declaration里面
 * */
MyCustomListener.prototype.enterParameterDeclaration = function(ctx) {
    let current_declaration = new VariableDeclaration();
    let current_declarator = new VariableDeclarator();
    current_declaration.CurrentDeclarator = current_declarator;
    this.DeclarationStack.push(current_declaration);
    this.DeclaratorStack.push(current_declarator);
};

// Exit a parse tree produced by CParser#parameterDeclaration.
/**
 * 此时应该导出相关的declaration
 * */
MyCustomListener.prototype.exitParameterDeclaration = function(ctx) {
    this.DeclarationStack.peekLast().exportDeclarator(this.SymbolTableStack.peekLast());
};


// Enter a parse tree produced by CParser#identifierList.
MyCustomListener.prototype.enterIdentifierList = function(ctx) {
};

// Exit a parse tree produced by CParser#identifierList.
MyCustomListener.prototype.exitIdentifierList = function(ctx) {
};


// Enter a parse tree produced by CParser#typeName.
MyCustomListener.prototype.enterTypeName = function(ctx) {
};

// Exit a parse tree produced by CParser#typeName.
MyCustomListener.prototype.exitTypeName = function(ctx) {
};


// Enter a parse tree produced by CParser#abstractDeclarator.
MyCustomListener.prototype.enterAbstractDeclarator = function(ctx) {
};

// Exit a parse tree produced by CParser#abstractDeclarator.
MyCustomListener.prototype.exitAbstractDeclarator = function(ctx) {
};


// Enter a parse tree produced by CParser#directAbstractDeclarator.
MyCustomListener.prototype.enterDirectAbstractDeclarator = function(ctx) {
};

// Exit a parse tree produced by CParser#directAbstractDeclarator.
MyCustomListener.prototype.exitDirectAbstractDeclarator = function(ctx) {
    console.log("direct abstract declarator: "+ctx.getText());
};


// Enter a parse tree produced by CParser#typedefName.
MyCustomListener.prototype.enterTypedefName = function(ctx) {
};

// Exit a parse tree produced by CParser#typedefName.
MyCustomListener.prototype.exitTypedefName = function(ctx) {
};


// Enter a parse tree produced by CParser#initializer.
MyCustomListener.prototype.enterInitializer = function(ctx) {
};

// Exit a parse tree produced by CParser#initializer.
MyCustomListener.prototype.exitInitializer = function(ctx) {
};


// Enter a parse tree produced by CParser#initializerList.
MyCustomListener.prototype.enterInitializerList = function(ctx) {
};

// Exit a parse tree produced by CParser#initializerList.
MyCustomListener.prototype.exitInitializerList = function(ctx) {
};


// Enter a parse tree produced by CParser#designation.
MyCustomListener.prototype.enterDesignation = function(ctx) {
};

// Exit a parse tree produced by CParser#designation.
MyCustomListener.prototype.exitDesignation = function(ctx) {
};


// Enter a parse tree produced by CParser#designatorList.
MyCustomListener.prototype.enterDesignatorList = function(ctx) {
};

// Exit a parse tree produced by CParser#designatorList.
MyCustomListener.prototype.exitDesignatorList = function(ctx) {
};


// Enter a parse tree produced by CParser#designator.
MyCustomListener.prototype.enterDesignator = function(ctx) {
};

// Exit a parse tree produced by CParser#designator.
MyCustomListener.prototype.exitDesignator = function(ctx) {
};


// Enter a parse tree produced by CParser#statement.
MyCustomListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#statement.
MyCustomListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#labeledStatement.
MyCustomListener.prototype.enterLabeledStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#labeledStatement.
MyCustomListener.prototype.exitLabeledStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#compoundStatement.
MyCustomListener.prototype.enterCompoundStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#compoundStatement.
MyCustomListener.prototype.exitCompoundStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#blockItemList.
MyCustomListener.prototype.enterBlockItemList = function(ctx) {
};

// Exit a parse tree produced by CParser#blockItemList.
MyCustomListener.prototype.exitBlockItemList = function(ctx) {
};


// Enter a parse tree produced by CParser#blockItem.
MyCustomListener.prototype.enterBlockItem = function(ctx) {
};

// Exit a parse tree produced by CParser#blockItem.
MyCustomListener.prototype.exitBlockItem = function(ctx) {
};


// Enter a parse tree produced by CParser#expressionStatement.
MyCustomListener.prototype.enterExpressionStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#expressionStatement.
MyCustomListener.prototype.exitExpressionStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#selectionStatement.
MyCustomListener.prototype.enterSelectionStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#selectionStatement.
MyCustomListener.prototype.exitSelectionStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#iterationStatement.
MyCustomListener.prototype.enterIterationStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#iterationStatement.
MyCustomListener.prototype.exitIterationStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#forCondition.
MyCustomListener.prototype.enterForCondition = function(ctx) {
};

// Exit a parse tree produced by CParser#forCondition.
MyCustomListener.prototype.exitForCondition = function(ctx) {
};


// Enter a parse tree produced by CParser#forDeclaration.
MyCustomListener.prototype.enterForDeclaration = function(ctx) {
};

// Exit a parse tree produced by CParser#forDeclaration.
MyCustomListener.prototype.exitForDeclaration = function(ctx) {
};


// Enter a parse tree produced by CParser#forExpression.
MyCustomListener.prototype.enterForExpression = function(ctx) {
};

// Exit a parse tree produced by CParser#forExpression.
MyCustomListener.prototype.exitForExpression = function(ctx) {
};


// Enter a parse tree produced by CParser#jumpStatement.
MyCustomListener.prototype.enterJumpStatement = function(ctx) {
};

// Exit a parse tree produced by CParser#jumpStatement.
MyCustomListener.prototype.exitJumpStatement = function(ctx) {
};


// Enter a parse tree produced by CParser#compilationUnit.
MyCustomListener.prototype.enterCompilationUnit = function(ctx) {
};

// Exit a parse tree produced by CParser#compilationUnit.
MyCustomListener.prototype.exitCompilationUnit = function(ctx) {
};


// Enter a parse tree produced by CParser#translationUnit.
MyCustomListener.prototype.enterTranslationUnit = function(ctx) {
};

// Exit a parse tree produced by CParser#translationUnit.
MyCustomListener.prototype.exitTranslationUnit = function(ctx) {
};


// Enter a parse tree produced by CParser#externalDeclaration.
MyCustomListener.prototype.enterExternalDeclaration = function(ctx) {
};

// Exit a parse tree produced by CParser#externalDeclaration.
MyCustomListener.prototype.exitExternalDeclaration = function(ctx) {
};


// Enter a parse tree produced by CParser#functionDefinition.
MyCustomListener.prototype.enterFunctionDefinition = function(ctx) {
};

// Exit a parse tree produced by CParser#functionDefinition.
MyCustomListener.prototype.exitFunctionDefinition = function(ctx) {
};


// Enter a parse tree produced by CParser#declarationList.
MyCustomListener.prototype.enterDeclarationList = function(ctx) {
};

// Exit a parse tree produced by CParser#declarationList.
MyCustomListener.prototype.exitDeclarationList = function(ctx) {
};



exports.MyCustomListener = MyCustomListener;