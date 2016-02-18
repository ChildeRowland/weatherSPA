angular.module('weatherApp')


// ROUTES
.config(function ($routeProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'view/home.html',
		controller: 'MainCtrl',
		controllerAs: 'ctrl'
	})

	.when('/forecast', {
		templateUrl: 'view/forecast.html',
		controller: 'ForecastCtrl',
		controllerAs: 'ctrl'
	})

	.when('/forecast/:days', {
		templateUrl: 'view/forecast.html',
		controller: 'ForecastCtrl',
		controllerAs: 'ctrl'
	})

	.otherwise({redirectTo: '/'});
})


// SERVICES
.service('cityService', function () {
	this.city = "New York, NY";
})

.service('weatherService', ['$resource', function ($resource) {
	this.getWeather = function (city, days) {
		self.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=9b39c61074b3cd625d6f9ccaaaebb9c5', {
 		callback: "JSON_CALLBACK" }, 
 		{ get: { method: "JSONP" }}
 	);

	return self.weatherAPI.get({ q: city, cnt: days });
	}
}])


// DIRECTIVES
.directive("cmWeatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'view/weather-report.html',
       replace: true,
       scope: false
   }
});




