'use strict';
/*********************************************** Controllers ***********************************************************************/
var app = angular.module('APP.controllers', ['ngTable']);

/****************************** Controller Planning *************************************************************** */
app.controller('rfcController', ['$route', '$location', '$http', '$scope', '$rootScope', '$filter', 'filterFilter', '$q', 'ngTableParams', '$modal', '$log',
    function($route, $location, $http, $scope, $rootScope, $filter, filterFilter, $q, ngTableParams, $modal, $log) {

        var modalScope = null;
        var modalInstance;

        $scope.delete = function() {
            for (var i = 0; i < $scope.data.length; i++) {
                if ($scope.data[i].checked == true) {
                    console.log("checked");
                    $scope.data.splice(i, 1);
                    i--;


                }
            }
            $scope.tableParams.reload();
            modalInstance.dismiss('cancel');
        };



        $scope.cancel = function() {

            modalInstance.dismiss('cancel');
        };


        $scope.refresh = function() {
            $scope.filter_dict = {};
        };
        $scope.open = function(size) {

            modalScope = $scope.$new();

            modalInstance = $modal.open({
                template: '<confirm-rfc-delete></confirm-rfc-delete>',
                size: size,
                scope: modalScope
            });
        };
        /************** Update ***************/

        $scope.update = function() {
            for (var i = 0; i < $scope.data.length; i++) {
                if ($scope.data[i].checked == true) {
                    $scope.data[i].checked = false;
                }
            }
        };
        /** ce bloc est pour l'objectif de g�rer le focus pour les champs editable dans ng-table* */

        $scope.flagColumn = null;
        $scope.flagRow = null;

        $scope.isCurrentSelected = function(index, parentIndex) {
            if ($scope.flagColumn == index && $scope.flagRow == parentIndex) {
                return true;
            }

            return false;
        };

        $scope.deselectAll = function() {
            $scope.flagColumn = null;
            $scope.flagRow = null;
        };

        $scope.selectCurrent = function(index, parentIndex) {
            $scope.flagColumn = index;
            $scope.flagRow = parentIndex;
        };

        /** fin du bloc**/
        /**/


        $scope.columns = [ // Correspond, a la partie gauche du tableau
            {
                title: 'Indentifiant RFC ',
                field: 'idf_rfc',
                visible: true,
                filter: {
                    'id': 'text'
                },
                editable: false,
                type: 'text'
            }, {
                title: 'Nom Rfc',
                field: 'name_rfc',
                visible: true,
                filter: {
                    'nom': 'text'
                },
                editable: true,
                type: 'text'
            }, {
                title: 'date début',
                field: 'd_debut_rfc',
                visible: true,
                filter: {
                    'prenom': 'text'
                },
                editable: true,
                type: 'text'
            }, {
                title: 'date fin',
                field: 'd_fin_rfc',
                visible: true,
                filter: {
                    'type': 'text'
                },
                editable: true,
                type: 'text'
            }, {
                title: 'domaine applicatif porteur',
                field: 'appl_dom_rfc',
                visible: true,
                filter: {
                    'profession': 'text'
                },
                editable: true,
                type: 'select'
            }, {
                title: 'Flag RFC transverse',
                field: 'ind_multi_dom_rfc',
                visible: true,
                filter: {
                    'type': 'boolean'
                },
                editable: true,
                type: 'checkbox'
            }, {
                title: 'type de  Rfc (initial)',
                field: 'typ_rfc',
                visible: true,
                filter: {
                    'profession': 'text'
                },
                editable: true,
                type: 'select'
            },
        ];

        $scope.data = [];
        for (var i = 0; i < 40; i++) {
            $scope.data[i] = {};
            $scope.data[i].idf_rfc = "ID" + i;
            $scope.data[i].name_rfc = "RFC " + i;
            $scope.data[i].d_debut_rfc = "01/01/2015";
            $scope.data[i].d_fin_rfc = "01/01/2015";
            $scope.data[i].appl_dom_rfc = "FLT";
            $scope.data[i].ind_multi_dom_rfc = true;
            $scope.data[i].typ_rfc = "QW";
            $scope.data[i].checked = false;



        }

        $scope.list = {};
        $scope.list.appl_dom_rfc = ["FLT", "BIL", "RES", "ROP", "S&M"];
        $scope.list.ind_multi_dom_rfc = ["Y", "N"];
        $scope.list.typ_rfc = ["QW", "PJ", "UO"]
        $scope.addItem = function() {

            /* var elem = {};
             elem.id = '*';
             elem.nom = "";
             elem.prenom = "";
             elem.type = "";
             elem.profession = "";
             elem.checked = true;
             $scope.data.push(elem);
             $scope.tableParams.reload();*/


        };


        var orderedData = [];
        if (!$scope.filter_dict) {

            $scope.filter_dict = {};
        }
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 15, // count per page
            filter: {
                filter_dict: '{}',
            },
            sorting: {
                id: 'asc', // initial sorting
            }
        }, {
            counts: [15, 30, 50, 100],
            total: $scope.data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var filteredData = $scope.filter_dict ?
                    $filter('filter')($scope.data, $scope.filter_dict) :
                    $scope.data;

                orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    filteredData;
                params.total(orderedData.length); // set total for recalc pagination
                /**Function Edition en Masse*/
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
            $scope: $scope
        });


        $scope.$watch("filter_dict", function() {
            if ($scope.filter_dict && $scope.tableParams) {
                $scope.tableParams.reload();
            }
        }, true);

        /*  $scope.goToAutre = function () {
              $location.path('/transport/autre');
          };*/

        $scope.deleteRfc = function() {
            /* for(var i=0;i<$scope.data.length;i++){

            }*/
        };



    }
]);

/****************************** Controller Header *************************************************************** */
app.controller('headerController', ['$scope',
    function($scope) {

    }
]);
/****************************** Controller Footer *************************************************************** */
app.controller('footerController', ['$scope',
    function($scope) {

    }
]);

/****************************** Controller NextPRev *************************************************************** */
app.controller('prevNextController', ['$scope',
    function($scope) {

    }
]);

/****************************** Controller NextPRev *************************************************************** */
app.controller('menuController', ['$scope',
    function($scope) {

    }
]);
