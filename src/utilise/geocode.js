const request = require('request')
const geocode = (place,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) +'.json?access_token=pk.eyJ1IjoicmVhbGtpcmEiLCJhIjoiY2s5OWo2cGdqMDAwbTNxbXdkMHllZmFvaiJ9.VPzSp2q34KcaTJcVvLaR8g&limit=1'
    request({url : url ,json: true},function(error,response){
        if(error){
            callback("No internet Service",undefined)
        }
        else if(response.body.features.length===0){
            callback("No such place Exists",undefined)
        }
        else{
          const data={
              latitude: response.body.features[0].center[0],
              longitude :response.body.features[0].center[1],
              location:  response.body.features[0].place_name
          }
          callback(undefined,data)}
        })}
module.exports = geocode

