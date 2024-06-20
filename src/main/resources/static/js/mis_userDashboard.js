 angular.module('dashboardApp', [])
         .controller('dashboardController', function ($scope, $http, $location) {


             $scope.userRecord = JSON.parse(window.localStorage.getItem("user"));
             var protocal = window.location.protocol;
             var host = window.location.host;
             $scope.uRl = protocal + "//" + host + "/";

             if (($scope.userRecord)) {

                 $scope.reportTypeForDashboard = "";
                 $scope.reportView = false;
//                filal
                 $scope.productView = true;

                 $scope.reportType = true;
                 $scope.reportSubType = false;

//              sub type report
                 $scope.showCH = false;
                 $scope.showCASA = false;
                 $scope.showMaturity = false;
                 $scope.showFDRD = false;
                 $scope.showDD = false;
                 $scope.showOPS = false;
                 $scope.showHR = false;



                 $scope.showReportTy = function (mess) {

                     $scope.reportType = false;
                     $scope.reportSubType = true;

                     if (mess === "CH REPORT") {

                         $scope.showCH = true;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = false;

                     } else if (mess === "CASA") {

                         $scope.showCH = false;
                         $scope.showCASA = true;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = false;
                     } else if (mess === "OPS") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = true;
                         $scope.showHR = false;
                     } else if (mess === "DD") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = true;
                         $scope.showOPS = false;
                         $scope.showHR = false;
                     } else if (mess === "SMBG") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = true;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = false;
                     } else if (mess === "TARGET") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = false;
                     } else if (mess === "MATURITY") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = true;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = false;

                     } else if (mess === "HR") {
                         $scope.showCH = false;
                         $scope.showCASA = false;
                         $scope.showMaturity = false;
                         $scope.showFDRD = false;
                         $scope.showDD = false;
                         $scope.showOPS = false;
                         $scope.showHR = true;

                     }else {
                         alert("Something Went Wrong");
                     }


                 }




                 $scope.report = function (mess) {
                     $scope.reportTypeForDashboard = mess;
                     $scope.reportView = true;


                     $scope.productView = false;
                     $scope.reportType = false;
                     $scope.reportSubType = false;

                 };





                 $scope.reloadPage = function () {
                     location.reload();
                 };
                 $scope.getReportData = function () {
                     debugger;
                     $scope.sheetLink = "";
//                    var month = $scope.uploadDate.getMonth() + 1;
//                    var date = month.toString() +
//                            "-" + $scope.uploadDate.getFullYear().toString();
                     var inputdate = new Date($scope.uploadDate);
                     $scope.day = inputdate.getDate();
                     $scope.month = inputdate.getMonth() + 1;
                     $scope.year = inputdate.getFullYear();
                     $scope.date = $scope.day.toString() + "-" + $scope.month.toString() + "-" + $scope.year.toString();
                     alert($scope.date);
                     var URL = "documents/getDocumentByreportTypeAndDate/"
                             + $scope.reportTypeForDashboard + "/" + $scope.date;

                     $http.get($scope.uRl + URL)
                             .then(function (response) {
                                 $scope.sheetLink = response.data.sheetLink;
                                 var excelLink = $scope.sheetLink;
                                 console.log(excelLink);
                                 var embeddedExcel = document.getElementById('embeddedExcel');

                                 // // Clear previous content
                                 embeddedExcel.innerHTML = '';

                                 // // Create iframe element
                                 var iframe = document.createElement('iframe');
                                 iframe.setAttribute('src', excelLink);
                                 iframe.setAttribute('width', '100%');
                                 iframe.setAttribute('height', '480px');
                                 iframe.setAttribute('frameborder', '0');
                                 iframe.setAttribute('scrolling', 'no');

                                 // Append iframe to div
                                 embeddedExcel.appendChild(iframe);

                             }, function (error) {
                                 alert("Report Not Found");
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
