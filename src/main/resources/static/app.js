var app = angular.module('documentApp', []);

app.controller('DocumentController', function($scope, $http) {
    $scope.document = {};

    $scope.uploadDocument = function() {
        var formData = new FormData();
        formData.append('name', $scope.document.name);
        formData.append('date', $scope.document.date);
        formData.append('file', $scope.file);

        $http.post('/api/documents/upload', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function(response) {
            // Handle success
            console.log(response.data);
            // Reload documents
            $scope.getUploadedDocuments();
        }, function(error) {
            // Handle error
            console.log(error);
        });
    };

    $scope.getUploadedDocuments = function() {
        $http.get('/api/documents').then(function(response) {
            $scope.documents = response.data;
        }, function(error) {
            console.log(error);
        });
    };

    $scope.viewDocument = function(id) {
        // Implement view document functionality
    };

    $scope.getFileDetails = function(element) {
        $scope.file = element.files[0];
    };

    // Initial load of uploaded documents
    $scope.getUploadedDocuments();
});
