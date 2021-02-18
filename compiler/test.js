function display(){
    let str = document.getElementById("editor").textContent
    console.log("str:"+str);
    for(let i=0;i<str.length;i++){
        console.log(str.charAt(i)+":"+str.charCodeAt(i).toString(16))
    }
}
ins = [{opcode:"sdsdsd", number:"asdads"},{},{}]