let arr = ["Akshay", "Aditya"];
let object = {
    name: "Akshay",
    city: "Dehradun",
    getIntro: function() {
        console.log(this.name + " from " + this.city);
    }
};
function fun() {
    //
}
let object2 = {
    name: "Aditya"
};
//Never do this in real life. Causes huge performance issues
object2.__proto__ = object;

//property is defined as __proto__ so that coders don't mess it up by mistake