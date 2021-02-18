function SymbolEntry(){
    /*basic part of the symbol*/
    this.IdentifierType = undefined;// variable/function/struct/enumeration/typedef
    this.IsConstant = [];// is the pointer a constant.
    this.DataType = undefined;// the final type of the identifier can be a struct or enumeration.
    this.StorageType = undefined; // static or local

    /*things about array*/
    this.Sizes = [];// the size of dimensions of array.
    this.Dimensions = 0;// number of dimensions of the array.

    /*things about enumeration*/
    this.Constants = {};

    /*things about struct*/
    this.StructTable = new SymbolTable();

    /*things about function*/
    this.ReturnType = undefined;
    this.ParameterList = [];

    return this
}

exports.SymbolEntry = SymbolEntry;