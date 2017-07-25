import _ from 'lodash';

var conditions = {};

function contains(value, array){
  for(var i = 0; i < array.length; i++){
    if(array[i] === value){
      return true;
    }
  }

  return false;
}

conditions['==='] = {
  description: 'Equals',
  comparation: function(){ 
    return function(value1, value2){
      return value1 === value2;
    }
  }
};

conditions['!=='] = {
  description: 'Not equals',
  comparation: function(){
    return function(value1, value2){
      return value1 !== value2;
    }
  }
};

conditions['in'] = {
  description: 'In',
  comparation: function(){
    return function(value1, value2){
      var result = contains(value1, value2);
      return result;
    }
  }
};

conditions['not-in'] = {
  description: "Not in",
  comparation: function(){
    return function(value1, value2){
      return !contains(value1, value2);
    }
  }
};

export {conditions}
