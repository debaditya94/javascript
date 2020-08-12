uniqueValuesCount = (arr) => {

    return [...new Set(arr)].length;
};

console.log(uniqueValuesCount([1,1,1,1,1,1,1,2,2,2,2,3]));