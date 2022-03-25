const apyKey = '03538929a21e536596dae923444a72bd'
const latitude = 43.238949
const longitude = 76.889709
const language = 'ru'
const unit = 'metric'
const base_url = 'https://api.openweathermap.org/data/2.5/onecall'

let makeRequest = async function(url) {
    try {
        return await $.ajax({method: 'GET', url: url});
    } catch(error) {
        console.log(error)
    }
}
async function getResponse() {
    let url = `${base_url}?lat=${latitude}&lon=${longitude}&units=${unit}&lang=${language}&&exclude=hourly,minutely,alerts&appid=${apyKey}`;
    try {
        return await makeRequest(url)
    }
    catch (error) {
        console.log(error);
    }
}
function makeDailyContent(htmlElementsArray, dailyItemsArray) {
    let tabs = $('#myTab > * > *').slice(1)
    for (let i = 0; i < htmlElementsArray.length; i++) {
        let temp = $('<p>').text(`Температура: ${dailyItemsArray[i].temp['day']}, ℃`)
        let humidity = $('<p>').text(`Влажность: ${dailyItemsArray[i].humidity}, %`)
        let windSpeed = $('<p>').text(`Скорость ветра: ${dailyItemsArray[i].wind_speed}, м/с`)
        let desc = $('<p>').text(`Описание: ${dailyItemsArray[i].weather[0].description}`)
        let date = new Date(dailyItemsArray[i].dt * 1000)
        let localDate = new Intl.DateTimeFormat('ru-RU', {weekday: 'long', month: '2-digit', day: "2-digit"}).format(date)
        $(`#${tabs[i].id}`).text(`${localDate}`)
        $(`#${htmlElementsArray[i].id}`).append(temp, humidity, windSpeed, desc)
    }
}
async function buildPage(){
    let response = await getResponse()
    let currentTemp = $('<p>').text(`Температура: ${response.current.temp}, ℃`)
    let currentHumidity = $('<p>').text(`Влажность: ${response.current.humidity}, %`)
    let currentWindSpeed = $('<p>').text(`Скорость ветра: ${response.current.wind_speed}, м/с`)
    let currentDesc = $('<p>').text(`Описание: ${response.current.weather[0].description}`)
    $('#current').append(currentTemp, currentHumidity, currentWindSpeed, currentDesc)
    let elements = $('#myTabContent > *').slice(1)
    let dailyItems = response.daily.slice(1)
    makeDailyContent(elements, dailyItems)
}

window.addEventListener('load', buildPage);
