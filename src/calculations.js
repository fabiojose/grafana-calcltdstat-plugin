import {conditions} from './conditions';

var calculations = {};

calculations['division'] = {
  description: 'Division',
  operator: '/',
  asFloat: function(op1, op2){
      return parseFloat(op1) / parseFloat(op2);
  },

  asInteger: function(op1, op2){
    return parseInt(parseFloat(op1) / parseFloat(op2), 10);
  }
};

calculations['multiplication'] = {
  description: 'Multiplication',
  operator: '*',
  asFloat: function(op1, op2){
      return parseFloat(op1) * parseFloat(op2);
  },

  asInteger: function(op1, op2){
    return parseInt(parseFloat(op1) * parseFloat(op2), 10);
  }
};

calculations['addition'] = {
  description: 'Addition',
  operator: '+',
  asFloat: function(op1, op2){
      return parseFloat(op1) + parseFloat(op2);
  },

  asInteger: function(op1, op2){
    return parseInt(parseFloat(op1) + parseFloat(op2), 10);
  }
};

calculations['subtraction'] = {
  description: 'Subtraction',
  operator: '-',
  asFloat: function(op1, op2){
      return parseFloat(op1) - parseFloat(op2);
  },

  asInteger: function(op1, op2){
    return parseInt(parseFloat(op1) - parseFloat(op2), 10);
  }
};

export {calculations}
