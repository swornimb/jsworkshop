var book = [];
book[1] = {
    author:"swornim",
    name:"nepal",
    pages: 111
}
book[2] = {
    author:"swornim2",
    name:"nepal2",
    pages: 222
}
book[3] = {
    author:"swornim3",
    name:"nepal3",
    pages: 333
}
var arr=[];

for(var i=1; i<=3; i++){
    arr.push(book[i]);
}

console.log(arr)
