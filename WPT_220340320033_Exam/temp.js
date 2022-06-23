const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.static('abc'));

let parameters = {
    host : 'localhost',
    user : 'bhavesh',
    password: 'cdac',
    database: 'bhaveshs1040',
    port: 3306
};

const cons = mysql.createconnection(parameters);

app.get("/getBook",(req, resp)=>{
    let bookid1 = req.query.bookid;
    console.log(bookid1);

    let details = {status: false, bookDetails:{}};

    cons.query('select bookid, bookname, price from book where bookid = ?',[bookid],
    (error, bookRows)=>{
        if(error){
            console.log("Error"+error);
        }
        else if(bookrows.length > 0){
            details.status = true;
            details.bookDetails.bookid = bookrows[0].bookid;
            details.bookDetails.bookname = bookrows[0].bookname;
            details.bookDetails.price = bookrows[0].price;   
        }
        console.log(bookrows);
        resizeTo.send(details);
    });
});


//Book Updation

app.get("/updateBook", (req, resp)=>{
    let bookid2 = req.query.bookid2;
    let bookname2 = req.query.bookname2;
    let price2 = req.query.price2;

    console.log(bookid2+" "+bookname2+" "+price2);

    let details = {status:false, book:{}};

    cons.query('update book set bookname = ?, price = ?, where bookid = ?',[bookname],
    (error, bookrows)=>{
        if(error){
            console.log("error "+error);
        }
        else if(bookrows.affectedrows > 0){
            details.status = true;
        }
        console.log(bookrows);
        resp.send(details);

    });
});

app.listen(8081, function(){
    console.log("server port connected to 8081")
});