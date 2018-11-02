/**
 * Created by Administrator on 2017/4/28.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '192.168.1.51',
    user: 'qiniu',
    password: '123456',
    database: 'traffic'
});


//查找数据
exports.query = function (tableName, params, callback) {
    pool.query('select ?? from ?? ',[params,tableName] ,function (error, results, fields) {
        if (error) callback(error, results);
        if (results != null) {
            callback(null,results);
        }
    })
}

