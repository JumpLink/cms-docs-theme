jumplink.cms.controller('DocsBackendController', function($scope, docs, $state, $log, HistoryService) {
  var page = $state.current.name;

  $scope.docs = docs;

  // $log.debug("[DocsOverviewController:docs]", $scope.docs);
  $scope.goTo = HistoryService.goToHashPosition;

});