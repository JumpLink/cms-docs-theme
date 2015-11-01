docs.controller('DocsTutorialController', function($scope, tutorial, $state, $log, HistoryService) {
  var page = $state.current.name;
  $scope.tutorial = tutorial;
  $scope.goTo = HistoryService.goToHashPosition;
});