let name = {
    firstname: "Akshay",
    lastname: "Saini",
};

let printFullName = function (hometown, state, country) {
    console.log(this.firstname + " " + this.lastname + " from " + hometown  + " , " + state + " , " + country);
}
printFullName.call(name, "Dehradun", "Uttarakhand");
let name2 = {
    firstname: "Sachin",
    lastname: "Tendulkar",
};

//function borrowing
printFullName.call(name2, "Mumbai", "Maharashtra");
printFullName.apply(name2, ["Mumbai", "Maharashtra"]);

//bind method
let printMyname = printFullName.bind(name2, "Mumbai", "Maharashtra");
console.log(printMyname);
printMyname();

//bind polyfill
Function.prototype.mybind = function(...args) {
    let obj = this;
    params = args.slice(1); 
    return function (...args2) {
        obj.apply(args[0],[...params, ...args2]);
    }
}

let printMyname2 = printFullName.mybind(name2, "Mumbai", "Maharashtra");
console.log(printMyname);
printMyname2("India");