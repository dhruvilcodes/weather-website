const path =require('path')
const express = require('express');
const app= express(); 
const hbs=require('hbs')

const request= require('postman-request');
const geocode= require('./utils/geocode.js');
const forecast= require('./utils/forecast.js');


//Define Paths for Express config
const publicDirPath=path.join(__dirname,'../public');

const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views lovation
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static Directory to Serve
app.use(express.static(publicDirPath));
 

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: "Dhruvil Shah"
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name : "Dhruvil Shah"
    });
})


app.get('/help',(req,res)=>{
    res.render('help',{
    title :"Help",
       help : "This is some helpful text",
       name : "Dhruvil Shah"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
             error:"You must provide an address"
         })
      }
      geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    
        if(error)
        {
            return res.send({error});
        }
        forecast(latitude,longitude,(err,forecastData)=>{
            if(err)
            {
                return res.send({
                    error:err
                });
            }
            res.send({
                location : forecastData.location,
                region : forecastData.region,
                country : forecastData.country,
                temperature: forecastData.temperature,
                feelslike : forecastData.feelslike,
                day: forecastData.day,
                localtime: forecastData.localtime
                


            })

        })

      })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return res.send({
           error:"You must provide a search Term"
       })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})      





app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage : "Help Article Not Found" ,
        title: "404",
        name: "Dhruvil Shah"
    
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage : "Page Not Found" ,
        title: "404",
        name: "Dhruvil Shah"

    })
})
app.listen(1234,(err,data)=>{
    console.log('Server is up on port 1234');
});