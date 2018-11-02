/**
 * Created by Administrator on 2017/4/28.
 */
var express=require('express');
var app=express();
var db=require('./server/db.js');
var xlsx = require("node-xlsx");
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('src'));
app.get('/api/tollgate',function (req,res) {
    db.query('gis_tollgate',['longitude','latitude'],function (err,results) {
        if(err) {
            res.send({'result':'查询错误'});
            return;
        } ;
        res.send(results);
    })
});
app.post('/api/handExcel',urlencodedParser,function (req,res) {
    var obj=req.body
    var fileAddress=obj.fileAddress
    var fileName=obj.fileName
    var lonName=obj.lonName
    var latName=obj.latName
    console.log(req.body);//输出表单get提交的login_name

    convertDegree(fileAddress, fileName)
    console.log(req.body)

    res.send({"success":"转换成功"})
});

function degreeConvert(value) {

    console.log(typeof value)
    if(value){
        var du = value.split("°")[0];
        try{
            var fen = value.split("°")[1].split("′")[0];
        }catch(e) {
            var fen=""
        }
        try{
            var miao = value.split("°")[1].split("′")[1].split('″')[0];
        }catch(e) {
            var miao=""
        }
        return Math.abs(du) + (Math.abs(fen) / 60 + Math.abs(miao) / 3600);
    }else{
        return "";
    }


}
//配置这两项即可
// var workSpace = "C:/Users/Administrator/Desktop/1/";
// var fileName = "aa.xlsx"
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
}


app.listen(3000);
console.log("正在监听：3000端口")
