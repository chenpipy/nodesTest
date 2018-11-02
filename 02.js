var tempArray=[{"长沙":1},{"长沙":3},{"长沙":2},{"北京":2},{"上海":2},{"北京":2},{"武汉":2}]
//从json数据取出月份，不重复的月份，存入新的数组
var mon = [];
for (var i = 1; i < tempArray.length; i++) {
    var repeat = false;
    for (var j = 0; j < mon.length; j++) {
        if (mon[j] == tempArray[i].clickdate.substring(0,7)) {
            repeat = true
            break
        }
    }
    if (!repeat) {
        //不重复push 结果数组
        mon.push(tempArray[i].clickdate.substring(0,7))
    }
}
console.log(mon);
//对月份的数组进行遍历，从整个json数据中遍历每月份的值求和
// var monvalue = [];
// var one = 0;
// for(var j = 0;j<mon.length;j++){
//     var one = 0;
//     for(var i=0;i<obj.length;i++){
//         if(obj[i].clickdate.substring(0,7) == mon[j]){
//             one += parseInt(obj[i].value);
//         }
//     }
//     monvalue.push(one);
// }
//
// //把获取到的两个数组组合为一个数组，
// var json_arr = [];
// for (var i=0;i<mon.length;i++){
//     //      json_arr[mon[i]] = monvalue[i];
//     json_arr.push([mon[i],monvalue[i]]);
// }