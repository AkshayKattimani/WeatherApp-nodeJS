
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});
app.post("/", function(req, res){
    console.log();

    const cityName = req.body.cityName;
    const apikey = "[Paste your weather apikey here]";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ apikey + "&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconImg = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>Weather is currently "+ des +"</p>");
            res.write("<h1>Weather in "+cityName+" is "+temp+" degree celsius.</h1>");
            res.write("<img src="+ iconImg +">");
            res.send()

        })
    })
});




app.listen(3000, function(){
    console.log("server up and running")
})
