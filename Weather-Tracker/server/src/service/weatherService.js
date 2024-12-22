import dotenv from 'dotenv';
dotenv.config();
class Weather {
    constructor(city, date, icon, iconDescription, tempF, windSpeed, humidity) {
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.tempF = tempF;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
    }
}
class WeatherService {
    constructor(city_name) {
        this.baseUrl = process.env.API_BASE_URL || "";
        this.API_key = process.env.API_KEY || "";
        this.city_name = city_name || "";
    }
    async fetchLocationData(query) {
        try {
            const response = await fetch(query);
            // Parse data then send it to be destructured
            const locationData = await response.json();
            return locationData;
        }
        catch (err) {
            console.log('ERROR:', err);
            return err;
        }
    }
    destructureLocationData(locationData) {
        // Create object using the Coordinates Interface
        const locationObj = {
            lat: locationData.lat.toString(),
            lon: locationData.lon.toString(),
        };
        return locationObj;
    }
    buildGeocodeQuery() {
        return `${this.baseUrl}/geo/1.0/direct?q=${this.city_name}&appid=${this.API_key}`;
    }
    buildWeatherQuery(coordinates) {
        return `api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_key}`;
    }
    async fetchAndDestructureLocationData() {
        // Fetch the location data
        const newLocationData = await this.fetchLocationData(this.buildGeocodeQuery());
        // Send new data off to be destructured
        return this.destructureLocationData(newLocationData);
    }
    async fetchWeatherData(coordinates) {
        try {
            // Send coordinates to be inserted into the weather Query
            const location = this.buildWeatherQuery(coordinates);
            const response = await fetch(location);
            // Parse the weather data
            return await response.json();
        }
        catch (err) {
            console.log('ERROR:', err);
            return err;
        }
    }
    buildForecastArray(weatherData) {
        // Map out the weather array
        return weatherData.map((weather) => {
            return new Weather(weather.city.name, weather.dt_text, weather.weather.icon, weather.weather.description, weather.main.temp, weather.wind.speed, weather.main.humidity);
        });
    }
    async getWeatherForCity(city) {
        this.city_name = city;
        const destructuredData = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(destructuredData);
        return this.buildForecastArray(weatherData.list); // Assume `list` holds forecast data
    }
}
export default new WeatherService();
