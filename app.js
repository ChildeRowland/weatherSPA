angular.module('weatherApp', ['ngRoute', 'ngResource'])

// FACTORIES
.factory('WeatherAppEngineDTO', ['$routeParams', '$location', 'cityService', function ($routeParams, $location, cityService) {
	function WeatherEngine () {
		this.city = cityService.city;
		this.days = $routeParams.days || '2';
	
		this.updateCity = function (inputCity) {
			cityService.city = inputCity;
			$location.path('/forecast');
		}

		this.convertToFahrenheit = function (degreesKelvin) {
			return Math.round((1.8 * (degreesKelvin - 273)) + 32);
		}

		this.convertToDate = function (rawDt) {
			return new Date(rawDt * 1000);
		}
	}

	return WeatherEngine;
}])

// CONTROLLERS 
.controller('MainCtrl', ['WeatherAppEngineDTO', function (WeatherAppEngineDTO) {
	var self = this;
	self.we = new WeatherAppEngineDTO();
}])

.controller('ForecastCtrl', ['weatherService', 'WeatherAppEngineDTO', function (weatherService, WeatherAppEngineDTO) {
	var self = this;
 	self.we = new WeatherAppEngineDTO();
	self.weatherResult = weatherService.getWeather(self.we.city, self.we.days);
}]);



