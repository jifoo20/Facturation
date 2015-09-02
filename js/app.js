'use strict';

/**
 * Declarer l'objet principale de l'application qui permet de charger tout les autres modules
 */
var app = angular.module('APP', ['ngRoute','ui.bootstrap','APP.services','APP.directives','APP.controllers']);
/*
app.config(['$routeProvider',
	        function($routeProvider) {

			$routeProvider.when('/index', {controller: 'emma_planningController'});

			}]);*/

