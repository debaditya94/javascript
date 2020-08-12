const expensive = args => {
    console.log("Expensive");
};
window.addEventListener("resize", betterExpensive);

const betterExpensive = throttle(expensive, limit);

const throttle = (func, limit) => {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            func.apply(context, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    }
};