const VariableDecl = require("../Symbols/VariableDecl").VariableDecl;
const StructUnionDecl = require("../Symbols/StructUnionDecl").StructUnionDecl;
const EnumerationDecl = require("../Symbols/EnumerationDecl").EnumerationDecl;
const Contexts = require("../common/Contexts").ContextDict
const Tokens = require("../common/CToken").Tokens
const SymbolEntry = require("../Symbols/SymbolEntry").SymbolEntry;
const SymbolTable = require("../Symbols/SymbolTable").SymbolTable;
/*用来关注声明的时候的共性，比如各种类型什么的*/
function Declaration(){
    this.Name = undefined;
    this.IsStatic = false;
    this.Signed = undefined;
    this.IsConstant = false;
    this.CurrentDeclarator = undefined;
    this.Type = undefined;
    this.Enumerators = {};
    this.HasInnerDeclaration = false;
    this.StructDecl = undefined;
    this.StructMember = new SymbolTable();
    return this;
}

Declaration.prototype.IsStatic = false;//记录其存储方式
/*类型相关*/
Declaration.prototype.Type = undefined;//描述这个标识符的类型，比如基本类型，struct，enumeration，typedef
Declaration.prototype.Name = undefined;//如果不是基本类型，这里对应的就是struct/enumeration/typedef的名字
Declaration.prototype.Signed = undefined;
Declaration.prototype.IsConstant = false;//是不是常量，用来对付const
Declaration.prototype.Enumerators = undefined;//key是enumerator constant，value是是否完成了初始化
Declaration.prototype.HasInnerDeclaration = false;//enumeration或者struct是不是新声明的
Declaration.prototype.StructDecl = undefined;//用来记录正在声明的struct的信息
Declaration.prototype.StructMember = undefined;//用来记录struct/union的成员信息
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
 * @param specifier 输入的type specifier
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
/**
 * 向当前的声明中加入一个typeSpecifier，注意区分basicTypeSpecifier，struct/union，enum，typedefName等情况
 * @param ctx 当前加入的typeSpecifier
 * */
Declaration.prototype.addTypeSpecifier = function(ctx){
    console.log("aha!");
    if(ctx.getChild(0).getChildCount()===1){//基本类型或者typedefName，调用上面写好的就行
        /*TODO 考虑typedefName*/
        this.addBasicTypeSpecifier(ctx);
    }else{//enum, struct/union
        if(this.Type!==undefined) throw new Error("type conflicting current type: "+this.Type);
        this.Type = ctx.getChild(0).getChild(0).getText();
        if(ctx.getChild(0).getChild(1).symbol.type === Tokens['Identifier']){//有名字
            this.Name = ctx.getChild(0).getChild(1).getText();
        }else{//匿名
            this.Name = "*";
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
    } else if(this.Type==="struct"||this.Type==="union"){
        let members = "[";
        for(let member in this.StructMember){
            members+=("{"+member+": "+this.StructMember[member]+"}, ")
        }
        members+="]";
        return type+"<br>"+"name: "+this.Name+"<br>"+"members: "+members+"<br>";
    }
    else{
        let isStatic = "static: "+ this.IsStatic;
        let constant = "constant: "+this.IsConstant;
        let signed = "signed: "+(this.Signed===undefined?"signed":this.Signed);
        let type = "type: "+ (this.Type!==undefined?this.Type:"integer(default)");
        return isStatic+"<br>"+constant+"<br>"+signed+"<br>"+type+"<br>";
    }
}
/**
 * 导出当前的declarator，并且加入符号表中
 * TODO 如果不是匿名struct，要想办法把members搞过来
 * */
Declaration.prototype.exportDeclarator = function(table){
    console.log("exported as: "+this.CurrentDeclarator.DirectDeclarators);
    let entry = new VariableDecl();
    entry.Signed = this.Signed;
    entry.Type = this.Type===undefined?"int":this.Type;
    entry.IsStatic = this.IsStatic;
    entry.IsConstant = this.IsConstant;
    entry.Name = this.Name;
    entry.ArrayDimension = this.CurrentDeclarator.ArraySize;
    entry.ConstantPointer = this.CurrentDeclarator.ConstantPointer;
    entry.Identifier = this.CurrentDeclarator.Identifier;
    entry.Members = this.StructMember;
    table.addSymbol(entry.Identifier, entry);
    return entry;
}
/**
 * 导出当前的声明，比如struct/union,enumeration 什么的到符号表
 * TODO 需要考虑enumeration里面初始化的工作
 * @param table 符号表
 * */
Declaration.prototype.exportDeclaration = function(table){
    switch(this.Type){
        case "enum":
            let enumDecl = new EnumerationDecl();
            enumDecl.Identifier = this.Name;
            console.log("exporting enumeration: "+this.Enumerators);
            for(let constant in this.Enumerators){
                let entry = EnumerationDecl.enumConstantEntry(constant, this.Enumerators[constant])
                enumDecl.Constants.addSymbol(constant, entry);
                table.addSymbol(constant, entry);
            }
            if(this.Name!=="*")table.addSymbol(this.Name, enumDecl);
            return enumDecl;
        case "union":
        case "struct":
            let structDecl = new StructUnionDecl();
            for( let identifier in this.StructMember.index){
                let pos = this.StructMember.index[identifier];
                structDecl.StructTable.addSymbol(identifier, this.StructMember.fields[pos]);
            }
            structDecl.Identifier = this.Name;
            structDecl.Type = this.Type;
            table.addSymbol(structDecl.Identifier, structDecl);
            return structDecl;
    }
}
exports.VariableDeclaration = Declaration