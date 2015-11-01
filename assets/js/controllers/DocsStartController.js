docs.controller('DocsStartController', function($scope, start, $state, $log, HistoryService) {
  var page = $state.current.name;

  $scope.start = start;

  // $log.debug("[DocsOverviewController:docs]", $scope.docs);
  $scope.goTo = HistoryService.goToHashPosition;

});