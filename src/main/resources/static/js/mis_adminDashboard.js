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

         $scope.adminDashView = true;
         $scope.options = ['DAILY CH', 'CASA DAILY', 'NMAB', 'CASA STAFFWISE','HVT','MATURITY TRACKER', 'LIABILITY TARGET VS ACHIEVEMENT','RD SMBG PENDING',
             'SMBG REGULAR','DD REGULAR','DD PENDING','DD TRACKER','BRANCH SCORECARD','BOD/EOD REGULAR'];
         // Selecting the first option initially
         $scope.selectedReportType = $scope.options[0].value;
         $scope.storeMonthAndYear = function () {
             $scope.month = $scope.uploadDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index (0 for January)
             $scope.year = $scope.uploadDate.getFullYear();
             $scope.date = $scope.month.toString() + "-" + $scope.year.toString();
         };
         $scope.importExcelLink = function () {
             debugger;
//            alert($scope.uploadDate);
             $scope.month = '';
             $scope.year = '';
             $scope.date = '';
             $scope.storeMonthAndYear();
//            alert($scope.date);
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