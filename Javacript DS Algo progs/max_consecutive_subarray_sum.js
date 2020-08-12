maxConsecutiveSubarraySum = (arr, num) => {
    if(arr.length < num) return null;
    let maxSum = 0;
    let tempSum = 0;
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum + arr[i] - arr[i -num]; //removing the old element & adding the new element
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
};
// console.log([1,2,5,2,8,1,5].slice(0,4));
console.log(maxConsecutiveSubarraySum([1,2,5,2,8,1,5], 4));