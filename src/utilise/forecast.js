const request = require('request')
const forecast = function(latitude,longitude,callback){
const url ="http://api.weatherstack.com/current?access_key=4586829e8837d0de6630c33223fa709e&query="+longitude+","+latitude+"&units=m"
request({url : url, json:true},function(error,response){
        //console.log(response.body.location)
        if(error){
            callback("No internet Service",undefined)
        }
        else if(response.body.error){
            callback("No Such place Exists",undefined)
        }
        else{
        const bodyObject = response.body.current
        const data = "the temp is "+bodyObject.temperature+" but it feels like "+ bodyObject.feelslike+ " "+ bodyObject.weather_descriptions[0]
        callback(undefined,data)
    }
})}
module.exports = forecast
