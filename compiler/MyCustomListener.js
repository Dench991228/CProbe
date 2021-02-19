// Generated from C.g4 by ANTLR 4.7
// jshint ignore: start

Object.prototype.toString = function(){
    let result = "";
    for(let item in this){
        if(!(this[item] instanceof Function))result += item+": "+this[item]+"<br>";
    }
    return result;
}
var antlr4 = require('./antlr4/index');
const CListener = require('./CListener').CListener
var VariableDeclaration = require("./declaration/Declaration").VariableDeclaration
var VariableDeclarator = require("./declaration/VariableDeclarator").VariableDeclarator
var Dict = require("./common/Contexts").ContextDict
var Tokens = require("./common/CToken").Tokens
var StructDeclaration = require("./declaration/StructUnionDeclaration").StructDeclaration
const SymbolTable = require("./Symbols/SymbolTable").SymbolTable

// This class defines a complete listener for a parse tree produced by CParser.
function MyCustomListener() {
    CListener.call(this)
    return this;
}

MyCustomListener.prototype = Object.create(CListener.prototype);
MyCustomListener.prototype.constructor = MyCustomListener;
MyCustomListener.prototype.CurrentDeclaration = new VariableDeclaration();
MyCustomListener.prototype.SymbolTable = new SymbolTable();

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


// Enter a parse tree produced by CParser#declaration.
MyCustomListener.prototype.enterDeclaration = function(ctx) {
    this.CurrentDeclaration = new VariableDeclaration();
};

// Exit a parse tree produced by CParser#declaration.
/**
 * 退出一个声明的时候，把之前的enum，union，struct什么的都给导出，如果没有名字（名字是*），那就没有它
 * */
MyCustomListener.prototype.exitDeclaration = function(ctx) {
    if(this.CurrentDeclaration.Name!=="*")this.CurrentDeclaration.exportDeclaration(this.SymbolTable);
    document.getElementById("table").innerHTML+=this.SymbolTable+"<br>";
    let count_child = ctx.getChildCount();
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
    this.CurrentDeclaration.CurrentDeclarator = new VariableDeclarator();
};

// Exit a parse tree produced by CParser#initDeclarator.
MyCustomListener.prototype.exitInitDeclarator = function(ctx) {
    let declarator = this.CurrentDeclaration.exportDeclarator(this.SymbolTable);
    document.getElementById("output").innerHTML+= declarator+"<br>"
};


// Enter a parse tree produced by CParser#storageClassSpecifier.
MyCustomListener.prototype.enterStorageClassSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#storageClassSpecifier.
MyCustomListener.prototype.exitStorageClassSpecifier = function(ctx) {
    this.CurrentDeclaration.addStorageSpecifier(ctx);
};


// Enter a parse tree produced by CParser#BasicTypeSpecifier.
MyCustomListener.prototype.enterBasicTypeSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#BasicTypeSpecifier.
/**
 * 加上一个基本类型的typeSpecifier，仅在不声明structOrUnion的时候使用
 * */
MyCustomListener.prototype.exitBasicTypeSpecifier = function(ctx) {
    if(!this.CurrentDeclaration.IsInnerDeclaration)this.CurrentDeclaration.addBasicTypeSpecifier(ctx);
};


// Enter a parse tree produced by CParser#StructUnionSpecifier.
MyCustomListener.prototype.enterStructUnionSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#StructUnionSpecifier.
MyCustomListener.prototype.exitStructUnionSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#EnumerationSpecifier.
MyCustomListener.prototype.enterEnumerationSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#EnumerationSpecifier.
MyCustomListener.prototype.exitEnumerationSpecifier = function(ctx) {
};


// Enter a parse tree produced by CParser#TypeDefSpecifier.
MyCustomListener.prototype.enterTypeDefSpecifier = function(ctx) {
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
    if(this.CurrentDeclaration.IsInnerDeclaration)return;
    if(this.CurrentDeclaration.Type!==undefined){
        throw new Error("conflicting type in struct");
    }
    this.CurrentDeclaration.Type=ctx.getChild(0).getText();
    if(ctx.getChild(1).symbol.type===Tokens['Identifier']){//如果是有名字的，那就记录其名字
        this.CurrentDeclaration.Name = ctx.getChild(1).getText();
    }else{//否则是一个星号
        this.CurrentDeclaration.Name = "*";
    }
    if(ctx.getChild(ctx.getChildCount()-1).symbol.type===Tokens['RightBrace']){
        if(this.CurrentDeclaration.IsInnerDeclaration){//如果正在声明新的struct，那就抛出异常
            throw new Error("nested declaration of struct not supported!")
        }
        this.CurrentDeclaration.IsInnerDeclaration = true;
        this.CurrentDeclaration.StructDecl = new StructDeclaration();
    }
};

// Exit a parse tree produced by CParser#structOrUnionSpecifier.
/**
 * 离开了structOrUnion的声明，此时应该把IsDeclaration改成false
 * */
MyCustomListener.prototype.exitStructOrUnionSpecifier = function(ctx) {
    this.CurrentDeclaration.IsInnerDeclaration = false;
};


// Enter a parse tree produced by CParser#structOrUnion.
MyCustomListener.prototype.enterStructOrUnion = function(ctx) {
};

// Exit a parse tree produced by CParser#structOrUnion.
MyCustomListener.prototype.exitStructOrUnion = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclarationList.
MyCustomListener.prototype.enterStructDeclarationList = function(ctx) {
};

// Exit a parse tree produced by CParser#structDeclarationList.
MyCustomListener.prototype.exitStructDeclarationList = function(ctx) {
};


// Enter a parse tree produced by CParser#structDeclaration.
/**
 * 初始化新的struct成员的声明状态
 * */
MyCustomListener.prototype.enterStructDeclaration = function(ctx) {
    this.CurrentDeclaration.StructDecl = new StructDeclaration();
};

// Exit a parse tree produced by CParser#structDeclaration.
MyCustomListener.prototype.exitStructDeclaration = function(ctx) {
};


// Enter a parse tree produced by CParser#specifierQualifierList.
MyCustomListener.prototype.enterSpecifierQualifierList = function(ctx) {
};

// Exit a parse tree produced by CParser#specifierQualifierList.
/**
 * 在声明struct/union的过程中会用到
 * TODO 别忘了考虑其他情况
 * */
MyCustomListener.prototype.exitSpecifierQualifierList = function(ctx) {
    let length = ctx.getChildCount();
    for(let i=0;i<length;i++){
        if(ctx.getChild(i).ruleIndex===Dict['RULE_typeSpecifier']){
            this.CurrentDeclaration.StructDecl.addTypeSpecifier(ctx.getChild(i));
        }else{
            this.CurrentDeclaration.StructDecl.addTypeQualifier(ctx.getChild(i));
        }
    }
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
    this.CurrentDeclaration.StructDecl.newDeclarator();
};

// Exit a parse tree produced by CParser#structDeclarator.
/**
 * 离开structDeclarator的时候需要导出相关信息
 * */
MyCustomListener.prototype.exitStructDeclarator = function(ctx) {
    let declarator = this.CurrentDeclaration.StructDecl.exportDeclarator();
    this.CurrentDeclaration.StructMember[declarator.Identifier] = declarator;
};


// Enter a parse tree produced by CParser#enumSpecifier.
MyCustomListener.prototype.enterEnumSpecifier = function(ctx) {
};

// Exit a parse tree produced by CParser#enumSpecifier.
/**
 * 遇到一个EnumerationSpecifier，这个时候需要把状态改为声明enum的状态，并且记录相应信息。
 * 仅在非声明struct的过程中有用
 * */
MyCustomListener.prototype.exitEnumSpecifier = function(ctx) {
    if(this.CurrentDeclaration.IsInnerDeclaration)return;
    this.CurrentDeclaration.Type="enum";
    if(ctx.getChild(1).symbol.type===Tokens.Identifier){//中间是一个identifier
        this.CurrentDeclaration.Name = ctx.getChild(1).getText();
    }else{//匿名enum
        this.CurrentDeclaration.Name = "*";
        this.CurrentDeclaration.IsInnerDeclaration = false;
    }
    this.CurrentDeclaration.IsInnerDeclaration = false;
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
    if(enumerator in this.CurrentDeclaration.Enumerators){
        throw new Error(enumerator+" has already been declared in this enumerator");
    }else{
        this.CurrentDeclaration.Enumerators[enumerator] = ctx.getChildCount() !== 1;
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
    this.CurrentDeclaration.addTypeQualifier(ctx);
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
};

// Exit a parse tree produced by CParser#declarator.
MyCustomListener.prototype.exitDeclarator = function(ctx) {
};


// Enter a parse tree produced by CParser#directDeclarator.
MyCustomListener.prototype.enterDirectDeclarator = function(ctx) {
};

// Exit a parse tree produced by CParser#directDeclarator.
/**
 * 离开一个directDeclarator的情况，现在需要分别考虑普通的声明和struct中的声明
 * TODO 声明函数的情况还没有考虑
 * */
MyCustomListener.prototype.exitDirectDeclarator = function(ctx) {
    let length = ctx.getChildCount();
    let declarator = this.CurrentDeclaration.IsInnerDeclaration&&this.CurrentDeclaration.Type==="struct"?this.CurrentDeclaration.StructDecl.CurrentDeclarator:this.CurrentDeclaration.CurrentDeclarator
    if(length===1){//产生了一个标识符的情况
        declarator.Identifier = ctx.getText();
    }else if(ctx.getChild(length-1).symbol.type===Tokens['RightBracket']){//声明数组的情况，这种情况下需要增加数组的维度
        declarator.ArraySize += 1;
    }else if(ctx.getChild(length-1).symbol.type===Tokens['RightParen']){//声明函数的情况

    }
};


// Enter a parse tree produced by CParser#pointer.
MyCustomListener.prototype.enterPointer = function(ctx) {
};

// Exit a parse tree produced by CParser#pointer.
/**
 * 考虑产生指针的各种情况，需要把在struct内和外面分开讨论
 * */
MyCustomListener.prototype.exitPointer = function(ctx) {
    let count = ctx.getChildCount();
    let declarator = this.CurrentDeclaration.IsInnerDeclaration?this.CurrentDeclaration.StructDecl.CurrentDeclarator:this.CurrentDeclaration.CurrentDeclarator;
    if(ctx.getChild(count-1).ruleIndex===Dict['RULE_typeQualifierList']){//只要最后一个是QualifierList，就要考虑是不是常量指针
        if(ctx.getChild(count-1).getText().search("const")!==-1){//包含const
            declarator.addPointer(true);
        }else{
            declarator.addPointer(false);
        }
    }else{//最后连个QualifierList都没有，显然是非常数指针
        declarator.addPointer(false);
    }
};


// Enter a parse tree produced by CParser#typeQualifierList.
MyCustomListener.prototype.enterTypeQualifierList = function(ctx) {
};

// Exit a parse tree produced by CParser#typeQualifierList.
MyCustomListener.prototype.exitTypeQualifierList = function(ctx) {
};


// Enter a parse tree produced by CParser#parameterTypeList.
MyCustomListener.prototype.enterParameterTypeList = function(ctx) {
};

// Exit a parse tree produced by CParser#parameterTypeList.
MyCustomListener.prototype.exitParameterTypeList = function(ctx) {
};


// Enter a parse tree produced by CParser#parameterList.
MyCustomListener.prototype.enterParameterList = function(ctx) {
};

// Exit a parse tree produced by CParser#parameterList.
MyCustomListener.prototype.exitParameterList = function(ctx) {
};


// Enter a parse tree produced by CParser#parameterDeclaration.
MyCustomListener.prototype.enterParameterDeclaration = function(ctx) {
};

// Exit a parse tree produced by CParser#parameterDeclaration.
MyCustomListener.prototype.exitParameterDeclaration = function(ctx) {
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