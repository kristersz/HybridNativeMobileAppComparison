angular.module('cordovaApp.controllers', [])

.controller('AppController', function ($scope, $ionicModal, $ionicActionSheet, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    // Triggered on a button click, or some other target
    $scope.showDetails = function () {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: 'Camera' },
              { text: 'Attachment' },
              { text: 'Voice recording' },
              { text: 'Text note' }
            ],
            titleText: 'Add new note',
            cancelText: 'Cancel',
            cancel: function () {
                return true;
            },
            buttonClicked: function (index) {
                return true;
            }
        });
    };
})

.controller('NotebooksController', function ($scope) {
    $scope.notebooks = [
      { title: 'Reggae', id: 1 },
      { title: 'Chill', id: 2 },
      { title: 'Dubstep', id: 3 },
      { title: 'Indie', id: 4 },
      { title: 'Rap', id: 5 },
      { title: 'Cowbell', id: 6 }
    ];
})

.controller('NotebookController', function ($scope, $stateParams) {
    $scope.notebookTitle = 'My Notebook'
    $scope.notes = [
      { title: 'New note', id: 1, description: 'Hello world', timestamp: new Date() },
      { title: 'Old note', id: 2, description: 'Hello world', timestamp: new Date() },
    ];
})

.controller('NoteController', function ($scope, $stateParams, Camera) {
    $scope.notebookTitle = 'My Notebook'
    $scope.note = {
        title: 'New note',
        id: 1,
        description: 'Hello world',
        timestamp: new Date()
    };

    $scope.getPhoto = function () {
        console.log('Getting camera');
        Camera.getPicture({
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        }).then(function (imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function (err) {
            console.err(err);
        });
    };
});