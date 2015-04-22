angular.module('cordovaApp.controllers', [])

.controller('AppController', function ($scope, $ionicActionSheet, $timeout) {
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

.controller('CameraController', function ($scope, Camera) {
    $scope.getPhoto = function () {
        console.log('Getting camera');

        Camera.getPicture({
            quality: 75,
            targetWidth: 640,
            targetHeight: 800,
            saveToPhotoAlbum: false
        }).then(function (imageURI) {
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
        }, function (err) {
            console.err(err);
        });
    };
})

.controller('AccelerometerController', function ($scope, Accelerometer) {
    $scope.start = true;
    $scope.watchID = 0;

    $scope.getCurrent = function () {
        console.log('Getting current acceleration');

        Accelerometer.getCurrentAcceleration().then(function (acceleration) {
            var accelerationFormatted =
                'Acceleration X: ' + acceleration.x + '\n' +
                'Acceleration Y: ' + acceleration.y + '\n' +
                'Acceleration Z: ' + acceleration.z + '\n' +
                'Timestamp: ' + acceleration.timestamp + '\n'

            console.log(accelerationFormatted);
            $scope.acceleration = acceleration;
        }, function (err) {
            console.err(err);
        });
    };

    $scope.watch = function () {
        console.log('Starting watching acceleration');

        $scope.start = false;

        $scope.watchID = navigator.accelerometer.watchAcceleration(function (acceleration) {
            // create a new javascript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds
            var date = new Date(acceleration.timestamp * 1000);
            // hours part from the timestamp
            var hours = date.getHours();
            // minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(minutes.length - 2) + ':' + seconds.substr(seconds.length - 2);

            console.log('Acceleration updated at ' + formattedTime);

            $scope.acceleration = acceleration;
            $scope.$apply();
        }, function (err) {
            console.err(err);
        }, { frequency: 500 });
    };

    $scope.stopWatching = function () {
        console.log('Stopping watching acceleration');

        navigator.accelerometer.clearWatch($scope.watchID);
        $scope.start = true;

        console.log('Stopped watching acceleration');
    };    
})

.controller('BatteryController', function ($scope, $ionicPopup) {
    $scope.items = [];

    function onBatteryStatus(info) {
        // Handle the online event
        console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);

        $scope.items.push("Level: " + info.level + " isPlugged: " + info.isPlugged);
        $scope.$apply();

        window.scrollTo(0, document.body.scrollHeight);
    }

    function onBatteryCritical(info) {
        // Handle the battery critical event
        console.log("Battery Level Critical " + info.level + "%\nRecharge Soon!");

        var alertPopup = $ionicPopup.alert({
            title: 'Battery Level Critical',
            template: 'Plug in the charger ASAP!'
        });
    }

    function onBatteryLow(info) {
        // Handle the battery low event
        console.log("Battery Level Low " + info.level + "%");

        var alertPopup = $ionicPopup.alert({
            title: 'Battery Level Low',
            template: 'Consider charging your phone'
        });
    }

    window.addEventListener("batterystatus", onBatteryStatus, false);
    window.addEventListener("batterycritical", onBatteryCritical, false);
    window.addEventListener("batterylow", onBatteryLow, false);
})

.controller('ContactsController', function ($scope, $ionicModal) {
    // Form data for the contact modal
    $scope.contactData = {};
    $scope.searchFilter = {};

    // Create the contact modal that we will use later
    $ionicModal.fromTemplateUrl('templates/createContactModal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the contact modal to close it
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    // Open the contact creation modal
    $scope.create = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.createContact = function () {
        console.log('Creating contact', $scope.contactData);

        // create the contact
        var newContact = navigator.contacts.create({ "displayName": $scope.contactData.displayName });

        // store contact phone numbers in ContactField[]
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', $scope.contactData.mobile, true); // preferred number
        newContact.phoneNumbers = phoneNumbers;

        // save the contact
        newContact.save();

        console.log('Finished creating contact!');

        // close the modal
        $scope.closeModal();
    };

    $scope.searchContacts = function () {
        console.log('Searching contacts by name' + $scope.searchFilter.name);

        $scope.foundContacts = [];

        var options = new ContactFindOptions();

        options.filter = $scope.searchFilter.name;
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers];

        var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];

        navigator.contacts.find(fields, function (contacts) {
            $scope.foundContacts = contacts;
            console.log('Found ' + contacts.length + ' contacts.');
        }, function (contactError) {
            console.log('Error!', contactError);
        }, options);
    };   
});