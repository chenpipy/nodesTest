/**
 * Created by Administrator on 2017/12/4.
 */
var xlsx = require("node-xlsx");
var fs = require("fs");
function degreeConvert(value) {

    console.log(typeof value)
    if(value){
        var du = value.split("°")[0];
        var fen = value.split("°")[1].split("′")[0];
        var miao = value.split("°")[1].split("′")[1].split('″')[0];
        return Math.abs(du) + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
    }else{
        return "";
    }


}
//配置这两项即可
var workSpace = "C:/Users/Administrator/Desktop/1/";
var fileName = "aa.xlsx"
var resuleName = "reult.xlsx";

//将buff文件写入excel中
var writeExcel = function writeExcel(workSpace, buffer) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(workSpace + resuleName, buffer, function (err) {
            if (err) {
                resolve(err)
            } else {
                resolve(">>>创建成功")
            }
        });
    })
}
//判断文件是否存在
var isExist = function (workSpace) {
    return new Promise(function (resolve, reject) {
        fs.access(workSpace + resuleName, function (err) {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}
//删除文件
var deleteFile = function (workSpace) {
    return new Promise(function (resolve, reject) {
        fs.unlink(workSpace + resuleName, function (err) {
            if (!err) {
                resolve(true);
            } else {
                resolve(false)
            }
        })
    })
}
async function convertDegree(workSpace, fileName) {
    var workSheetFromBuffer = xlsx.parse(fs.readFileSync(workSpace + fileName));
    var datas = workSheetFromBuffer[0].data;
    var indexxxx,
        indexyyy,
        orignX,
        orignY;
    for (var i = 0, length = datas.length; i < length; i++) {
        var data = datas[i];
        if (i == 0) {
            data.push("xxx");
            data.push("yyy");
            indexxxx = data.indexOf("xxx");
            indexyyy = data.indexOf("yyy");
            orignX = data.indexOf("经度");
            orignY = data.indexOf("纬度");
        } else {
            var xxx = data[orignX];
            var yyy = data[orignY];
            data[indexxxx] = degreeConvert(xxx);
            data[indexyyy] = degreeConvert(yyy)
        }
    }
    var buffer = xlsx.build([{name: "mySheetName", data: datas}]);
    var result;
    var exist = await isExist(workSpace);
    if (exist) {
        console.log(">>>result文件已存在");
        var isDeleteFile = await deleteFile(workSpace);
        if (isDeleteFile) {
            console.log(">>>删除成功");
            result = await writeExcel(workSpace, buffer);
        } else {
            console.log(">>>删除失败");
        }
    } else {
        console.log(">>>result文件不存在，可以创建");
        result = await writeExcel(workSpace, buffer);
    }
    console.log(result)

}

convertDegree(workSpace, fileName)
