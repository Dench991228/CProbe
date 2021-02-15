const antlr4 = require("./antlr4/index")
const CustomLexer = require("./CLexer.js")
const CustomParser = require("./CParser.js")
const MyCustomListener = require("./MyCustomListener.js").MyCustomListener

function executeParse() {
    document.getElementById("output").innerHTML = "";
    //document.getElementById("stack").innerHTML = "";
    var input = document.getElementById('editor').textContent.replaceAll("\u00a0", " ");
    var input_stream = new antlr4.InputStream(input);
    var lexer = new CustomLexer.CLexer(input_stream);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new CustomParser.CParser(tokens);
    parser.buildParseTrees = true;

    antlr4.tree.ParseTreeWalker.DEFAULT.walk(new MyCustomListener(), parser.translationUnit())
}

window.executeParse = executeParse;