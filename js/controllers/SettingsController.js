mainModule.controller("SettingsController", function ($scope, $http, Page) {
    $scope.settings = Page.Settings;
    
    $scope.$watch('settings.followings.showStreamTitles', function ()
    {
        Page.updateSettings($scope.settings);
    });
});