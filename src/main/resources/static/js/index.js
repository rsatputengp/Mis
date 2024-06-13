/* global angular */

var app = angular.module('indexApp', []);

app.controller('indexController', function ($scope, $http, $location) {

    var protocal = window.location.protocol;
    var host = window.location.host;
    $scope.uRl = protocal + "//" + host + "/";
//    $scope.uRl = $location.absUrl();
//    alert($scope.muUrl);

    $scope.signInPage = true;
    $scope.signUpPage = false;
    $scope.resetPage = false;


    $scope.selectedBranch = "";

    $scope.branches = ["AHERI", "AKOLA", "AKOT", "AMGAON", "AMRAVATI", "ANJANGAON", "ARMORI", "ARNI", "ARVI",
        "ASHTI", "BALLARPUR", "BHADRAWATI", "BHANDARA", "BHIWAPUR", "BRAMHAPURI", "BULDHANA", "CHAMORSHI",
        "CHANDRAPUR", "CHANDUR BAZAR", "CHANDUR RAILWAY", "CHIKHALI", "DARWAH", "DARYAPUR", "DEOLI", "DEORI",
        "DEULGAON", "DHANORA", "DIGRAS", "GADCHIROLI", "GANDHIBAGH", "GHATANJI", "GONDIA", "GONDPIPRI", "GOREGAON",
        "HEAD OFFICE GONDIA", "HINGANGHAT", "HINGNA", "JALGAON JAMOD", "KALAMB", "KALMESHWAR", "KANHAN", "KARANJA GHADGE", "KARANJA LAD",
        "KATOL", "KHAMGAON", "KORCHI", "KUHI", "KURKHEDA", "LAKHANDUR", "LAKHNI", "LONAR", "MAHAGAON", "MALEGAON",
        "MALKAPUR", "MANGLURPIR", "MANISH NAGAR", "MANORA", "MAREGAON", "MAUDA", "MEHKAR", "MOHADI", "MORARJUNI",
        "MORSHI", "MUL", "MULCHERA", "MURTIZAPUR", "NAGBHID", "NAGPUR", "NAGPUR WEALTH", "NANDURA", "NARKHED",
        "NER PARSOPANT", "PANDHARKAWADA", "PARATWADA", "PARSHIVANI", "PATUR", "PAUNI", "PUSAD", "RAJURA", "RALEGAON",
        "RAMTEK", "RISOD", "SADARJUNI", "SAKOLI", "SALEKASA", "SAMUDRAPUR", "SANGRAMPUR", "SAOLI", "SAONER", "SELOO",
        "SHEGAON", "SINDEWAHI", "TIRORA", "TUMSAR", "UMARKHED", "UMRED", "WADSA", "WANI", "WARDHA", "WARUD", "WASHIM",
        "YAVATMAL", "ZARI JAMNI"];

    $scope.filteredBranches = [];

    $scope.showDropdown = function () {
        document.getElementById("branch-dropdown").style.display = "block";
        $scope.filterBranches();
    };

    $scope.hideDropdown = function () {
        setTimeout(function () {
            document.getElementById("branch-dropdown").style.display = "none";
        }, 200);
    };

    $scope.filterBranches = function () {
        $scope.filteredBranches = $scope.branches.filter(function (branch) {
            return branch.toLowerCase().includes($scope.selectedBranch.toLowerCase());
        });
    };

    $scope.selectBranch = function (branch) {
        $scope.selectedBranch = branch;
        document.getElementById("branch-dropdown").style.display = "none";
    };


    $scope.signinPage = function () {
        $scope.signInPage = true;
        $scope.signUpPage = false;
        $scope.resetPage = false;
    };

    $scope.signupPage = function () {
        $scope.signUpPage = true;
        $scope.signInPage = false;
        $scope.resetPage = false;
    };

    $scope.resetPg = function () {
        $scope.resetPage = true;
        $scope.signUpPage = false;
        $scope.signInPage = false;
    };

    $scope.login = function () {

        ///

        var URL = "user/login/" + $scope.branchCode + "/" + $scope.password;
        $http.get($scope.uRl + URL)
                .then(function (response) {
                    var userRecord = response.data;
//                                        alert(userRecord.password);
//                                        alert(userRecord.branchCode);
//                                        alert($scope.branchCode);
//                                        alert($scope.password);
//                                        alert(userRecord.branchCode === $scope.branchCode);
//                                        alert(userRecord.password === $scope.password);
                    if (userRecord.branchCode === $scope.branchCode && userRecord.password === $scope.password) {

                        if (userRecord.userIdStatus === "Accept") {

                            if (userRecord.branchCode === "Admin") {
                                //Admin 
                                window.location.href = $scope.uRl + "mis_adminDashboard.html";
                                localStorage.setItem("user", JSON.stringify(userRecord));
                                alert("Account Successfully Login.");
                            } else {
                                //User
                                window.location.href = $scope.uRl + "mis_userDashboard.html";
                                localStorage.setItem("user", JSON.stringify(userRecord));
                                alert("Account Successfully Login.");
                            }

                        } else if (userRecord.userIdStatus === "Pending") {
                            alert("User is not Activated by Super user yet!");
                            location.reload();
                            $scope.onShowLoginPage();
                        } else if (userRecord.userIdStatus === "Reject") {
                            alert("Please, check the username & password !");
                            location.reload();
                            $scope.onShowLoginPage();
                        } else if (userRecord.userIdStatus === "Terminate") {
                            alert("Please, check the username & password !");
                            location.reload();
                            $scope.onShowLoginPage();
                        } else if (userRecord.userIdStatus === "Reset_Password") {
                            alert("User is not Activated by Super user yet!");
                            location.reload();
                            $scope.onShowLoginPage();
                        }

                    } else {
                        alert("Please, check the username & password !");
                        location.reload();
                        $scope.onShowLoginPage();
                    }
                }, function (error) {
                    console.log(error);
                });

        ///
    };

    $scope.signup = function () {
        if ($scope.password === $scope.confirmPassword) {
            debugger;

            var Url = "user/getuserDetails/" + $scope.branchCode + "/" + $scope.selectedBranch;
            $http.get($scope.uRl + Url)
                    .then(function (response) {
                        debugger;

                        $scope.resData = response.data;
                        if ($scope.resData.branchCode === $scope.branchCode) {
                            alert("Already have a Account for this Branch Code.");
                            location.reload();
                        } else if ($scope.resData.branchName === $scope.selectedBranch) {
                            alert("Already have a Account for this Branch Name.");
                            location.reload();
                        } else {

                            $scope.registrationData = {
                                branchCode: $scope.branchCode,
                                branchName: $scope.selectedBranch,
                                password: $scope.password,
                                userIdStatus: "Pending"
                            };

                            var URL = "/user/save";

                            $http.post($scope.uRl + URL, $scope.registrationData)
                                    .then(function (response) {
                                        alert("Registration Successful.");
                                        location.reload();
                                    }, function (error) {
                                        console.log(error);
                                    });
                        }

                    },
                            function (error) {
                                console.error(error);
                            });
        } else {
            alert("Password and Confirm Password should be match.");
        }
    };


    $scope.reset = function () {
        if ($scope.password === $scope.confirmPassword) {
            debugger;

            var Url = "user/getuserDetails/" + $scope.branchCode;
            $http.get($scope.uRl + Url)
                    .then(function (response) {
                        debugger;

                        $scope.resData = response.data;
                        if ($scope.resData.branchCode === $scope.branchCode) {

                            $scope.registrationData = {
                                branchCode: $scope.branchCode,
                                branchName: $scope.resData.branchName,
                                password: $scope.password,
                                userIdStatus: "Pending"
                            };

                            var URL = "/user/update/" + $scope.resData.id;

                            $http.put($scope.uRl + URL, $scope.registrationData)
                                    .then(function (response) {
                                        alert("Password Reset Successful.");
                                        location.reload();
                                    }, function (error) {
                                        console.log(error);
                                    });
                        } else {
                            alert("Branch Code Dose not Exist !");
                            location.reload();
                        }

                    },
                            function (error) {
                                console.error(error);
                            });
        } else {
            alert("Password and Confirm Password should be match.");
        }
    };


});

