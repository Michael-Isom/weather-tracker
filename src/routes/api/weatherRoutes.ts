import axios from 'axios';
import { Router } from 'express';
import { url } from 'inspector';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.use('/weather', async (req: { body: { city: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string; }): void; new(): any; }; }; send: (arg0: { city: any; temperature: any; description: any; }) => void; }) => {
  const cityName = req.body.city;

  if (!cityName) {
      return res.status(400).send({ error: 'City name is required' });
  }

  try {
      const apiKey = '9030aafbbbaf5af39b3899df609fa703'; 
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
      const weatherData = response.data;

    const searchHistory = []; // Declare and initialize searchHistory variable

    searchHistory.push({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      date: new Date().toISOString(),
    });
    
    res.send({
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
    });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to retrieve weather data' });
  }
});

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(`It's ${data.main.temp} degrees in ${data.name}!`);
    })
    .catch(error => {
        console.error(`Error fetching weather data: ${error}`);
    });
  // TODO: GET weather data from city name
  // TODO: save city to search history


// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
