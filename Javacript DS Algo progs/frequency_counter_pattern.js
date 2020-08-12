frequencyCounter = (arr, arr2) => {


    if (arr.length !== arr2.length) return false;

    let freqCounterArr = {};
    let freqCounterArr2 = {};

    for (let val of arr) {
       freqCounterArr[val] = (freqCounterArr[val] || 0) + 1;
    }
    for (let val of arr2) {
        freqCounterArr2[val] = (freqCounterArr2[val] || 0) + 1;
     }
    for (let key in freqCounterArr) {
        if (!(key ** 2 in freqCounterArr2)) return false;
        if (freqCounterArr2[key ** 2] !== freqCounterArr[key]) return false;
    }

    return true;
} 

console.log(frequencyCounter([1, 2, 3], [4, 1, 9]));