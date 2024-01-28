import React, { useState, useEffect } from 'react';

function App() {
  const apiKey = '8a13df165f9099bdd3008e66764b2a56';
  const [weather, setWeather] = useState('');
  const [result, setResult] = useState(null);

  // Load weather from localStorage on initial render
  useEffect(() => {
    const savedWeather = localStorage.getItem('weather');
    if (savedWeather) {
      setWeather(savedWeather);
    }
  }, []);

  const getApiData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather},pakistan&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setResult(data.main); // Assuming main object contains weather information
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        // Handle errors here
      });
  };

  const userInput = (e) => {
    const input = e.target.value;
    setWeather(input);
    localStorage.setItem('weather', input); // Save input to localStorage
  };

  return (
    <div className='Main'>
      <div className="Weather">
        <h2>Weather App</h2>
        <input value={weather} onChange={userInput} type="text" placeholder='Search here' />
        <br />
        <button onClick={getApiData}>Search</button>
      </div>

      <div className='Detail'>
        {result && (
          <div className='Result'>
            <h2>Current Temperature: {result.temp}</h2>
            {/* <h2>Humidity: {result.humidity}</h2> */}
            <h2>Pressure: {result.pressure}</h2>
            <h2>Temperature Minimum: {result.temp_min}</h2>
            <h2>Temperature Maximum: {result.temp_max}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
