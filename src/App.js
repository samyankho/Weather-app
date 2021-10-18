import React, {useState} from 'react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState([{}])
  const [cityList, setCityList] = useState([])
  const [city, setCity] = useState("")
  const [showCityList, setShowCityList] = useState(false)
  const [showWeather, setShowWeather] = useState(false)

  const getCity = () => {
    fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(
      response => response.json()
    ).then(data => {
      setCityList(data)
      setShowCityList(true)
    })
    
  }

  const getWeather = (id, city) => {
    console.log(id)
    setCity(city)
    setShowWeather(true)
    fetch(`https://www.metaweather.com/api/location/${id}`)
      .then(
        response => response.json()
      ).then(data => {
        setShowCityList(false)
        setWeatherData(data.consolidated_weather)
      })
  }

  const getWeatherList = ()=>{
    return (
      <div>
        <div> {city} </div>
        
        {weatherData.map(data => (
          <div className="weatherContainer">
            <div>{data.applicable_date}</div>
            <div>Current temperature: {data.the_temp}</div>
            <div>Maximum temperature: {data.max_temp}</div>
            <div>Minimum temperature: {data.min_temp}</div>
            <div>Humidity: {data.humidity}</div>
          </div>
        )
        )}
      </div>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <input 
        className="input" 
        placeholder="Enter City"
        onChange={e => setCity(e.target.value)}
        value={city}/>

        <button onClick={()=>getCity()}>Search</button>
      </div>

      {showCityList? 
        <div>
          {cityList.map(data => (<div key={data.woeid.toString()} className="title" onClick={e=>getWeather(data.woeid, data.title)}>{data.title}</div>))}
        </div> : ''}

      { showWeather ? getWeatherList() : ''}

    </div>
  )
}

export default App
