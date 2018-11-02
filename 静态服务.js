/**
 * Created by Administrator on 2017/4/26.
 */
var express=require('express');
var app=express();
app.use(express.static('public'))
app.listen(3000);
