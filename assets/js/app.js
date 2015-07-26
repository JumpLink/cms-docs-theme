// window.saveAs
// Shims the saveAs method, using saveBlob in IE10.
// And for when Chrome and FireFox get round to implementing saveAs we have their vendor prefixes ready.
// But otherwise this creates a object URL resource and opens it on an anchor tag which contains the "download" attribute (Chrome)
// ... or opens it in a new tab (FireFox)
// @author Andrew Dodson
// @copyright MIT, BSD. Free to clone, modify and distribute for commercial and personal use.
// https://gist.github.com/MrSwitch/3552985

window.saveAs || ( window.saveAs = (window.navigator.msSaveBlob ? function(b,n){ return window.navigator.msSaveBlob(b,n); } : false) || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs || (function(){
  // URL's
  window.URL || (window.URL = window.webkitURL);
  if(!window.URL){
    return false;
  }
  return function(blob,name){
    var url = URL.createObjectURL(blob);
    // Test for download link support
    if( "download" in document.createElement('a') ){
      var a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', name);
      // Create Click event
      var clickEvent = document.createEvent ("MouseEvent");
      clickEvent.initMouseEvent ("click", true, true, window, 0,
        event.screenX, event.screenY, event.clientX, event.clientY,
        event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
        0, null);
      // dispatch click event to simulate download
      a.dispatchEvent (clickEvent);
    }
    else{
      // fallover, open resource in new tab.
      window.open(url, '_blank', '');
    }
  };
})());

if (typeof jumplink === 'undefined') {
  var jumplink = {};
}

// Source: https://github.com/darius/requestAnimationFrame
// Adapted from https://gist.github.com/paulirish/1579671 which derived from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

jumplink.cms = angular.module('jumplink.cms', [
  'ui.router'                 // AngularUI Router: https://github.com/angular-ui/ui-router
  , 'ngAnimate'               // ngAnimate: https://docs.angularjs.org/api/ngAnimate
  , 'ngSanitize'              // ngSanitize: https://docs.angularjs.org/api/ngSanitize
  , 'sails.io'                // angularSails: https://github.com/balderdashy/angularSails
  // , 'webodf'                  // custom module
  , 'FBAngular'               // angular-fullscreen: https://github.com/fabiobiondi/angular-fullscreen
  , 'mgcrea.ngStrap'          // AngularJS 1.2+ native directives for Bootstrap 3: http://mgcrea.github.io/angular-strap/
  // , 'angularMoment'           // Angular.JS directive and filters for Moment.JS: https://github.com/urish/angular-moment
  // , 'wu.masonry'              // A directive to use masonry with AngularJS: http://passy.github.io/angular-masonry/
  // , 'angular-carousel'        // An AngularJS carousel implementation optimised for mobile devices: https://github.com/revolunet/angular-carousel
  // , 'textAngular'             // A radically powerful Text-Editor/Wysiwyg editor for Angular.js: https://github.com/fraywing/textAngular
  // , 'angular-medium-editor'   // AngularJS directive for Medium.com editor clone: https://github.com/thijsw/angular-medium-editor
  // , 'ui.ace'                  // This directive allows you to add ACE editor elements: https://github.com/angular-ui/ui-ace
  // , 'leaflet-directive'       // AngularJS directive to embed an interact with maps managed by Leaflet library: https://github.com/tombatossals/angular-leaflet-directive
  , 'toaster'                 // AngularJS Toaster is a customized version of "toastr" non-blocking notification javascript library: https://github.com/jirikavi/AngularJS-Toaster
  // , 'angularFileUpload'       // Angular File Upload is a module for the AngularJS framework: https://github.com/nervgh/angular-file-upload
  , 'angular-filters'         // Useful filters for AngularJS: https://github.com/niemyjski/angular-filters
  // , 'ngDraggable'             // Drag and drop module for Angular JS: https://github.com/fatlinesofcode/ngDraggable
  , 'toggle-switch'           // AngularJS Toggle Switch: https://github.com/JumpLink/angular-toggle-switch
  , 'hljs'                    // AngularJS directive for syntax highlighting with highlight.js: https://github.com/pc035860/angular-highlightjs
]);

jumplink.cms.config( function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $logProvider) {

  // see init.jade environment variable
  $logProvider.debugEnabled(environment === 'development');

  // use the HTML5 History API
  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/start');

  $stateProvider
  // LAYOUT
  .state('layout', {
    abstract: true
    , templateUrl: "layout"
    , controller: 'LayoutController'
  })
  // Getting started 
  .state('layout.start', {
    url: '/start'
    , resolve:{
      start: function(MarkdownService) {
        return MarkdownService.resolve('GettingStarted.md');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    }
    , views: {
      'content' : {
        templateUrl: 'start/index'
        , controller: 'DocsStartController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
      , 'footer' : {
        templateUrl: 'footer'
        , controller: 'FooterController'
      }
    }
  })
  // backend
  .state('layout.backend', {
    url: '/backend'
    , resolve:{
      docs: function(DocsService) {
        return DocsService.resolve('all');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    }
    , views: {
      'content' : {
        templateUrl: 'backend/index'
        , controller: 'DocsBackendController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
      , 'footer' : {
        templateUrl: 'footer'
        , controller: 'FooterController'
      }
    }
  })
  // administration
  .state('layout.administration', {
    url: '/admin'
    , resolve:{
      themeSettings: function($sailsSocket, $log) {
        return $sailsSocket.get('/theme/find').then (function (data) {
          // $log.log(data);
          return data.data;
        }, function error (resp){
          $log.error(resp);
        });
      }
    }
    , views: {
      'content' : {
        templateUrl: 'administration/settings'
        , controller: 'AdminController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
    }
  })
  .state('layout.users', {
    url: '/users'
    , resolve:{
      users: function($sailsSocket, $log) {
        return $sailsSocket.get('/user').then (function (data) {
          return data.data;
        }, function error (resp){
          $log.error(resp);
        });
      }
    }
    , views: {
      'content' : {
        templateUrl: 'administration/users'
        , controller: 'UsersController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
    }
  })
  .state('layout.user', {
    url: '/user/:index'
    , resolve:{
      user: function($sailsSocket, $stateParams, $log) {
        return $sailsSocket.get('/user'+'/'+$stateParams.index).then (function (data) {
          delete data.data.password;
          return data.data;
        }, function error (resp){
          $log.error(resp);
        });
      }
    }
    , views: {
      'content' : {
        templateUrl: 'administration/user'
        , controller: 'UserController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
    }
  })
  .state('layout.new-user', {
    url: '/new/user'
    , resolve:{
      user: function() {
        return {

        };
      }
    }
    , views: {
      'content' : {
        templateUrl: 'administration/user'
        , controller: 'UserController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
    }
  })
  // cms
  .state('layout.cms', {
    url: '/cms'
    , resolve:{
      info: function(CmsService, $log) {
        $log.debug("start get cms info");
        return CmsService.infoUser();
      },
    }
    , views: {
      'content' : {
        templateUrl: 'cms/content'
        , controller: 'CmsController'
      }
      , 'toolbar' : {
        templateUrl: 'toolbar'
        , controller: 'ToolbarController'
      }
      , 'footer' : {
        templateUrl: 'footer'
        , controller: 'FooterController'
      }
    }
  })
  ;
});
