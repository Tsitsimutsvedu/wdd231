const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const city = 'YourCity'; // Replace with your city
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-data');
    const current = data.list[0];
    weatherDiv.innerHTML = `
        <p>Current Temperature: ${current.main.temp}°C</p>
        <p>Weather: ${current.weather[0].description}</p>
        <p>3-Day Forecast:</p>
        <ul>
            <li>Day 1: ${data.list[8].main.temp}°C</li>
            <li>Day 2: ${data.list[16].main.temp}°C</li>
            <li>Day 3: ${data.list[24].main.temp}°C</li>
        </ul>
    `;
}

fetchWeather();