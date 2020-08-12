// Given an array of integers, find the subset of non-adjacent elements with the maximum sum. Calculate the sum of that subset.

// For example, given an array  we have the following possible subsets:

// Subset      Sum
// [-2, 3, 5]   6
// [-2, 3]      1
// [-2, -4]    -6
// [-2, 5]      3
// [1, -4]     -3
// [1, 5]       6
// [3, 5]       8
// Our maximum subset sum is 8 .

function maxSubsetSum(arr) {
    
        if (arr.length == 0) return 0;
        if (arr.length == 1) return arr[0];
        if (arr.length == 2) return Math.max(arr[0], arr[1]);
    
        
        let dpArr = new Array(arr.length).fill(0);
        dpArr[0] = arr[0];
        dpArr[1] = Math.max(arr[0], arr[1]);
    
        
        let maxSum = dpArr[1];
        for(let i = 2; i < dpArr.length; i++){
            dpArr[i] = Math.max(arr[i], maxSum,dpArr[i - 2] + arr[i]);
            maxSum = dpArr[i];
        } 
    
        return maxSum;
    
    }

    console.log(maxSubsetSum([3, 5, -7, 8, 10]));