import { config } from 'dotenv';
config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Example usage:
const location: Coordinates = {
  latitude: 40.7128,
  longitude: -74.0060
};

function displayCoordinates(coords: Coordinates): void {
  console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
}

displayCoordinates(location);

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
  city: string;

  constructor(
    temperature: number,
    humidity: number,
    description: string,
    windSpeed: number,
    city: string
  ) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.description = description;
    this.windSpeed = windSpeed;
    this.city = city;
  }

// TODO: Complete the WeatherService class
class WeatherService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }


  // TODO: Define the baseURL, API key, and city name properties
  constructor(apiKey: string) {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
    this.apiKey = '9030aafbbbaf5af39b3899df609fa703';
    this.cityName = 'Salt lake city';

  // TODO: Create fetchLocationData method
  const location = await this.fetchLocationData(cityName);

    try {
      const response = await axios.get(this.baseURL, {
        params: {
          lat: location.lat,
          lon: location.lon,
          appid: this.apiKey,
          units: 'metric' 
        }
      });

  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<{ lat: number, lon: number }> {
    try {
      const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: query,
          appid: this.apiKey,
          limit: 1 
        }
      });
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    return { latitude, longitude };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    if (!this.cityName) {
      throw new Error('City name is not set');
    }
    return `${this.cityName}`;

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { latitude, longitude } = coordinates;
    return `lat=${latitude}&lon=${longitude}`;

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    return { latitude, longitude };
  }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const query = this.buildWeatherQuery(coordinates);


  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main.temp;
    const humidity = response.main.humidity;
    const description = response.weather[0].description;
    const windSpeed = response.wind.speed;
    const city = response.name;

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = [];

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather | Weather[]> {
    try {
      
      const coordinates = await this.fetchAndDestructureLocationData(city);

      
      const currentWeather = await this.fetchWeatherData(coordinates);


}

export default new WeatherService();
