/**
 * @desc 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
const arrEqual=(arr1,arr2)=>{
    "use strict";
     // if (arr1 ===arr2) return true;
    if (arr1.length!=arr2.length) return false;
    for(let i=0;i<arr1.length;i++){
        if(arr1[i]!==arr2[i]) return false;
    }
    return true;
}
console.log(arrEqual("a","a"))
/**
 * @desc 判断`obj`是否为空
 * @param {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
}
console.log(isEmptyObject({})+"对象")
