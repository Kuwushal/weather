const locationInput = document.getElementById('locationInput')
const searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', () => {
    // debugger
    const location = locationInput.value 
    if(location == ""||location==null||location==undefined)
    {
        document.querySelector('.invalid').style.display = "block"
        return false
    }
   else{
    getWeather(location)
    document.querySelector('.invalid').style.display = "none"

   } 
})

locationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const location = locationInput.value 
        if(location == ""||location==null||location==undefined)
            {
                document.querySelector('.invalid').style.display = "block"
                return false
            }
           else{
            getWeather(location)
            document.querySelector('.invalid').style.display = "none"
           } 
        }
});


async function getWeather(location){
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=17f9d003b7fa849c19f6e8e42c304fef`

try{
    const response = await fetch(url)
    const data = await response.json()
    console.log('data',data)
    console.log('response',response)
    if(response.ok && response.status ==200){
        document.querySelector('.invalid').style.display = "none"
        document.querySelector('.wrong').style.display = "none"
    


            document.querySelector('h1.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`
            document.querySelector('h2.city').innerHTML = `${data.name}`
            document.querySelector('h4.description').innerHTML = `${(data.weather[0].description).toUpperCase()}`
            document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`
            document.querySelector('.wind').innerHTML = `${data.wind.speed}m/s`
    
            let sunrise = new Date((data.sys.sunrise + data.timezone)*1000).toUTCString().split(" ")[4]
            let newSunrise = sunrise.split(":")
            document.querySelector('.sunrise').innerHTML = `${newSunrise[0]}:${newSunrise[1]} AM`
            
            let sunset = new Date((data.sys.sunset + data.timezone)*1000).toUTCString().split(" ")[4]
            let newSunset = sunset.split(":")
            document.querySelector('.sunset').innerHTML = `${newSunset[0]}:${newSunset[1]} PM`

            const imageIcon = data.weather[0].icon
            const imageURL = `https://openweathermap.org/img/wn/${imageIcon}@4x.png`
            document.getElementById('weatherImage').src = imageURL
    }
            else{
            document.querySelector('.invalid').style.display = "block"
            }
        }catch(error){
    
 document.querySelector('.wrong').style.display = "block"
 document.querySelector('.wrong').innerHTML = error.message
}

finally{

}
}


