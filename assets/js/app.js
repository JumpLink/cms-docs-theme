var docs = angular.module('jumplink.cms.docs-theme', [
  'ui.router',                // AngularUI Router: https://github.com/angular-ui/ui-router
  'ngAnimate',                // ngAnimate: https://docs.angularjs.org/api/ngAnimate
  'ngSanitize',               // ngSanitize: https://docs.angularjs.org/api/ngSanitize
  'sails.io',                 // angularSails: https://github.com/balderdashy/angularSails
  'FBAngular',                // angular-fullscreen: https://github.com/fabiobiondi/angular-fullscreen
  'mgcrea.ngStrap',           // AngularJS 1.2+ native directives for Bootstrap 3: http://mgcrea.github.io/angular-strap/
  'toaster',                  // AngularJS Toaster is a customized version of "toastr" non-blocking notification javascript library: https://github.com/jirikavi/AngularJS-Toaster
  'angular-filters',          // Useful filters for AngularJS: https://github.com/niemyjski/angular-filters
  'toggle-switch',            // AngularJS Toggle Switch: https://github.com/JumpLink/angular-toggle-switch
  'hljs',                     // AngularJS directive for syntax highlighting with highlight.js: https://github.com/pc035860/angular-highlightjs
  'jumplink.cms.history',     // https://github.com/JumpLink/cms-angular/blob/master/src/history/history.js
  'jumplink.cms.utilities',   // https://github.com/JumpLink/cms-angular/blob/master/src/utilities/utilities.js
  'jumplink.cms.info',        // https://github.com/JumpLink/cms-angular/blob/master/src/info/info.js
]);

docs.config( function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $logProvider) {

  // see init.jade environment variable
  $logProvider.debugEnabled(environment === 'development');

  // use the HTML5 History API
  $locationProvider.html5Mode(false);

  $urlRouterProvider.otherwise('/start');

  $stateProvider
  // LAYOUT
  .state('layout', {
    abstract: true,
    templateUrl: "layout",
    controller: 'LayoutController'
  })
  // Getting started 
  .state('layout.start', {
    url: '/start',
    resolve:{
      start: function(MarkdownService) {
        return MarkdownService.resolve('GettingStarted.md');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    },
    views: {
      'content' : {
        templateUrl: 'start/index',
        controller: 'DocsStartController'
      },
      'toolbar' : {
        templateUrl: 'toolbar',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: 'footer',
        controller: 'FooterController'
      }
    }
  })
  // Tutorial
  .state('layout.tutorial', {
    url: '/tutorial',
    resolve:{
      tutorial: function(MarkdownService) {
        return MarkdownService.resolve('Tutorial.md');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    },
    views: {
      'content' : {
        templateUrl: 'tutorial/index',
        controller: 'DocsTutorialController'
      },
      'toolbar' : {
        templateUrl: 'toolbar',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: 'footer',
        controller: 'FooterController'
      }
    }
  })
  // backend
  .state('layout.backend', {
    url: '/backend',
    resolve:{
      docs: function(DocsService) {
        return DocsService.resolve('all');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    },
    views: {
      'content' : {
        templateUrl: 'backend/index',
        controller: 'DocsBackendController'
      },
      'toolbar' : {
        templateUrl: 'toolbar',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: 'footer',
        controller: 'FooterController'
      }
    }
  })
  // angular
  .state('layout.angular', {
    url: '/angular',
    resolve:{
      docs: function(DocsService) {
        return DocsService.resolve('allAngular');
      },
      cms: function(CmsService, $log) {
        return CmsService.infoUser();
      },
    },
    views: {
      'content' : {
        templateUrl: 'angular/index',
        controller: 'DocsAngularController'
      },
      'toolbar' : {
        templateUrl: 'toolbar',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: 'footer',
        controller: 'FooterController'
      }
    }
  })
  // cms
  .state('layout.cms', {
    url: '/cms',
    resolve:{
      info: function(CmsService, $log) {
        $log.debug("start get cms info");
        return CmsService.infoUser();
      },
    },
    views: {
      'content' : {
        templateUrl: 'cms/content',
        controller: 'CmsController'
      },
      'toolbar' : {
        templateUrl: 'toolbar',
        controller: 'ToolbarController'
      },
      'footer' : {
        templateUrl: 'footer',
        controller: 'FooterController'
      }
    }
  })
  ;
});

docs.run(function ($rootScope, $state, $window, $log) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    $log.error("[config/routes.js] Error", error);
    $state.go('error.signin', {error: error});
  });
});