class WeatherClass{
    constructor(_title , _state_abbr , _state_name ,_max ,_min , _windSpeed , _humidity , _visibility ,_prassure ,_confidence){
        this.title= _title;
        this.weather_state_abbr = `https://www.metaweather.com/static/img/weather/64/${_state_abbr}.png`;
        this.weather_state_name = _state_name;
        this.max_temp = Math.ceil(_max);
        this.min_temp = Math.ceil(_min);
        this.wind_speed = Math.ceil(_windSpeed);
        this.humidity = Math.ceil(_humidity);
        this.visibility = _visibility.toFixed(1);
        this.air_pressure = _prassure;
        this.predictability = Math.ceil(_confidence);

    }

    //build weather div and add to html
    addToHtml(){
        
        let firstDiv = document.getElementById("firstDiv");
        let firstChild = firstDiv.getElementsByTagName('div')[0];
        let title = document.getElementById("titleCity");
        let newDiv = document.createElement("div");
        let weatherImg = document.createElement("img");
        let maxDd = document.createElement("dd");
        let minDd = document.createElement("dd");
        let windSpeedDd = document.createElement("dt");
        let humidityDt = document.createElement("dt");
        let humidityDd = document.createElement("dd");
        let visibilityDt = document.createElement("dt");
        let visibilityDd = document.createElement("dd");
        let prassureDt = document.createElement("dt");  
        let prassureDd = document.createElement("dd");
        let confidenceDt = document.createElement("dt");
        let confidenceDd = document.createElement("dd");

        title.innerHTML = `${this.title}`
        newDiv.className = 'box'
        weatherImg.src = `${this.weather_state_abbr}`
        weatherImg.crossOrigin = `${this.weather_state_name}` 
        maxDd.innerHTML = `Max: ${this.max_temp}\xB0C`
        minDd.innerHTML = `Min: ${this.min_temp}\xB0C`
        windSpeedDd.innerHTML = `</br> ${this.wind_speed} mph`
        humidityDt.innerHTML = 'Humidity' 
        humidityDd.innerHTML =`${this.humidity}%`
        visibilityDt.innerHTML = 'Visibility'
        visibilityDd.innerHTML = `${this.visibility} miles`
        prassureDt.innerHTML = 'Prassure'
        prassureDd.innerHTML = `${this.air_pressure}mb`
        confidenceDt.innerHTML = 'Confidence'
        confidenceDd.innerHTML = `${this.predictability}%`

         firstDiv.replaceChild(newDiv , firstChild);
        newDiv.append(weatherImg ,maxDd ,minDd ,windSpeedDd ,
            humidityDt ,humidityDd , visibilityDt,visibilityDd ,
            prassureDt ,prassureDd ,confidenceDt ,confidenceDd);

    }
}

//onload function
window.onload = function(){

const contrySelectElem = document.getElementById("contryList");
//add event onchenge 
contrySelectElem.addEventListener('change',function(){
   // console.log(contrySelectElem.value);
     getWeather(contrySelectElem.value); 
})
//defult choice
getWeather(2459115);
}

//send url and get weather of today respons
function getWeather(woeid){

fetch(`https://www.metaweather.com/api/location/${woeid}/`)
  .then(response => response.json())
  .then(data => 
    { 
        const today= data.consolidated_weather.find(item => item !== undefined);
        //console.log(today);

        let weather = new WeatherClass (data.title, today.weather_state_abbr , today.weather_state_name 
            ,today.max_temp ,today.min_temp ,today.wind_speed ,today.humidity ,today.visibility 
            ,today.air_pressure ,today.predictability) 
        weather.addToHtml();

    })
  .catch(error => console.log(error)) ;
}


