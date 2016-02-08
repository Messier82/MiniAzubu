mainModule.controller("FollowingController", function ($scope, $http, Page) {
    $scope.Channels = {
        online: [],
        offline: []
    };
    Page.setTitle("Following");
    Page.showPreloader();
    $scope.settings = Page.Settings;
//    console.log("http://api.azubu.tv/public/modules/user/"+ Page.Username +"/followings/list");
    $http.get("http://api.azubu.tv/public/modules/user/"+ Page.Username +"/followings/list").then(function (response) {
        var channels = response.data.data;
        console.log(channels);
        channels.forEach(function (channel) {
            if (channel.is_live) {
                $scope.Channels.online.push(channel);
            } else {
                $scope.Channels.offline.push(channel);
            }
            Page.hidePreloader();
            trimNames();
        });
    });
    $scope.open = function (username) {
        var win = window.open("http://azubu.tv/" + username, '_blank');
        win.focus();
    };
});