import React, { useState, useEffect } from 'react'
import './CurrentWeather.css'

const CurrentWeather = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('kurukshetra')

    const weatherInfo = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a43e99f22d5e8ca631dac15ca12a548d`
        const res = await fetch(url);
        const content = await res.json();
        setData(content);
    }

    useEffect(() => {
        weatherInfo();
    }, []);


    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={weatherInfo}
                    placeholder='Enter Location'
                    type="text" />
                <button
                    className="searchButton"
                    type="button"
                    onClick={weatherInfo}>
                    Search
                </button>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <h2>{data.name},{data.sys ? <span>{data.sys.country}</span> : null}</h2>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp}°C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <h2>{data.weather[0].main}</h2> : null}
                    </div>
                </div>

                {data.name !== undefined &&
                    <div className="bottom">
                        <div className="minmax">
                            {data.main ? <p className='bold'>{data.main.temp_min}°C</p> : null}
                            <p>Min temp</p>
                            {data.main ? <p className='bold'>{data.main.temp_max}°C</p> : null}
                            <p>Max temp</p>
                        </div>
                       
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                            {data.main ? <p className='bold'>{data.main.pressure}atm</p> : null}
                            <p>Pressure</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default CurrentWeather;