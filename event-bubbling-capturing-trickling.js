document.querySelector("#grandparent").addEventListener('click', (e) => {
    console.log("Grandparent Clicked");
    e.stopPropagation();
}, true);

document.querySelector("#parent").addEventListener('click', () => {
    console.log("Parent Clicked");
}, true);

document.querySelector("#child").addEventListener('click', () => {
    console.log("Child Clicked");
}, true);

var sayCount = function(numberStr) {
    if(numberStr.length === 1) return '1'+numberStr;
    let p = 0, q = 1, result = "";
    while(p < numberStr.length) {
        if(numberStr[p] === numberStr[q]) q++;
        if(numberStr[p] !== numberStr[q]) {
            if(q - p >= 1) {
                result = result + '' + (q - p) + '' + numberStr[p];
            }
            p = q;
            q++;
        }
    }
    return result;
    };
var countAndSayHelper = function(num, result) {
       if(num === 1) {
           return result;
       }
       let resultCount = sayCount(result);
       return countAndSayHelper(num - 1, resultCount);
       
   }
var countAndSay = function(n) {
  return countAndSayHelper(n, "1");
};