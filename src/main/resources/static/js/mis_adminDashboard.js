var app = angular.module('adminApp', [])
app.controller('adminController', function ($scope, $http) {

    $scope.userRecord = JSON.parse(window.localStorage.getItem("user"));
    var protocal = window.location.protocol;
    var host = window.location.host;
    $scope.uRl = protocal + "//" + host + "/";

    if (($scope.userRecord)) {
        $scope.sheetData = [];
        var URL = "documents/getallDocument";
        $http.get($scope.uRl + URL)
                .then(function (response) {
                    $scope.sheetData = response.data;

                }, function (error) {
                    alert("Report Data Not Found");
                    console.log(error);
                });

        $scope.date = "";
        $scope.adminDashView = true;
        $scope.options = ['DAILY CH', 'CASA DAILY', 'NMAB', 'CASA STAFFWISE', 'HVT', 'MATURITY TRACKER', 'LIABILITY TARGET VS ACHIEVEMENT', 'RD SMBG PENDING',
            'SMBG REGULAR', 'DD REGULAR', 'DD PENDING', 'DD TRACKER', 'BRANCH SCORECARD', 'BOD/EOD REGULAR'];
        // Selecting the first option initially
        $scope.selectedReportType = $scope.options[0].value;
        $scope.storeMonthAndYear = function () {
            var inputdate = new Date($scope.uploadDate);
            $scope.day = inputdate.getDate();
            $scope.month = inputdate.getMonth() + 1;
            $scope.year = inputdate.getFullYear();
            $scope.date = $scope.day.toString() + "-" + $scope.month.toString() + "-" + $scope.year.toString();
            alert($scope.date);
        };
        $scope.importExcelLink = function () {
            debugger;
            $scope.storeMonthAndYear();
            $scope.sheetData = {
                reportName: $scope.selectedReportType,
                reportType: $scope.selectedReportType,
                date: $scope.date,
                sheetLink: $scope.sheetLink
            };
            var URL = $scope.uRl + "documents/save";
            $http.post(URL, $scope.sheetData)
                    .then(function (response) {
                        alert("Excel Sheet Uploaded Successfully");
                        location.reload();
                    }, function (error) {
                        console.log(error);
                    });
        };

        $scope.logout = function () {
            alert("Logout Successfully.");
            window.localStorage.removeItem("user");
            window.location.href = $scope.uRl + "index.html";
        };

        $scope.showPopup = function () {
            $scope.isPopupVisible = true;
        };

        $scope.closePopup = function () {
            $scope.isPopupVisible = false;
        };

    } else {
        window.location.href = $scope.uRl + "index.html";
    }

});   