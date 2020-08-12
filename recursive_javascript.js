//To flatten a deeply nested json (could be n-level json)
let user = {
    name: "Akshay",
    address: {
        personal: {
            city: "Dehradun",
            area: "Majra"
        },
        office: {
            city: "Hyderabad",
            area: {
                landmark: "Hitech"
            }
        }
    }
};
let final_obj = {};
let magic = (obj, parent) => {
    for(let key in obj) {
        if (typeof(obj[key] === 'object')) {
            magic(obj[key], parent+"_"+key);
        }else {
            final_obj[parent+"_"+key] = obj[key];
        }
    }
};
magic (user, "user");