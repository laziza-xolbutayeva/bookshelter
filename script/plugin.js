
function $(str){
    const element=document.querySelector(str);
    return element;
}
function $a(str){
    return document.querySelectorAll(str);
}

function createElements(tag,clas,comment){
    const div=document.createElement(tag);
    div.setAttribute("class",clas);
    div.innerHTML=comment;
    return div;
}