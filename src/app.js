const express= require('express')
const app = express()
const path = require('path')

const hbs = require('hbs')
 
const port = process.env.PORT || 3000;
const geocode = require('./utilise/geocode.js')
const forecast = require('./utilise/forecast.js')

const staticData = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates')
const partialPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(staticData))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name : 'Sourav'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'THIS IS ABOUT PAGE',
        name : 'UZUZMYMW'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'THIS IS HELP PAGE ',
        name : 'HESOYAM'
    })
})
/*app.get('/weather',(req,res)=>{
   res.send({
       forecast: "sunny ",
       location: "london",
       address : "req.query.address"

   })

})*/


app.get('/weather',(req,res)=>{
 if(!req.query.address){
     return res.send({
         error : "You must provide an address"
     })
 }
 geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
     if(error){
         return res.send({error})
     }
     forecast(latitude,longitude,(error,forecastData)=>{
         if(error){
             return res.send({error})
         }
      res.send({
          forecast : forecastData,location,
          address : req.query.address
      })})})})


      app.get('*',(req,res)=>{
        res.render('404',{
            title:'404 Page Not Found',
            name:'Sourav Ghosh',
            errorMessage:'HELP NOT FOUND'
        })
    })
    

app.listen(port,()=>{
console.log('the app is listening on port 3000')
})
