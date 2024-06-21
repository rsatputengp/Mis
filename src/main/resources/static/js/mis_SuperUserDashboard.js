 var app = angular.module('adminApp', [])
 app.controller('adminController', function ($scope, $http) {

     $scope.userRecord = JSON.parse(window.localStorage.getItem("SuperUser"));
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

         $scope.document = "";
         $scope.date = "";
         $scope.adminDashView = true;
         $scope.updatebutton = false;
         $scope.uploadbutton = true;
         $scope.options = ['DAILY CH', 'CASA DAILY', 'NMAB', 'CASA STAFFWISE', 'HVT', 'MATURITY TRACKER', 'LIABILITY TARGET VS ACHIEVEMENT', 'RD SMBG PENDING',
             'SMBG REGULAR', 'DD TRACKER', 'BRANCH SCORECARD', 'BOD_EOD REGULAR'];
//        $scope.options = ['DAILY CH', 'CASA DAILY', 'NMAB', 'CASA STAFFWISE', 'HVT', 'MATURITY TRACKER', 'LIABILITY TARGET VS ACHIEVEMENT', 'RD SMBG PENDING',
//            'SMBG REGULAR', 'DD REGULAR', 'DD PENDING', 'DD TRACKER', 'BRANCH SCORECARD', 'BOD/EOD REGULAR'];
         // Selecting the first option initially
         $scope.selectedReportType = $scope.options[0].value;
         $scope.storeMonthAndYear = function () {
             var inputdate = new Date($scope.uploadDate);
             $scope.day = inputdate.getDate();
             $scope.month = inputdate.getMonth() + 1;
             $scope.year = inputdate.getFullYear();
             $scope.date = $scope.day.toString() + "-" + $scope.month.toString() + "-" + $scope.year.toString();
         };

         $scope.importExcelLink = function () {
             debugger;
             if ($scope.validLink()) {

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
             }
         };

         $scope.updateExcelLink = function () {
             debugger;
             if ($scope.validLink()) {

                 if ($scope.date === "") {
                     $scope.date = $scope.uploadDate;
                 }

                 $scope.sheetData = {
                     reportName: $scope.selectedReportType,
                     reportType: $scope.selectedReportType,
                     date: $scope.date,
                     sheetLink: $scope.sheetLink
                 };
                 var URL = $scope.uRl + "documents/update/" + $scope.document.id;
                 $http.put(URL, $scope.sheetData)
                         .then(function (response) {
                             alert("Excel Sheet Update Successfully");
                             location.reload();
                         }, function (error) {
                             console.log(error);
                         });
             }
         };

         $scope.editView = function (id) {
             debugger;

             var URL = $scope.uRl + "documents/getDocumentById/" + id;
             $http.get(URL)
                     .then(function (response) {
                         debugger;
                         $scope.closePopup();
                         $scope.document = response.data;
                         $scope.selectedReportType = $scope.document.reportType;
                         $scope.uploadDate = $scope.document.date;
                         $scope.sheetLink = $scope.document.sheetLink;


                         const dateString = $scope.uploadDate;

                         // Parse the date string
                         const [day, month, year] = dateString.split('-');

                         // Function to pad single digits to two digits
                         function padToTwoDigits(number) {
                             return number.toString().padStart(2, '0');
                         }

                         // Format the date properly
                         function formatDate(year, month, day) {
                             return `${year}-${padToTwoDigits(month)}-${padToTwoDigits(day)}`;
                         }

                         // Get the input element
                         var dateInput = document.getElementById('admin_datepicker');

                         // Set the value to the desired date
                         dateInput.value = formatDate(year, month, day);
                         $scope.updatebutton = true;
                         $scope.uploadbutton = false;
                     }, function (error) {
                         console.log(error);
                     });
         };



         $scope.validLink = function () {
             var link = $scope.sheetLink;
             const count = link.split("http").length - 1;
             if (count === 1) {
                 return true;
             } else {
                 alert("Link is not  valid.");
                 return false;
             }
         };

         $scope.logout = function () {
             alert("Logout Successfully.");
             window.localStorage.removeItem("SuperUser");
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