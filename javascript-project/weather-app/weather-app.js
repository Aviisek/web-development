class Weather{
    constructor(city, state) {
        this.apiKey = "2be181c524887983";
        this.city = city;
        this.state = state;
    }

    //fetch weather from api
    async getWeather() {

        const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json
        `);

        const responseData = await response.json();

        return responseData.current_observation;
    }

    changeLocation(city, state){
        this.city = city;
        this.state = state;
    }
}