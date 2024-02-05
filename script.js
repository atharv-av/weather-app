const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "bba053d08b11dc8a254d0a739f3d6d1a";
    const unit = "metric";
    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey, (response) => {
        console.log(response.statusCode);
    
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            // res.send();
            res.send(document.querySelector(".city").innerHTML = "<div><h2>Weather in" + query + "</h2><br> + temp + <br><img src=" + iconURL + " alt='Weather Condition'><br><p>Humidity: "+ humidity + "</p><br><p>Wind Speed: " + windSpeed + "</p></div>");
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});