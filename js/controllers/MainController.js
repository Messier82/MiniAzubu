mainModule.factory("Page", function ($http) {
    var factory = {};
    var title = "";
    var username;
    var settings = {};

    factory.Settings = settings;
    factory.Username = username;
    factory.setUsername = function (newUsername) {
        this.Username = newUsername;
    };
    factory.Title = title;
    factory.setTitle = function (newTitle) {
        this.Title = newTitle;
    };
    factory.showPreloader = function () {
        $("#mainProgress").show();
    };
    factory.hidePreloader = function () {
        $("#mainProgress").hide();
    };
    factory.logout = function () {
        chrome.storage.sync.set({"username": null});
        location.href = "./login.html";
    };
    factory.setSettings = function (newSettings) {
        this.Settings = $.extend(this.Settings, newSettings);
        chrome.storage.sync.set("settings", newSettings);
    };
    factory.updateSettings = function (newSettings)
    {
        this.Settings = newSettings;
        chrome.storage.sync.set({settings: this.Settings});
//        var path = reference.split(".");
//        var object = this.Settings;
//        var setting = object[reference];
//        setting = newValue;
//        chrome.storage.sync.set({'settings.' + reference: newValue});
//        path.forEach(function (item, key) {
//            object = object[item];
//            if (key === path.length - 1)
//            {
//                object = newValue;
//            }
//        });
        
//        this.Settings = object;
//        chrome.storage.sync.set({settings: this.Settings});
    };
    factory.getSettingFromReference = function (reference)
    {
        var path = reference.split(".");
        var object = this.Settings;
        path.forEach(function (item) {
            if (object === undefined)
            {
                return;
            }
            object = object[item];
        });
        if (object === undefined)
        {
            return null;
        }
        return object;
    };
    factory.setUnexistedSettings = function (newSettings)
    {
        console.log(this.Settings);
        this.Settings = angular.extend({}, newSettings, this.Settings);
        console.log(this.Settings);
    };
    factory.loadDefaultSettings = function ()
    {
        $http.get('defSettingsVals.json')
                .then(function (response) {
                    factory.setUnexistedSettings(response.data);
                });
    };

    return factory;
});

mainModule.controller("MainController", ["$scope", "Page", "$http", function ($scope, Page, $http) {
        $scope.Page = Page;
        chrome.storage.sync.get("username", function (value) {
            if (!value.username) {
                location.href = "./login.html";
                return;
            }
            Page.setUsername(value.username);
        });
        chrome.storage.sync.get("settings", function (value) {
            Page.Settings = value.settings;
            console.log(value);
            Page.loadDefaultSettings();
        });
    }]);