docs.service('DocsService', function ($rootScope, $log, $sailsSocket, $filter, UtilityService) {

  var resolve = function(name, cb, next) {
    var errors = [
      "[DocsService:resolve] Error: On trying to resolve with name: "+name
    ];

    var url = '/docs/'+name;

    return $sailsSocket.get(url).then (function (data) {
      if(angular.isUndefined(data) || angular.isUndefined(data.data)) {
        return null;
      } else {
        if(next) data.data = next(data.data);
        if(cb) cb(null, data.data);
        else return data.data;
      }
    }, function error (resp){
      $log.error(errors[0], resp);
      if(cb) cb(errors[0], {});
      else return {};
    });
  };

  return {
    resolve: resolve,
  };
});