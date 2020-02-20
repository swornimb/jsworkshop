class Rectangle{
    constructor(length, breath){
        this.length= length;
        this.breath= breath;
    }
    area(){
       this.x=  this.length*this.breath;
    }
    print(){
        console.log(`${this.x} is area`);
    }
}

const r1= new Rectangle(10, 20);
console.log(r1.area()) 
r1.print();