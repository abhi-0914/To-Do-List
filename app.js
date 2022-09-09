const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

var items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    // res.send("Hello");
    // res.sendFile(__dirname+"/index.html");

    // var today=new Date();
    // var currentday=today.getDay();
    // var day="";
    
    // switch(currentday)
    // {
    //     case 0 : day="Sunday";
    //             break;
    //     case 1 : day="Monday";
    //             break;
    //     case 2 : day="Tuesday";
    //             break;
    //     case 3 : day="Wednesday";
    //             break;
    //     case 4 : day="Thursday";
    //             break;
    //     case 5 : day="Friday";
    //             break;
    //     case 6 : day="Saturday";
    //             break;
    //     default:
    //     console.log("Error :Currennt Day Is Equal To :" +currentday);

    // }
    // if(today.getDay()===6|| today.getDay()===0){
    //     day="WeekEnd";
    //     // res.send("<h1> It Is Weekend </h1>");
    // }
    // else
    // {
    //     day="WeekDay";
    //     // res.write("<h1>It Is Working Day</h1>");
    //     // res.write("<h1>Go Ahead And Work</h1>");
    // }
    let day=date();
    res.render("list",{listTitle:day,newlistitems:items});
});
app.post("/",function(req,res){
    var item=req.body.newItem;
    if(req.body.list==="Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newlistitems:workItems});
})
app.post("/work",function(req,res){
    let item=req.body.newItem;
    items.push(item);
    res.redirect("/work");
})

app.listen(3000,function(){
    console.log("Server Started On Port 3000");
});