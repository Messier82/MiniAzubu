/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $("#loginbutton").click(function () {
        chrome.storage.sync.set({"username": $("#username").val()});
        location.href = "./main.html";
    });
    $(".side-nav a").click(function () {
        $(".button-collapse").sideNav("hide");
    });
});

var mainModule = angular.module('MiniAzubu', ["ngRoute"]);

mainModule.config(function ($routeProvider, $locationProvider) {
    $routeProvider
            .when("/", {
                redirectTo: "/following"
            })
            .when("/following", {
                templateUrl: "./views/following.html",
                controller: "FollowingController"
            })
            .when("/settings", {
                templateUrl: "./views/settings.html",
                controller: "SettingsController"
            });
//    $locationProvider.html5Mode(true);
});