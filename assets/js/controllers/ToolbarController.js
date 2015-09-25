jumplink.cms.controller('ToolbarController', function($scope, routes) {
  $scope.routes = routes;
  $scope.title = "JumpLink CMS Documentation";
  $scope.shorttitle = "Docs";
  $scope.position = "fixed-top";
  $scope.fluid = false;
});