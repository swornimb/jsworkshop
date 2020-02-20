myarray=["Nepal","United State of Americadsbdks", "United State of America" ]
var mylargest = 0;
var mylargest_str ="";
// console.log(myarray.length)
for(var i=0; i<myarray.length; i++){
    if(mylargest<myarray[i].length){
        mylargest=myarray[i].length;
        mylargest_str=myarray[i];
    }

}
console.log(mylargest_str)

