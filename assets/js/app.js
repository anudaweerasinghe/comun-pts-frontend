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

pointsApp.controller('pointsController', function countryListController($scope, $http, $cookies, $state, $interval) {

    $scope.reg = /^[0-9]\\d*$/;


    var com = $cookies.get("com");
    $scope.title = "";
    console.log(com);
    $scope.callAtInterval = function () {


        $http({
            method: 'POST',
            url: 'http://anuda.me:8080/pointsback/pointsapi/get-points?com='+com
        }).then(function successCallback(response) {

            $scope.points = response.data;
            $scope.table = false;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Failed to retrieve points data. Please try again");

        });
    };


    switch (com) {

        case "1":
            $scope.title = "General Assembly 3";
            $scope.flags = [
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.GIF'
                },
                {
                    name: 'BELARUS',
                    code: 'BELARUS.GIF'
                },
                {
                    name: 'BHUTAN',
                    code: 'BHUTAN.GIF'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.GIF'
                },
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.GIF'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.GIF'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.GIF'
                },
                {
                    name: 'ARMENIA',
                    code: 'ARMENIA.GIF'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.GIF'
                },
                {
                    name: 'CENTRAL AFRICAN REPUBLIC',
                    code: 'CENTRAL_AFRICAN_REPUBLIC.GIF'
                },
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.GIF'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.GIF'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.GIF'
                },
                {
                    name: 'USA',
                    code: 'USA.GIF'
                },
                {
                    name: 'DRC',
                    code: 'DRC.GIF'
                },
                {
                    name: 'ERITREA',
                    code: 'ERITREA.GIF'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.GIF'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.GIF'
                },
                {
                    name: 'MONGOLIA',
                    code: 'MONGOLIA.GIF'
                },
                {
                    name: 'TAJIKISTAN',
                    code: 'TAJIKISTAN.GIF'
                },
                {
                    name: 'GREENLAND',
                    code: 'GREENLAND.GIF'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.GIF'
                },
                {
                    name: 'YEMEN',
                    code: 'YEMEN.GIF'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.GIF'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.GIF'
                },
                {
                    name: 'GEORGIA',
                    code: 'GEORGIA.GIF'
                },
                {
                    name: 'JAPAN',
                    code: 'JAPAN.GIF'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.GIF'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.GIF'
                },
                {
                    name: 'ESTONIA',
                    code: 'ESTONIA.GIF'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.GIF'
                },
                {
                    name: 'MALI',
                    code: 'MALI.GIF'
                },
                {
                    name: 'MEXICO',
                    code: 'MEXICO.GIF'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.GIF'
                },
                {
                    name: 'UK',
                    code: 'UK.GIF'
                },
                {
                    name: 'UKRAINE',
                    code: 'UKRAINE.GIF'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.GIF'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.GIF'
                },
                {
                    name: 'KYRGYZSTAN',
                    code: 'KYRGYZSTAN.GIF'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.GIF'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.GIF'
                },
                {
                    name: 'UZBEKISTAN',
                    code: 'UZBEKISTAN.GIF'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.GIF'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.GIF'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.GIF'
                },
                {
                    name: 'NIGERIA',
                    code: 'NIGERIA.GIF'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.GIF'
                },
                {
                    name: 'PAKISTAN',
                    code: 'PAKISTAN.GIF'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.GIF'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.GIF'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.GIF'
                },
                {
                    name: 'AZERBAIJAN',
                    code: 'AZERBAIJAN.GIF'
                },
                {
                    name: 'ETHIOPIA',
                    code: 'ETHIOPIA.GIF'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.GIF'
                },
                {
                    name: 'LATVIA',
                    code: 'LATVIA.GIF'
                },
                {
                    name: 'LITHUANIA',
                    code: 'LITHUANIA.GIF'
                },
                {
                    name: 'NORWAY',
                    code: 'NORWAY.GIF'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.GIF'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.GIF'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.GIF'
                },
                {
                    name: 'KAZAKHSTAN',
                    code: 'KAZAKHSTAN.GIF'
                },
                {
                    name: 'HAITI',
                    code: 'HAITI.GIF'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.GIF'
                },
                {
                    name: 'KENYA',
                    code: 'KENYA.GIF'
                },
                {
                    name: 'MOLDOVA',
                    code: 'MOLDOVA.GIF'
                },
                {
                    name: 'QATAR',
                    code: 'QATAR.GIF'
                },
                {
                    name: 'SUDAN',
                    code: 'SUDAN.GIF'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.GIF'
                },
                {
                    name: 'TURKMENISTAN',
                    code: 'TURKMENISTAN.GIF'
                },
                {
                    name: 'UAE',
                    code: 'UAE.GIF'
                }
            ];
            break;
        case "2":
            $scope.title = "General Assembly 4";
            $scope.flags = [
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.GIF'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.GIF'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.GIF'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.GIF'
                },
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.GIF'
                },
                {
                    name: 'MONGOLIA',
                    code: 'MONGOLIA.GIF'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.GIF'
                },
                {
                    name: 'USA',
                    code: 'USA.GIF'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.GIF'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.GIF'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.GIF'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.GIF'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.GIF'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.GIF'
                },
                {
                    name: 'MALI',
                    code: 'MALI.GIF'
                },
                {
                    name: 'LITHUANIA',
                    code: 'LITHUANIA.GIF'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.GIF'
                },
                {
                    name: 'UZBEKISTAN',
                    code: 'UZBEKISTAN.GIF'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.GIF'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.GIF'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.GIF'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.GIF'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.GIF'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.GIF'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.GIF'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.GIF'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.GIF'
                },
                {
                    name: 'YEMEN',
                    code: 'YEMEN.GIF'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.GIF'
                },
                {
                    name: 'BELARUS',
                    code: 'BELARUS.GIF'
                },
                {
                    name: 'KENYA',
                    code: 'KENYA.GIF'
                },
                {
                    name: 'QATAR',
                    code: 'QATAR.GIF'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.GIF'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.GIF'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.GIF'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.GIF'
                },
                {
                    name: 'UAE',
                    code: 'UAE.GIF'
                },
                {
                    name: 'CAR',
                    code: 'CAR.GIF'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.GIF'
                },
                {
                    name: 'UK',
                    code: 'UK.GIF'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.GIF'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.GIF'
                },
                {
                    name: 'DENMARK',
                    code: 'DENMARK.GIF'
                },
                {
                    name: 'DRC',
                    code: 'DRC.GIF'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.GIF'
                },
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.GIF'
                },
                {
                    name: 'ESTONIA',
                    code: 'ESTONIA.GIF'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.GIF'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.GIF'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.GIF'
                },
                {
                    name: 'JAPAN',
                    code: 'JAPAN.GIF'
                }
            ];
            break;
        case "3":
            $scope.title = "Historical General Asssembly 1";
            $scope.flags = [
                {
                    name: 'USA',
                    code: 'USA.GIF'
                },
                {
                    name: 'OMAN',
                    code: 'OMAN.GIF'
                },
                {
                    name: 'ISRAEL',
                    code: 'ISRAEL.GIF'
                },
                {
                    name: 'MONGOLIA',
                    code: 'MONGOLIA.GIF'
                },
                {
                    name: 'LEBANON',
                    code: 'LEBANON.GIF'
                },
                {
                    name: 'KIRGHIZ SSR',
                    code: 'KIRGHIS.PNG'
                },
                {
                    name: 'VENEZUELA',
                    code: 'VENEZUELA.GIF'
                },
                {
                    name: 'ESTONIAN SSR',
                    code: 'ESTONIAN.PNG'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.GIF'
                },
                {
                    name: 'MYANMAR',
                    code: 'MYANMAR.GIF'
                },
                {
                    name: 'JORDAN',
                    code: 'JORDAN.GIF'
                },
                {
                    name: 'MOLDAVIAN SSR',
                    code: 'MOLDAVIAN.PNG'
                },
                {
                    name: 'LITHUANIAN SSR',
                    code: 'LITHUANIAN.PNG'
                },
                {
                    name: 'UK',
                    code: 'UK.GIF'
                },
                {
                    name: 'PALESTINE',
                    code: 'PALESTINE.GIF'
                },
                {
                    name: 'AZERBAIJAN SSR',
                    code: 'AZERBAIJAN.svg'
                },
                {
                    name: 'AFGHANISTAN',
                    code: 'AFGHANISTAN.GIF'
                },
                {
                    name: 'ERITREA',
                    code: 'ERITREA.PNG'
                },
                {
                    name: 'MALI',
                    code: 'MALI.GIF'
                },
                {
                    name: 'ZAIRE',
                    code: 'DRC.GIF'
                },
                {
                    name: 'UKRAINIAN SSR',
                    code: 'UKRAINIAN.PNG'
                },
                {
                    name: 'FINLAND',
                    code: 'FINLAND.GIF'
                },
                {
                    name: 'ICELAND',
                    code: 'ICELAND.GIF'
                },
                {
                    name: 'NETHERLANDS',
                    code: 'NETHERLANDS.GIF'
                },
                {
                    name: 'MEXICO',
                    code: 'mexico.GIF'
                },
                {
                    name: 'SUDAN',
                    code: 'SUDAN.GIF'
                },
                {
                    name: 'CAR',
                    code: 'CAR.GIF'
                },
                {
                    name: 'LATVIAN SSR',
                    code: 'LATVIAN.PNG'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.GIF'
                },
                {
                    name: 'EGYPT',
                    code: 'EGYPT.GIF'
                },
                {
                    name: 'GEORGIAN SSR',
                    code: 'GEORGIAN.PNG'
                },
                {
                    name: 'JAPAN',
                    code: 'JAPAN.GIF'
                },
                {
                    name: 'BYELORUSSIAN SSR',
                    code: 'BYELORUSSIAN.PNG'
                },
                {
                    name: 'TURKMEN SSR',
                    code: 'turkmen.PNG'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.GIF'
                },
                {
                    name: 'BANGLADESH',
                    code: 'BANGLADESH.GIF'
                },
                {
                    name: 'UZBEK SSR',
                    code: 'UZBEK.PNG'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.GIF'
                },
                {
                    name: 'UAE',
                    code: 'UAE.GIF'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.GIF'
                },
                {
                    name: 'NIGERIA',
                    code: 'nigeria.GIF'
                },
                {
                    name: 'YEMEN ARAB REPUBLIC',
                    code: 'YEMEN.GIF'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.GIF'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.GIF'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.GIF'
                },
                {
                    name: 'ETHIOPIA',
                    code: 'ETHIOPIA.GIF'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.GIF'
                },
                {
                    name: 'TAJIK SSR',
                    code: 'TAJIK.PNG'
                },
                {
                    name: 'KENYA',
                    code: 'KENYA.GIF'
                },
                {
                    name: 'PAKISTAN',
                    code: 'PAKISTAN.GIF'
                },
                {
                    name: 'RUSSIAN SFSR',
                    code: 'RUSSIAN.PNG'
                },
                {
                    name: 'NORTH KOREA',
                    code: 'NORTH_KOREA.GIF'
                },
                {
                    name: 'QATAR',
                    code: 'QATAR.GIF'
                },
                {
                    name: 'KAZAKH SSR',
                    code: 'KAZAKH.PNG'
                },
                {
                    name: 'CYPRUS',
                    code: 'CYPRUS.GIF'
                },
                {
                    name: 'GREENLAND',
                    code: 'GREENLAND.GIF'
                },
                {
                    name: 'COLOMBIA',
                    code: 'COLOMBIA.GIF'
                },
                {
                    name: 'ANGOLA',
                    code: 'ANGOLA.GIF'
                },
                {
                    name: 'BAHRAIN',
                    code: 'BAHRAIN.GIF'
                },
                {
                    name: 'TANZANIA',
                    code: 'TANZANIA.GIF'
                },
                {
                    name: 'TUNISIA',
                    code: 'TUNISIA.GIF'
                },
                {
                    name: 'KOSOVO',
                    code: 'KOSOVO.GIF'
                },
                {
                    name: 'HAITI',
                    code: 'HAITI.GIF'
                },
                {
                    name: 'YUGOSLAVIA',
                    code: 'YUGOSLAVIA.JPG'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.GIF'
                },
                {
                    name: 'BHUTAN',
                    code: 'BHUTAN.GIF'
                },
                {
                    name: 'SOMALIA',
                    code: 'SOMALIA.GIF'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.GIF'
                },
                {
                    name: 'KUWAIT',
                    code: 'KUWAIT.GIF'
                },
                {
                    name: 'ARMENIAN SSR',
                    code: 'ARMENIAN.PNG'
                },
                {
                    name: 'NORWAY',
                    code: 'norway.GIF'
                },
                {
                    name: 'SLOVAKIA',
                    code: 'SLOVAKIA.GIF'
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
                    code: 'MEXICO.GIF'
                },
                {
                    name: 'SOUTH KOREA',
                    code: 'SOUTH_KOREA.GIF'
                },
                {
                    name: 'AFRICAN UNION',
                    code: 'AFRICAN_UNION.PNG'
                },
                {
                    name: 'EU',
                    code: 'EU.PNG'
                },
                {
                    name: 'WORLD BANK',
                    code: 'WORLD_BANK.JPG'
                },
                {
                    name: 'AUSTRALIA',
                    code: 'AUSTRALIA.GIF'
                },
                {
                    name: 'IMF',
                    code: 'IMF.PNG'
                },
                {
                    name: 'TESLA',
                    code: 'TESLA.PNG'
                },
                {
                    name: 'RED CROSS',
                    code: 'REDCROSS.PNG'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.GIF'
                },
                {
                    name: 'ARGENTINA',
                    code: 'ARGENTINA.GIF'
                },
                {
                    name: 'INDIA',
                    code: 'INDIA.GIF'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.GIF'
                },
                {
                    name: 'INDONESIA',
                    code: 'INDONESIA.GIF'
                },
                {
                    name: 'BRAZIL',
                    code: 'BRAZIL.GIF'
                },
                {
                    name: 'JAPAN',
                    code: 'JAPAN.GIF'
                },
                {
                    name: 'EXXON MOBIL',
                    code: 'EXXON_MOBIL.JPG'
                },
                {
                    name: 'OECD',
                    code: 'OECD.JPG'
                },
                {
                    name: 'USA',
                    code: 'USA.GIF'
                },
                {
                    name: 'WTO',
                    code: 'WTO.GIF'
                },
                {
                    name: 'UK',
                    code: 'UK.GIF'
                },
                {
                    name: 'NIKE',
                    code: 'NIKE.JPG'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.GIF'
                },
                {
                    name: 'AIR BUS',
                    code: 'AIRBUS.PNG'
                },
                {
                    name: 'SOUTH AFRICA',
                    code: 'SOUTH_AFRICA.GIF'
                },
                {
                    name: 'ALPHABET',
                    code: 'ALPHABET.JPG'
                },
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.GIF'
                },
                {
                    name: 'ITALY',
                    code: 'ITALY.GIF'
                },
                {
                    name: 'SAUDI ARABIA',
                    code: 'SAUDI_ARABIA.GIF'
                },
                {
                    name: 'CANADA',
                    code: 'CANADA.GIF'
                },
                {
                    name: 'SPAIN',
                    code: 'SPAIN.GIF'
                },
                {
                    name: 'AMAZON',
                    code: 'AMAZON.PNG'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.GIF'
                },
                {
                    name: 'ASEAN',
                    code: 'ASEAN.PNG'
                },
                {
                    name: 'ILO',
                    code: 'ILO.PNG'
                }
            ];
            break;
        case "6":
            $scope.title = "Security Council";
            $scope.flags = [
                {
                    name: 'RUSSIA',
                    code: 'RUSSIA.GIF'
                },
                {
                    name: 'UK',
                    code: 'UK.GIF'
                },
                {
                    name: 'CHINA',
                    code: 'CHINA.GIF'
                },
                {
                    name: 'TURKEY',
                    code: 'TURKEY.GIF'
                },
                {
                    name: 'USA',
                    code: 'USA.GIF'
                },
                {
                    name: 'SYRIA',
                    code: 'SYRIA.GIF'
                },
                {
                    name: 'FRANCE',
                    code: 'FRANCE.GIF'
                },
                {
                    name: 'GERMANY',
                    code: 'GERMANY.GIF'
                },
                {
                    name: 'CAR',
                    code: 'CAR.GIF'
                },
                {
                    name: 'PHILIPPINES',
                    code: 'PHILIPPINES.GIF'
                },
                {
                    name: 'TAIWAN',
                    code: 'TAIWAN.PNG'
                },
                {
                    name: 'IRAN',
                    code: 'IRAN.GIF'
                },
                {
                    name: 'LIBYA',
                    code: 'LIBYA.GIF'
                },
                {
                    name: 'UKRAINE',
                    code: 'UKRAINE.GIF'
                },
                {
                    name: 'IRAQ',
                    code: 'IRAQ.GIF'
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
        $scope.points=null;
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

    $interval( function(){ $scope.callAtInterval(); }, 1000);

    $scope.logout = function () {

        $cookies.remove("com");
        $cookies.remove("uname");
        $cookies.remove("password")
        $state.go('login')


    }

});
