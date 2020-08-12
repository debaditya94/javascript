anagramCheck = (str1, str2) => {
    
        if (str1.length !== str2.length) return false;
    
        let freqCounterStr = {};
        let freqCounterStr2 = {};
    
        for (let index = 0; index < str1.length; index++) {
            freqCounterStr[str1.charAt(index)] = (freqCounterStr[str1.charAt(index)] || 0) + 1;
        }
        for (let index = 0; index < str2.length; index++) {
            freqCounterStr2[str2.charAt(index)] = (freqCounterStr2[str2.charAt(index)] || 0) + 1;
         }
        for (let key in freqCounterStr) {
            if (!(key in freqCounterStr2)) return false;
            if (freqCounterStr2[key] !== freqCounterStr[key]) return false;
        }
    
        return true;
    } 
    
    console.log(anagramCheck('texttwisttime', 'timettwistext'));