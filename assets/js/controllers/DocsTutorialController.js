docs.controller('DocsTutorialController', function($scope, tutorial, $state, $log, HistoryService) {
  var page = $state.current.name;

  $scope.tutorial = tutorial;
  $log.debug($scope.tutorial);

  // $log.debug("[DocsOverviewController:docs]", $scope.docs);
  $scope.goTo = HistoryService.goToHashPosition;

});