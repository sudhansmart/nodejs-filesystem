const express = require("express");
const fs = require("fs");
const pathModule =require("path")

const app = express();
const PORT = 3000;
const ouputFolder = "./output"

if(!fs.existsSync(ouputFolder)){
    fs.mkdirSync(ouputFolder);
}
 app.get('/createfile',(req,res)=>{
    const currentTime = new Date();
    const year =  currentTime.getFullYear().toString()
    const month = (currentTime.getMonth()+1).toString();
    const date = currentTime.getDate().toString()
    const hours =currentTime.getHours().toString()
    const mins = currentTime.getMinutes().toString()
    const secs = currentTime.getSeconds().toString()
//Creating FileName
    const fileName = `${year}-${month}-${date}-${hours}-${mins}-${secs}.txt`
// Creating File path
    const pathfile = pathModule.join(ouputFolder,fileName)
// writing file
    fs.writeFile(pathfile,currentTime.toISOString(),(err)=>{
        if (err) {
            res.status(500).send(`error found at writing File : ${err}`)
            return;
        }
        res.send(`File Created successfully at :${pathfile}`);    
    })
 })
  
app.get('/getfile',(req,res)=>{
    fs.readdir(ouputFolder,(err,files)=>{
        if(err){
            res.status(500).send(`error found at Reading File : ${err}`)
            return;
        }
        const textfiles = files.filter((file)=>pathModule.extname(file) === '.txt')
        res.json(textfiles)
    })
})







app.listen(PORT,()=>{
    console.log("connected to server at :",PORT)
});