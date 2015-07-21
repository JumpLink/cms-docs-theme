jumplink.cms.controller('DocsOverviewController', function($scope, controllers, $state, $log, HistoryService) {
  var page = $state.current.name;
  $scope.controllers = controllers;
  $log.debug(controllers);
  $scope.goTo = HistoryService.goToHashPosition;

});