class WeatherClass{
    constructor(_title , _state_abbr , _state_name ,_max ,_min , _windSpeed , _humidity , _visibility 
                ,_prassure ,_confidence ,_date){
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
        this.applicable_date = titleOfDay(_date );
    }

    //build weather div and add to html
    addToHtml(){
        let body = document.getElementById("bodyId");
        let firstDiv = document.getElementById("firstDiv");
        let firstChild = firstDiv.getElementsByTagName('div')[0];
        let title = document.getElementById("titleCity");
        let newDiv = document.createElement("div");
        let dayTitle = document.createElement("h3");
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

        body.className = 'containerColumn'
        firstDiv.className = 'containerRow'
        title.innerHTML = `${this.title}`
        dayTitle.innerHTML = `${this.applicable_date}`
        dayTitle.className = 'colors'
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

         firstDiv.appendChild(newDiv , firstChild);
        newDiv.append(dayTitle, weatherImg ,maxDd ,minDd ,windSpeedDd ,
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

//send url and get weather respons
function getWeather(woeid){
fetch(`https://www.metaweather.com/api/location/${woeid}/`)
  .then(response => response.json())
  .then(data => 
    { 
        const today= data.consolidated_weather;
      
       console.log(data)
         today.map((item) => {
            let weather = new WeatherClass (data.title, item.weather_state_abbr , item.weather_state_name 
                ,item.max_temp ,item.min_temp ,item.wind_speed ,item.humidity ,item.visibility 
                ,item.air_pressure ,item.predictability ,item.applicable_date ) 
            weather.addToHtml();
        });

        let time = formatAmPm(data.time);
        let sun_rise = formatAmPm(data.sun_rise); 
        let sun_set  = formatAmPm(data.sun_set); 

        addTimeBox( time ,sun_rise ,sun_set);

    })
  .catch(error => console.log(error)) ;
}
//add time box to the page
function addTimeBox(time ,sun_rise ,sun_set){
    contrySelectElem = document.getElementById("contryList");
    let selectDiv = document.getElementById("selectDiv");
    let timeDiv = document.createElement("div");
    let timeDd = document.createElement("dd");
    let sunRiseDd = document.createElement("dd");
    let sunSetDd = document.createElement("dd");
    
    contrySelectElem.className = 'itemSelect'
    timeDiv.className = 'containerColumn'
    timeDd.innerHTML = `Time : ${time}`
    sunRiseDd.innerHTML = `Sunrise : ${sun_rise}`
    sunSetDd.innerHTML = `Sumset : ${sun_set}`
    timeDd.className = 'itemRight'
    sunRiseDd.className = 'itemRight'
    sunSetDd.className = 'itemRight'

    selectDiv.after(timeDiv);
    timeDiv.append(timeDd, sunRiseDd ,sunSetDd);


}
//get time 24 format, return time ampm format
function formatAmPm(data){
    let hour = (data.substring(data.indexOf('T')+1).substring(0,2))
    let minuts = (data.substring(data.indexOf('T')+1).substring(2,5))
    let ampm = hour >= 12 ? "pm" : "am";
    hour %= 12;
    hour = hour || 12;
    return `${hour}${minuts}  ${ampm}`;
}
//get date , return title of day
function titleOfDay(date ){
const options = { weekday: 'short', month: 'short', day: 'numeric' };
let day = new Date(date);
let today = new Date();

    if (day.toDateString() === today.toDateString()){
        return 'Today';}
    else
    {
        today.setDate(today.getDate()+1);
        if (day.toDateString() === today.toDateString()){
            return 'Tomorrow'; }
        else
           return day.toLocaleString('en-En', options) ;
    }
}

