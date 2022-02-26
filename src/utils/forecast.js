const request = require('request');
const forecast = (latitude, longitute, callback) => {
  
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY_WEATHER}&query=${latitude},${longitute}&units=m`;
    // console.log(url);
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to location services ', undefined);
        }
        else if (body.error) {
            callback('Unable to find location,Try another search', undefined);
        }
        else {
            callback(undefined, {
                 location: body.location.name,
                 region: body.location.region,
                 country: body.location.country,
                 localtime: body.location.localtime,
                 temperature : body.current.temperature,
                 feelslike :  body.current.feelslike,
                 day :body.current.is_day
            });
        }

    })
}
module.exports = forecast;