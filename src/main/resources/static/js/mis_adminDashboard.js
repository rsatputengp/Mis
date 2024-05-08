var app = angular.module('adminApp', [])
app.controller('adminController', function ($scope, $http) {

    $scope.userRecord = JSON.parse(window.localStorage.getItem("user"));
    var protocal = window.location.protocol;
    var host = window.location.host;
    $scope.uRl = protocal + "//" + host + "/";

    if (($scope.userRecord)) {

        $scope.adminDashView = true;
        $scope.options = ['SMBG', 'CASA', 'DD', 'FD', 'DAM', 'MIS', 'NMAB', 'HVT'];
        // Selecting the first option initially
        $scope.selectedReportType = $scope.options[0].value;
        $scope.storeMonthAndYear = function () {
            $scope.month = $scope.uploadDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index (0 for January)
            $scope.year = $scope.uploadDate.getFullYear();
            $scope.date = $scope.month.toString() + "-" + $scope.year.toString();
        };
        $scope.importExcelLink = function () {
            debugger;
            alert($scope.uploadDate);
            $scope.month = '';
            $scope.year = '';
            $scope.date = '';
            $scope.storeMonthAndYear();
            alert($scope.date);
            $scope.sheetData = {
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

    } else {
        window.location.href = $scope.uRl + "index.html";
    }

});   