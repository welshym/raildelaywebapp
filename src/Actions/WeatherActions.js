import AppDispatcher from '../AppDispatcher';
import WeatherConstants from '../Constants/DelaysConstants';
import WeatherApi from '../APIs/WeatherApi';

// Define action methods
let WeatherActions = {

  // Receive weather data
  receiveWeather(city) {
    WeatherApi.getWeatherData(city).then((data) => {
      AppDispatcher.handleAction({
        actionType: WeatherConstants.WEATHER_RECEIVE_DATA,
        data
      });
    });
  }
};

export default WeatherActions;
