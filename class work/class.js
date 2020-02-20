class Hero{
    constructor(name, level){
        this.name = name;
        this.level= level;
    }

    greet(){
        return `${this.name} says hello.`;
    }
}

class Mage extends Hero{
    constructor (name, level, spell){
        super(name, level);
 

         this.spell= spell;
    }

}

const hero1 = new Hero("vard", 1);
const hero2= new Mage('kdabkas', 2, "kgbdkhbaks");

console.log(hero1.greet());
console.log(hero2.greet());