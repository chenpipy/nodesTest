/**
 * Created by Administrator on 2017/12/6.
 */
var fs=require("fs");
function text(){
    return new Promise((resolve) =>{
      if(10<5){
          resolve(true)
      }else{
          resolve(false)
      }
    })
}
function text2(){
    return new Promise((resolve) =>{
        if(2<5){
            resolve(true)
        }else{
            resolve(false)
        }
    })
}

var workSpace="C:/Users/Administrator/Desktop/1/1124/";
var fileName="别墅道路.xlsx"
var resuleName="reult.xlsx";
function isExist(workSpace) {
    return new Promise(function (resolve,reject) {
        fs.access(workSpace+resuleName,function (err) {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}
async function get() {
    var result=await text();
    var result2=await text2();
    var result3=await isExist(workSpace)
    console.log(result)
    console.log(result2)
    console.log(result3)
}
get()