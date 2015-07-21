jumplink.cms.service('UtilityService', function ($log) {
  var invertOrder = function (array) {
    var result = [];
    for (var i = array.length - 1; i >= 0; i--) {
      result.push(array[i]);
    };
    return result;
  }

  /*
   * find value by key in array
   */
  var findKeyValue = function (objects, key, value) {
    // $log.debug("findKeyValue", key, value);
    var index = -1;
    for (var i = objects.length - 1; i >= 0 && index <= -1; i--) {
      if(objects[i][key] === value) {
        index = i;
      } 
    };
    return index;
  }


  return {
    invertOrder: invertOrder,
    findKeyValue: findKeyValue
  };
});