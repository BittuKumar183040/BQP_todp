let express = require('express');  
let bodyParser = require('body-parser'); 
let cors=require("cors")


let app = express();  
app.use(express.static('public')); 
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))

const port = process.env.PORT || 9000;

let data=[]

// all data get route
app.get('/', function (req, res) {
    res.status(200)
    res.send(data);
})  

// receive data from port 3000

app.get('/process_post',(req, res)=> {
    data.push({"item":req.query.item,"status":false})
    res.redirect('http://localhost:3000')
})

// delete requested data from with this route
app.get('/delete', (req, res) => {
    let id = req.query.item;
    let delSucess=false;
    data.forEach((element,idx) => {
        if(id === element.item)
        {
            delete data[idx]
            delSucess=true;
        }
    });
    res.status(202)
    res.redirect('http://localhost:3000')
  });
app.get('/done',(req,res)=>{

    let it=req.query.item;
    data.forEach((element) => {
        if(it === element.item)
        {
            let stInverse=element.status?false:true;
            element["status"]=stInverse;
        }
        res.status(200)
        res.redirect('http://localhost:3000')
    });
})

app.listen(port,()=>{
    console.log(`✔ Sucessfully! Running at port : ${port}`);
})