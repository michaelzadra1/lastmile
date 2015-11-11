myApp.controller('SearchController', function($scope, $http) {

    // Defualt values for cost analysis of car
    $scope.defaultCost = {
        cityPercent: 55,
        hwyPercent: 45,
        annualDistance: 20000,
        gasPrice: 99.9
    };

    // Animation variable for results section
    $scope.resultsBool = false;

    // Set animation class
    $scope.pageClass = 'search';

    // String for selected car
    $scope.carString;

    // Max values for fuel consumption and emissions progress bars
    $scope.fcMax = 35;
    $scope.fcMaxMpg = 70;
    $scope.emissionsMax = 700;

    // Bool values for carbon tax rate
    $scope.britishColumbia = false;
    $scope.quebec = false;

    // Tax rate for carbon tax
    $scope.taxRate = {
        quebec: 0.8,
        bcGas: 6.67,
        bcDiesel: 7.67
    };

    // Annual carbon tax cost variable
    $scope.carbonCost;

    // Resets car cost details
    $scope.reset = function() {
        $scope.carCost = angular.copy($scope.defaultCost);
    };
    $scope.reset();

    // Fuel type string parser
    function textReplace(string) {
        string = string.replace(/X/g, "Regular Gasoline");
        string = string.replace(/Z/g, "Premium Gasoline");
        string = string.replace(/D/g, "Diesel");
        string = string.replace(/E/g, "Ethanol (E85)");
        string = string.replace(/N/g, "Natural Gas");
        return string;
    }

    // Calculates annual cost of car
    $scope.calculateCost = function() {
        if ($scope.carCost.cityPercent + $scope.carCost.hwyPercent != 100) {
            alert("City and highway driving must add to 100%!");
        } else {
            // Combined fuel rate chosen by user in L/KM
            $scope.combinedRate = (($scope.inspectCar.fc_city * ($scope.carCost.cityPercent / 100)) + ($scope.inspectCar.fc_hwy * ($scope.carCost.hwyPercent / 100))) / 100;
            console.log($scope.combinedRate + " L/KM");
            // Calculate total annual cost
            $scope.annualCost = ($scope.combinedRate * $scope.carCost.gasPrice * $scope.carCost.annualDistance) / 100;
            // Round to two decimal places
            $scope.annualCost = parseFloat(Math.round($scope.annualCost * 100) / 100).toFixed(2);
            // Cost per KM
            console.log($scope.costPerKm);
            $scope.costPerKm = $scope.annualCost / $scope.carCost.annualDistance;
            $scope.costPerKm = parseFloat(Math.round($scope.costPerKm * 100) / 100).toFixed(2);
            //console.log("Annual cost of car is " + $scope.annualCost + " dollars.");
            console.log($scope.costPerKm);
        }
        $scope.calculateCarbonTax($scope.carbonProvince);
        console.log($scope.carbonProvince);
    }

    // User selects year, function returns object of cars from that year
    $scope.getCars = function(year) {
        // HTTP request to get cars as JSON object
        $http.post('/cars', {
            "year": year
        }).success(function(result) {
            // Cars of specified years contained in object cars
            $scope.cars = result;
        });
    }; //getCars

    // Generates picture for car, and displays stats for the selected vehicle
    $scope.generateCar = function(year, carMake, carModel, vehicleClass) {
        $scope.carMakeString = carMake.make;
        $scope.carString = year + ' ' + carMake.make + ' ' + carModel.model + ' ' + vehicleClass.vehicle_class;
        console.log($scope.carString);
        // Make HTTP request to get car stats
        $http.post('/selectCar', {
            "year": year,
            "make": carMake.make,
            "model": carModel.model,
            "vehicle_class": vehicleClass.vehicle_class
        })
            .success(function(result) {

                $scope.selectedCars = result;
                // Initialize selected row to null
                $scope.selectedRow = 0;
                // Parse the fuel strings in results
                for (car in $scope.selectedCars) {
                    $scope.selectedCars[car].fuel_type = textReplace($scope.selectedCars[car].fuel_type);
                }
                // Intialize inspectCar as first selectedCar in object array
                $scope.inspectCar = $scope.selectedCars[0];
                $scope.calculateCost();

            });
        // Google search API
        google.load("search", "1", {
            "callback": OnLoad
        });
        var imageSearch;
        // Animate results
        $scope.resultsBool = true;

    } //generateCar

    function searchComplete() {

        // Check that we got results
        if (imageSearch.results && imageSearch.results.length > 0) {

            // Loop through our results, printing them to the page.
            var results = imageSearch.results;

            var result = results[0];
            // Replace current image with new image found
            document.getElementById("lol").src = result.url;
        }
    }

    function OnLoad() {

        // Create an Image Search instance.
        imageSearch = new google.search.ImageSearch();
        imageSearch.setRestriction(
            google.search.ImageSearch.RESTRICT_IMAGESIZE,
            google.search.ImageSearch.IMAGESIZE_MEDIUM);

        // Set searchComplete as the callback function when a search is 
        // complete.  The imageSearch object will have results in it.
        imageSearch.setSearchCompleteCallback(this, searchComplete, null);

        // Find a car
        imageSearch.execute($scope.carMakeString + "logo transparent background");
        //imageSearch.execute($scope.carString);
    }

    // Sets the value of the row selector to current index
    $scope.setClickedRow = function(index) {
        $scope.selectedRow = index;
        $scope.inspectCar = $scope.selectedCars[index];
        $scope.calculateCost();
    };

    // Sets province for carbon tax rate
    $scope.calculateCarbonTax = function(carbonProvince) {
        $scope.carbonProvince = carbonProvince;
        if (carbonProvince == "British Columbia") {
            $scope.quebec = false;
            $scope.britishColumbia = true;
            // Tax rate differes for vehicles with Diesel
            if ($scope.inspectCar.fuel_type == "Diesel") {
                $scope.carbonCost = $scope.combinedRate * $scope.carCost.annualDistance * ($scope.taxRate.bcDiesel / 100);
            // Regular Gas
            } else {
                $scope.carbonCost = $scope.combinedRate * $scope.carCost.annualDistance * ($scope.taxRate.bcGas / 100);
            }
        } else if (carbonProvince == "Quebec") {
            $scope.britishColumbia = false;
            $scope.quebec = true;
            $scope.carbonCost = $scope.combinedRate * $scope.carCost.annualDistance * ($scope.taxRate.quebec / 100);
        } else {
            $scope.quebec = false;
            $scope.britishColumbia = false;
            $scope.carbonCost = 0;
        }
        $scope.carbonCost = parseFloat(Math.round($scope.carbonCost * 100) / 100).toFixed(2);

    };

}); //SearchController