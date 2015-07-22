jumplink.cms.controller('DocsOverviewController', function($scope, available, config, controllers, policies, services, adapters, models, hooks, blueprints, responses, views, $state, $log, HistoryService) {
  var page = $state.current.name;

  $scope.availableDocs = available;
  $scope.docs = {
    'config': config,
    'controllers': controllers,
    'policies': policies,
    'services': services,
    'adapters': adapters,
    'models': models,
    'hooks': hooks,
    'blueprints': blueprints,
    'responses': responses,
    'views': views
  }

  $log.debug("[DocsOverviewController:docs]", $scope.availableDocs, $scope.docs);
  $scope.goTo = HistoryService.goToHashPosition;

});