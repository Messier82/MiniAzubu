mainModule.factory("Page", function () {
    var title = "";
    var username;
    return {
        Username: username,
        Title: title,
        setTitle: function (newTitle) {
            this.Title = newTitle;
        },
        showPreloader: function () {
            $("#mainProgress").show();
        },
        hidePreloader: function () {
            $("#mainProgress").hide();
        }
    };
});

mainModule.controller("MainController", ["$scope", "Page", function ($scope, Page) {
        $scope.Page = Page;
        chrome.storage.sync.get("username", function (value) {
            if (!value) {
                location.href = "./login.html";
                return;
            }
            Page.Username = value;
        });
    }]);