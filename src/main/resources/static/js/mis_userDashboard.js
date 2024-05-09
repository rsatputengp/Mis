angular.module('dashboardApp', [])
        .controller('dashboardController', function ($scope, $http, $location) {


            $scope.userRecord = JSON.parse(window.localStorage.getItem("user"));
            var protocal = window.location.protocol;
            var host = window.location.host;
            $scope.uRl = protocal + "//" + host + "/";

            if (($scope.userRecord)) {

                $scope.reportTypeForDashboard = "";
                $scope.reportView = false;
                $scope.productView = true;

                $scope.report = function (mess) {
                    $scope.reportTypeForDashboard = mess;
                    $scope.reportView = true;
                    $scope.productView = false;

                };
                $scope.reloadPage = function () {
                    location.reload();
                };
                $scope.getReportData = function () { debugger;
                    $scope.sheetLink = "";
                    var month = $scope.uploadDate.getMonth() + 1;
                    var date = month.toString() +
                            "-" + $scope.uploadDate.getFullYear().toString();

                    var URL = "documents/getDocumentByreportTypeAndDate/"
                            + $scope.reportTypeForDashboard + "/" + date;

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
