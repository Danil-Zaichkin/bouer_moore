let f = function (char) {
    if (shift1[char])
        return char
    return 0
}

let fs = require('fs')
let data = fs.readFileSync('input.txt').toString()
let arg = process.argv

let s = data;
let t = arg[2];
let m = t.length;

let shift1 = new Array();
for (let i = 0; i < t.length; i++){
    shift1[t.charAt(i)] = -1
}
for (let i = t.length - 2; i > 0; i-- ){
    if (shift1[t.charAt(i)] === -1)
        shift1[t.charAt(i)] = i;
}

let shift2 = new Array();
let z = new Array();
let maxZidx = 0;
let maxZ = 0;

for (let i = 0; i <=m; i++) {
    z[i] = 0;
    shift2[i] = m;
}


for (let j = 1; j < m; j++) {
    if (j <= maxZ) z[j] = Math.min(maxZ - j + 1, z[j - maxZidx]);
    while (j + z[j] < m && t.charAt(m - 1 - z[j]) === t.charAt(m - 1 - (j + z[j]))) z[j]++;

    if (j + z[j] - 1 > maxZ) {
        maxZidx = j;
        maxZ = j + z[j] - 1;
    }
}

for (let i = m - 1; i > 0; i--) shift2[m - z[i]] = i;
for (let i = 1;  i <= m - 1; i++) {
    if ((i + z[i]) === m){
        for(let r = 0 ; r <= i; r++)
            if (shift2[r] === m) shift2[r] = i;
    }
}

let i = 0;
let l = 0;
let badChar = new String();
let ans = new Array();

while (i < s.length) {
    while(l < m){
        //console.log(s[m+i-l-1]);
        if (s[m+i-l-1] === t[m-l-1])
            l++;
        else {
            badChar = s[m+i-l-1]
            break
        }
    }
    if (l === m) {
        ans.push(i+1)
        i += m
    } else {
        i += Math.max(f(shift1[badChar]),shift2[l])-1;
    }
    l = 0;
}
console.log(ans)