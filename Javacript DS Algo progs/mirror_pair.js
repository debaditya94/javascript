mirrorPair = (arr) => {
    begPos = 0;
    endPos = arr.length - 1;
    while (begPos < endPos) {
        if (arr[begPos] + arr[endPos] === 0) return [arr[begPos], arr[endPos]];
        if (arr[begPos] + arr[endPos] < 0) ++begPos;
        if (arr[begPos] + arr[endPos] > 0) --endPos;
        
    }
    return undefined;
};

console.log(mirrorPair([-2,3]));