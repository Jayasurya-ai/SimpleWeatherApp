const express = require("express") //importing express framework

const app = express() //initializing express

const bodyParser = require("body-parser") //importing bosyparser to read the post request data


const https = require("https");

app.use(bodyParser.urlencoded({ extended: true })) //using the imported body-parser to read through a html doc using urlencoded



//using get request sending index.html fime to localhost port 4000


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})


//posting input given by user to the server and retriving the response from the other server using api and https 
app.post("/", function (req, res) {
    // console.log("Post request recieved");
    const cityName = req.body.cityName;
    const apikey = "ebbbcf773e1882ed3525b1795ec7fe88";
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey;



    https.get(url, function (response) {
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;



            res.write("<h1>The temprature at "+cityName+" is "+ temp +"</h1>");

            res.send();

            


        })
        

       
        
    })





})


//runing a server on port 4000 using node framework express


app.listen(4000, function () {
    console.log("Server started running on local host port 4000");
})
