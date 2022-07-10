let name1 = {
    firstname: "Akshay",
    lastname: "Saini",
};

let printFullName = function (hometown, state, country) {
    console.log(this.firstname + " " + this.lastname + " from " + hometown + " , " + state + " , " + country);
};
printFullName.call(name1, "Dehradun", "Uttarakhand");
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
Function.prototype.mybind = function (...args) {
    let obj = this;
    params = args.slice(1);
    return function (...args2) {
        obj.apply(args[0], [...params, ...args2]);
    }
}

let printMyname2 = printFullName.mybind(name2, "Mumbai", "Maharashtra");
console.log(printMyname);
printMyname2("India");
// function subContMaxSum(a) {
//     if(!a || a.length == 0) return 0;
//     let sum = 0, maxSum = 0, allValuesNegative = true;
//     for (let i = 0; i < a.length; i++) {
//         if(a[i] > 0) allValuesNegative = false;
//          sum = Math.max(0, sum + a[i]);
//          maxSum = Math.max(maxSum, sum);
//     }
//     if(allValuesNegative) return Math.max(...a);
//     else return maxSum;
// }
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
function dish() {

    const numberOfDays = parseInt(readline());
    var inputs = readline().split(' ');
    let dishSchedule = '';
    let carbCount = 0, fatCount = 0, fiberCount = 0, xPrepared = false, yPrepared = false;
    for (let i = 0; i < numberOfDays; i++) {
        const ingredient = inputs[i];
        if (ingredient.includes("FAT")) fatCount++;
        if (ingredient.includes("FIBER")) fiberCount++;
        if (ingredient.includes("CARB")) carbCount++;
        // console.log(fatCount, fiberCount, carbCount);
        if (fatCount + fiberCount + carbCount < 4) {
            dishSchedule += '-';
            continue;
        }
        else {
            if (!xPrepared && !yPrepared) {
                if (fatCount >= 2) {
                    if (fatCount === 4) {
                        fatCount -= 4;
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        continue;
                    }
                    else if (fatCount === 3 && fiberCount >= 1) {
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        fatCount -= 3; fiberCount -= 1;
                        continue;
                    }
                    else if (fatCount === 2 && fiberCount >= 2) {
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        fatCount -= 2; fiberCount -= 2;
                        continue;
                    }
                    else {
                        dishSchedule += '-';
                        continue;
                    }
                }
                else if (carbCount >= 1 && fiberCount >= 1) {

                    if (carbCount === 1 && fiberCount >= 3) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 1; fiberCount -= 3;
                        continue;
                    }
                    else if (fiberCount === 1 && fiberCount >= 1) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 3; fiberCount -= 1;
                        continue;
                    }
                    else if (carbCount > 1 && fiberCount > 1) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 2; fiberCount -= 2;
                        continue;
                    }
                    else {
                        dishSchedule += '-';
                        continue;
                    }
                }
                else {
                    dishSchedule += '-';
                    continue;
                }
            }
            if (xPrepared) {
                if (carbCount >= 1 && fiberCount >= 1) {
                    if (carbCount === 1 && fiberCount >= 3) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 1; fiberCount -= 3;
                        continue;
                    }
                    else if (fiberCount === 1 && carbCount >= 3) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 3; fiberCount -= 1;
                        continue;
                    }
                    else if (carbCount > 1 && fiberCount > 1) {
                        dishSchedule += 'Y';
                        yPrepared = true;
                        xPrepared = false;
                        carbCount -= 2; fiberCount -= 2;
                        continue;
                    }
                    else {
                        dishSchedule += '-';
                        continue;
                    }
                }
                else {
                    dishSchedule += '-';
                    continue;
                }
            }
            if (yPrepared) {
                if (fatCount >= 2) {
                    if (fatCount === 4) {
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        fatCount -= 4;
                        continue;
                    }
                    else if (fatCount === 3 && fiberCount >= 1) {
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        fatCount -= 3; fiberCount -= 1;
                        continue;
                    }
                    else if (fatCount === 2 && fiberCount >= 2) {
                        dishSchedule += 'X';
                        xPrepared = true;
                        yPrepared = false;
                        fatCount -= 2; fiberCount -= 2;
                        continue;
                    }
                    else {
                        dishSchedule += '-';
                        continue;
                    }
                }
                else {
                    dishSchedule += '-';
                    continue;
                }
            }
        }
    }
    console.log(dishSchedule);
}
