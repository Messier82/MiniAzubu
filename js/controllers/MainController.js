mainModule.factory("Page", function () {
    var title = "";
    var username;
    var settings = {};
    return {
        Settings: settings,
        Username: username,
        setUsername: function(newUsername) {
            this.Username = newUsername;
        },
        Title: title,
        setTitle: function (newTitle) {
            this.Title = newTitle;
        },
        showPreloader: function () {
            $("#mainProgress").show();
        },
        hidePreloader: function () {
            $("#mainProgress").hide();
        },
        logout: function() {
            chrome.storage.sync.set({"username": null});
            location.href = "./login.html";
        }
    };
});

mainModule.controller("MainController", ["$scope", "Page", function ($scope, Page) {
        $scope.Page = Page;
        chrome.storage.sync.get("username", function (value) {
            if (!value.username) {
                location.href = "./login.html";
                return;
            }
            Page.setUsername(value.username);
            chrome.storage.sync.get("settings", function(value){
                Page.Settings = value.settings;
            });
        });
    }]);