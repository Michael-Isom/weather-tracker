import fs from "node:fs/promises";
// TODO: Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() {
        return await fs.readFile('../db/searchHistory.json', {
            flag: 'a+',
            encoding: 'utf-8',
        });
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        return await fs.writeFile('../../db/searchHistory.json', JSON.stringify(cities, null, '\t'));
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        return await this.read().then((cities) => {
            let parsedCity;
            // if cities is not an array then send back and empty array in parsedCity
            try {
                parsedCity = [].concat(JSON.parse(cities));
            }
            catch (err) {
                parsedCity = [];
            }
            return parsedCity;
        });
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(id, name) {
        //check to see if city is empty
        if (!id || !name) {
            throw new Error("City cannot be empty!!");
        }
        //define a new city
        const newCity = {
            id: id,
            name: name,
        };
        return await this.getCities()
            //return the new city appended to the end of the array
            .then((cities) => {
            return [...cities, newCity];
        })
            .then((updatedCities) => this.write(updatedCities))
            .then(() => newCity);
    }
}
export default new HistoryService();
