jumplink.cms.controller('DocsOverviewController', function($scope, available, controllers, models, services, responses, $state, $log, HistoryService) {
  var page = $state.current.name;

  $scope.availableDocs = available;
  $scope.docs = {
    'controllers': controllers,
    'models': models,
    'services': services,
    'responses': responses
  }

  $log.debug($scope.availableDocs, $scope.docs);
  $scope.goTo = HistoryService.goToHashPosition;

});