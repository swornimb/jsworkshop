var music = ["jazz", "blues"];
console.log(music);

music.push("Rock-n-roll");
console.log(music);

music.splice(1, 1, "classic"); 
console.log(music);

var x= music.shift();
console.log(x);

var x= music.unshift("swornim");
console.log(music);