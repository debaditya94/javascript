//Debouncing in Javascript

let counter = 0;
const getData = () => {
    // calls an API and gets Data
    console.log("Fetching Data ..", counter++);
}

const doSomeMagic = function (fn, d) {
    let timer;
    return function() {
        let context = this;
        args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, arguments);
        }, d);
    }
}

const betterFunction = doSomeMagic(getData, 300);