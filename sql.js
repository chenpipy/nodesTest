/**
 * Created by Administrator on 2017/4/26.
 */
var mysql=require('mysql');
var pool=mysql.createPool({
    connectionLimit : 10,
    host            : '192.168.1.51',
    user            : 'qiniu',
    password        : '123456',
    database        : 'test'
});
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.query('select * from domain where domain_name=?',['中国黄金网'],function (error,results,fields) {
    if (error) throw error;
    console.log('The solution is:',results[0]);
});