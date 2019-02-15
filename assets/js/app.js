var pointsApp = angular.module('pointsApp', ['angucomplete-alt', 'ui.router', 'ngCookies']);


pointsApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================

        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController'

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('home', {
            url: '/home',
            templateUrl: 'com.html',
            controller: 'pointsController',
            resolve: {authenticate: authenticate}
        })

        .state('admin', {
            url: '/admin',
            templateUrl: 'admin.html',
            controller: 'adminController',
            resolve: {authenticate: adminAuthenticate}
        })

    function adminAuthenticate($q, $http, $state, $timeout, $cookies) {
        var uname = $cookies.get("uname")
        var password = $cookies.get("password")

        if (uname != null && password != null) {

            $http({
                method: 'POST',
                url: 'http://anuda.me:8080/pointsback/pointsapi/verify?uname=' + uname + '&password=' + password
            }).then(function successCallback(response) {
                if (response.data == 0) {
                    return $q.when()
                } else {
                    alert("Sorry, your account is not authorized to access the Admin portal");
                    $state.go('login')
                }

            }, function errorCallback(response) {
                alert("Fail");
                // The next bit of code is asynchronously tricky.

                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $state.go('login')
                });

                // Reject the authentication promise to prevent the state from loading
                return $q.reject()
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


        } else {
            $state.go('login')

        }
    }

    function authenticate($q, $http, $state, $timeout, $cookies) {
        var uname = $cookies.get("uname")
        var password = $cookies.get("password")

        if (uname != null && password != null) {

            $http({
                method: 'POST',
                url: 'http://anuda.me:8080/pointsback/pointsapi/verify?uname=' + uname + '&password=' + password
            }).then(function successCallback(response) {
                return $q.when()
            }, function errorCallback(response) {
                alert("Fail");
                // The next bit of code is asynchronously tricky.

                $timeout(function () {
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    $state.go('login')
                });

                // Reject the authentication promise to prevent the state from loading
                return $q.reject()
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


        } else {
            $state.go('login')

        }
    }

});


pointsApp.controller('loginController', function countryListController($scope, $http, $cookies, $state) {


    $scope.login = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/verify?uname=' + $scope.username + '&password=' + $scope.password
        }).then(function successCallback(response) {
            $scope.com = response.data;

            $cookies.put("com", $scope.com);
            $cookies.put("uname", $scope.username);
            $cookies.put("password", $scope.password);

            if ($scope.com == 0) {
                $state.go('admin')
            } else {
                $state.go('home')
            }


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Login Failed, Please try again");

        });
    }


});

pointsApp.controller('adminController', function ($scope, $http, $state, $cookies) {

    $scope.title = "";

    $scope.table = true;


    $scope.ga3 = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=1'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "General Assembly 3 Points Database";
            $scope.table = false;

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.ga4 = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=2'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "General Assembly 4 Points Database";
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.unadc = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=3'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "Historical General Assembly 1 Points Database";
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.icj = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=4'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "Presidential Cabinet Points Database";
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.fecosoc = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=5'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "Group of 20 Points Database";
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.fsc = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com=6'
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.title = "Security Council Points Database";
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    }

    $scope.logout = function () {

        $cookies.remove("com");
        $cookies.remove("uname");
        $cookies.remove("password")
        $state.go('login')


    }

});

pointsApp.controller('pointsController', function countryListController($scope, $http, $cookies, $state) {

    $scope.reg = /^[0-9]\\d*$/;


    var com = $cookies.get("com");
    $scope.title = "";
    console.log(com);


    switch (com) {

        case "1":
            $scope.title = "General Assembly 3";
            $scope.flags = [
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.gif'
                },
                {
                    name: 'BELARUS',
                    code: 'BELARUS.gif'
                },
                {
                    name: 'BHUTAN',
                    code: 'BHUTAN.gif'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.gif'
                },
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.gif'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.gif'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.gif'
                },
                {
                    name: 'ARMENIA',
                    code: 'ARMENIA.gif'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.gif'
                },
                {
                    name: 'CENTRAL AFRICAN REPUBLIC',
                    code: 'CENTRAL_AFRICAN_REPUBLIC.gif'
                },
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.gif'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.gif'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.gif'
                },
                {
                    name: 'USA',
                    code: 'USA.gif'
                },
                {
                    name: 'DRC',
                    code: 'DRC.gif'
                },
                {
                    name: 'ERITREA',
                    code: 'ERITREA.gif'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.gif'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.gif'
                },
                {
                    name: 'MONGOLIA',
                    code: 'MONGOLIA.gif'
                },
                {
                    name: 'TAJIKISTAN',
                    code: 'TAJIKISTAN.gif'
                },
                {
                    name: 'GREENLAND',
                    code: 'GREENLAND.gif'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.gif'
                },
                {
                    name: 'YEMEN',
                    code: 'YEMEN.gif'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.gif'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.gif'
                },
                {
                    name: 'GEORGIA',
                    code: 'GEORGIA.gif'
                },
                {
                    name: 'JAPAN',
                    code: 'JAPAN.gif'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.gif'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.gif'
                },
                {
                    name: 'ESTONIA',
                    code: 'ESTONIA.gif'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.gif'
                },
                {
                    name: 'MALI',
                    code: 'MALI.gif'
                },
                {
                    name: 'MEXICO',
                    code: 'MEXICO.gif'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.gif'
                },
                {
                    name: 'UK',
                    code: 'UK.gif'
                },
                {
                    name: 'UKRAINE',
                    code: 'UKRAINE.gif'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.gif'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.gif'
                },
                {
                    name: 'KYRGYZSTAN',
                    code: 'KYRGYZSTAN.gif'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.gif'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.gif'
                },
                {
                    name: 'UZBEKISTAN',
                    code: 'UZBEKISTAN.gif'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.gif'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.gif'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.gif'
                },
                {
                    name: 'NIGERIA',
                    code: 'NIGERIA.gif'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.gif'
                },
                {
                    name: 'PAKISTAN',
                    code: 'PAKISTAN.gif'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.gif'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.gif'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.gif'
                },
                {
                    name: 'AZERBAIJAN',
                    code: 'AZERBAIJAN.gif'
                },
                {
                    name: 'ETHIOPIA',
                    code: 'ETHIOPIA.gif'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.gif'
                },
                {
                    name: 'LATVIA',
                    code: 'LATVIA.gif'
                },
                {
                    name: 'LITHUANIA',
                    code: 'LITHUANIA.gif'
                },
                {
                    name: 'NORWAY',
                    code: 'NORWAY.gif'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.gif'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.gif'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.gif'
                },
                {
                    name: 'KAZAKHSTAN',
                    code: 'KAZAKHSTAN.gif'
                },
                {
                    name: 'HAITI',
                    code: 'HAITI.gif'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.gif'
                },
                {
                    name: 'KENYA',
                    code: 'KENYA.gif'
                },
                {
                    name: 'MOLDOVA',
                    code: 'MOLDOVA.gif'
                },
                {
                    name: 'QATAR',
                    code: 'QATAR.gif'
                },
                {
                    name: 'SUDAN',
                    code: 'SUDAN.gif'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.gif'
                },
                {
                    name: 'TURKMENISTAN',
                    code: 'TURKMENISTAN.gif'
                },
                {
                    name: 'UAE',
                    code: 'UAE.gif'
                }
            ];
            break;
        case "2":
            $scope.title = "General Assembly 4";
            $scope.flags = [
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.gif'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.gif'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.gif'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.gif'
                },
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.gif'
                },
                {
                    name: 'MONGOLIA',
                    code: 'MONGOLIA.gif'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.gif'
                },
                {
                    name: 'USA',
                    code: 'USA.gif'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.gif'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.gif'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.gif'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.gif'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.gif'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.gif'
                },
                {
                    name: 'MALI',
                    code: 'MALI.gif'
                },
                {
                    name: 'LITHUANIA',
                    code: 'LITHUANIA.gif'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.gif'
                },
                {
                    name: 'UZBEKISTAN',
                    code: 'UZBEKISTAN.gif'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.gif'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.gif'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.gif'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.gif'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.gif'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.gif'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.gif'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.gif'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.gif'
                },
                {
                    name: 'YEMEN',
                    code: 'YEMEN.gif'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.gif'
                },
                {
                    name: 'BELARUS',
                    code: 'BELARUS.gif'
                },
                {
                    name: 'KENYA',
                    code: 'KENYA.gif'
                },
                {
                    name: 'QATAR',
                    code: 'QATAR.gif'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.gif'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.gif'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.gif'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.gif'
                },
                {
                    name: 'UAE',
                    code: 'UAE.gif'
                },
                {
                    name: 'CAR',
                    code: 'CAR.gif'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.gif'
                },
                {
                    name: 'UK',
                    code: 'UK.gif'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.gif'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.gif'
                },
                {
                    name: 'DENMARK',
                    code: 'DENMARK.gif'
                },
                {
                    name: 'DRC',
                    code: 'DRC.gif'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.gif'
                },
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.gif'
                },
                {
                    name: 'ESTONIA',
                    code: 'ESTONIA.gif'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.gif'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.gif'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.gif'
                }
            ];
            break;
        case "3":
            $scope.title = "Historical General Asssembly 1";
            $scope.flags = [
                {
                    name: 'USA',
                    code: 'USA.gif'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.gif'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.gif'
                },
                {
                    name: 'MONGOLIA',
                    code: 'mongolia.gif'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.gif'
                },
                {
                    name: 'KIRGHIZ SSR',
                    code: 'Kirghis.png'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.gif'
                },
                {
                    name: 'ESTONIAN SSR',
                    code: 'estonian.png'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.gif'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.gif'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.gif'
                },
                {
                    name: 'MOLDAVIAN SSR',
                    code: 'MOLDAVIAN.png'
                },
                {
                    name: 'LITHUANIAN SSR',
                    code: 'LITHUANIAN.png'
                },
                {
                    name: 'UK',
                    code: 'UK.gif'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.gif'
                },
                {
                    name: 'AZERBAIJAN SSR',
                    code: 'AZERBAIJAN.svg'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.gif'
                },
                {
                    name: 'ERITREA',
                    code: 'ERITREA.png'
                },
                {
                    name: 'MALI',
                    code: 'MALI.gif'
                },
                {
                    name: 'ZAIRE',
                    code: 'DRC.gif'
                },
                {
                    name: 'UKRAINIAN SSR',
                    code: 'UKRAINIAN.png'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.gif'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.gif'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.gif'
                },
                {
                    name: 'MEXICO',
                    code: 'mexico.gif'
                },
                {
                    name: 'SUDAN',
                    code: 'sudan.gif'
                },
                {
                    name: 'CAR',
                    code: 'car.gif'
                },
                {
                    name: 'LATVIAN SSR',
                    code: 'latvian.png'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.gif'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.gif'
                },
                {
                    name: 'GEORGIAN SSR',
                    code: 'GEORGIAN.png'
                },
                {
                    name: 'JAPAN',
                    code: 'japan.gif'
                },
                {
                    name: 'BYELORUSSIAN SSR',
                    code: 'BYELORUSSIAN.png'
                },
                {
                    name: 'TURKMEN SSR',
                    code: 'turkmen.png'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.gif'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.gif'
                },
                {
                    name: 'UZBEK SSR',
                    code: 'uzbek.png'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.gif'
                },
                {
                    name: 'UAE',
                    code: 'UAE.gif'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.gif'
                },
                {
                    name: 'NIGERIA',
                    code: 'nigeria.gif'
                },
                {
                    name: 'YEMEN ARAB REPUBLIC',
                    code: 'yemen.gif'
                },
                {
                    name: 'FRANCE',
                    code: 'france.gif'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.gif'
                },
                {
                    name: 'LIBYA',
                    code: 'libya.gif'
                },
                {
                    name: 'ETHIOPIA',
                    code: 'ethiopia.gif'
                },
                {
                    name: 'SPAIN',
                    code: 'spain.gif'
                },
                {
                    name: 'TAJIK SSR',
                    code: 'TAJIK.png'
                },
                {
                    name: 'KENYA',
                    code: 'kenya.gif'
                },
                {
                    name: 'PAKISTAN',
                    code: 'pakistan.gif'
                },
                {
                    name: 'RUSSIAN SFSR',
                    code: 'RUSSIAN.png'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.gif'
                },
                {
                    name: 'QATAR',
                    code: 'qatar.gif'
                },
                {
                    name: 'KAZAKH SSR',
                    code: 'KAZAKH.png'
                },
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.gif'
                },
                {
                    name: 'GREENLAND',
                    code: 'GREENLAND.gif'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.gif'
                },
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.gif'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.gif'
                },
                {
                    name: 'TANZANIA',
                    code: 'TANZANIA.gif'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.gif'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.gif'
                },
                {
                    name: 'HAITI',
                    code: 'HAITI.gif'
                },
                {
                    name: 'YUGOSLAVIA',
                    code: 'YUGOSLAVIA.jpg'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.gif'
                },
                {
                    name: 'BHUTAN',
                    code: 'BHUTAN.gif'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.gif'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.gif'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.gif'
                },
                {
                    name: 'ARMENIAN SSR',
                    code: 'ARMENIAN.png'
                },
                {
                    name: 'NORWAY',
                    code: 'norway.gif'
                },
                {
                    name: 'SLOVAKIA',
                    code: 'slovakia.gif'
                }
            ];
            break;
        case "4":
            $scope.title = "Presidential Cabinet";
            $scope.flags = [
                {
                    name: 'EUROPEAN AFFAIRS',
                    code: 'pc_1'

                },
                {
                    name: 'EDUCATION',
                    code: 'pc_2'
                },
                {
                    name: 'FOREIGN MINISTER',
                    code: 'pc_3'
                },
                {
                    name: 'INFRA/TRANSPORT',
                    code: 'pc_4'
                },
                {
                    name: 'TOURISM',
                    code: 'pc_5'
                },
                {
                    name: 'FAMILIES/DISABILITIES',
                    code: 'pc_6'
                },
                {
                    name: 'JUSTICE',
                    code: 'pc_7'
                },
                {
                    name: 'INTERIOR, DEPUTY PM',
                    code: 'pc_8'
                },
                {
                    name: 'REGIONAL AFFAIRS',
                    code: 'pc_9'
                },
                {
                    name: 'FINANCE',
                    code: 'pc_10'
                },
                {
                    name: 'DEFENSE',
                    code: 'pc_11'
                },
                {
                    name: 'ENVIRONMENT',
                    code: 'pc_12'
                },
                {
                    name: 'HEALTH',
                    code: 'pc_13'
                },
                {
                    name: 'ECONOMIC DEV, LABOR/SOCIAL POLICY, DEPUTY PM',
                    code: 'pc_14'
                },
                {
                    name: 'MINSTER FOR SOUTH',
                    code: 'pc_15'
                }
            ];
            break;
        case "5":
            $scope.title = "Group of 20";
            $scope.flags = [
                {
                    name: 'MEXICO',
                    code: 'MEXico.gif'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'South_korea.gif'
                },
                {
                    name: 'AFRICAN UNION',
                    code: 'African_Union.png'
                },
                {
                    name: 'EU',
                    code: 'EU.png'
                },
                {
                    name: 'WORLD BANK',
                    code: 'world_bank.jpg'
                },
                {
                    name: 'AUSTRALIA',
                    code: 'australia.gif'
                },
                {
                    name: 'IMF',
                    code: 'IMF.png'
                },
                {
                    name: 'TESLA',
                    code: 'TESLA.png'
                },
                {
                    name: 'RED CROSS',
                    code: 'redcross.png'
                },
                {
                    name: 'FRANCE',
                    code: 'france.gif'
                },
                {
                    name: 'ARGENTINA',
                    code: 'argentina.gif'
                },
                {
                    name: 'INDIA',
                    code: 'india.gif'
                },
                {
                    name: 'GERMANY',
                    code: 'germany.gif'
                },
                {
                    name: 'INDONESIA',
                    code: 'indonesia.gif'
                },
                {
                    name: 'BRAZIL',
                    code: 'brazil.gif'
                },
                {
                    name: 'JAPAN',
                    code: 'japan.gif'
                },
                {
                    name: 'EXXON MOBIL',
                    code: 'exxon_mobil.jpg'
                },
                {
                    name: 'OECD',
                    code: 'OECD.jpg'
                },
                {
                    name: 'USA',
                    code: 'USA.gif'
                },
                {
                    name: 'WTO',
                    code: 'WTO.gif'
                },
                {
                    name: 'UK',
                    code: 'UK.gif'
                },
                {
                    name: 'NIKE',
                    code: 'NIKE.jpg'
                },
                {
                    name: 'CHINA',
                    code: 'China.gif'
                },
                {
                    name: 'AIR BUS',
                    code: 'airbus.png'
                },
                {
                    name: 'SOUTH AFRICA',
                    code: 'South_africa.gif'
                },
                {
                    name: 'ALPHABET',
                    code: 'ALPHABET.jpg'
                },
                {
                    name: 'RUSSIA',
                    code: 'russia.gif'
                },
                {
                    name: 'ITALY',
                    code: 'italy.gif'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'saudi_arabia.gif'
                },
                {
                    name: 'CANADA',
                    code: 'canada.gif'
                },
                {
                    name: 'SPAIN',
                    code: 'spain.gif'
                },
                {
                    name: 'AMAZON',
                    code: 'amazon.png'
                },
                {
                    name: 'TURKEY',
                    code: 'turkey.gif'
                },
                {
                    name: 'ASEAN',
                    code: 'asean.png'
                },
                {
                    name: 'ILO',
                    code: 'ILO.png'
                }
            ];
            break;
        case "6":
            $scope.title = "Security Council";
            $scope.flags = [
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.gif'
                },
                {
                    name: 'UK',
                    code: 'UK.gif'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.gif'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.gif'
                },
                {
                    name: 'USA',
                    code: 'USA.gif'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.gif'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.gif'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.gif'
                },
                {
                    name: 'CAR',
                    code: 'CAR.gif'
                },
                {
                    name: 'PHILIPPINES',
                    code: 'PHILIPPINES.gif'
                },
                {
                    name: 'TAIWAN',
                    code: 'TAIWAN.png'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.gif'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.gif'
                },
                {
                    name: 'UKRAINE',
                    code: 'UKRAINE.gif'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.gif'
                }
            ];
            break;
    }


    $scope.getTally = function (countryCode) {


        $http({
            method: 'GET',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-tally?countryCode=' + countryCode+ '&com=' + com
        }).then(function successCallback(response) {
            $scope.tally = response.data;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    };


    $scope.type = [
        {type: 'Speakers List', points: 15, number: 1},
        {type: 'Right to Reply', points: 10, number: 2},
        {type: 'Point of Information', points: 5, number: 3},
        {type: 'Statement', points: 10, number: 4},
        {type: 'Mod Caucus Topic', points: 10, number: 5},
        {type: 'Mod Caucus Speech', points: 10, number: 6},
        {type: 'Resolution Speech', points: 15, number: 7},
        {type: 'Amendments', points: 5, number: 8},
        {type: 'Foreign Policy Statement', points: 15, number: 9}

    ];

    $scope.submit = function () {
        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/add-points',
            data: {
                "com": parseInt(com),
                "countryId": $scope.selectedCountry.originalObject.code,
                "points": $scope.pts,
                "typeCode": $scope.selectedType.originalObject.number
            }
        }).then(function successCallback(response) {
            alert("Databases successfully updated")
            $scope.tally=null;
            $scope.loginForm.$setPristine();



        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Submission Failure.The service ran into an error. Please try again later.")

        });
    }

    $scope.logout = function () {

        $cookies.remove("com");
        $cookies.remove("uname");
        $cookies.remove("password")
        $state.go('login')


    }

});
