import _ from 'lodash';
import flatten from '../../app/core/utils/flatten';
import TableModel from '../../app/core/table_model';
import angular from 'angular';

import {calculations} from './calculations';

//get value of op in the data results
function valueOf(data, op){

  for (let i = 0; i < data.length; i++){
    if(data[i].target === op.name){
      if(data[i].datapoints[0]){
        return data[i].datapoints[0][0];
      }else{
        return null;
      }
    }
  }

}

const modelDefaults = {
  toShow: 0,
  asInteger: 0,
  original: 0.0,
  asFloat: 0.0
};

var transformers = {};

transformers['percentile'] = {
  description: 'Percentile',

  transform: function(data, panel, model){
    //get op1's value from data
    let op1Value = valueOf(data, panel.op1);

    //get op2's value from data
    let op2Value = valueOf(data, panel.op2);

    if(op1Value && op2Value){
      // calculate the value
      model.original = calculations[panel.calculation].asFloat(op1Value, op2Value);
      if(panel.style.digits === 0){
        model.toShow = parseInt(model.original * 100);
      } else {
        model.toShow = parseFloat(model.original * 100).toFixed(panel.style.digits);
      }
      model.toShow = model.toShow + '%';
      model.asInteger = parseFloat(model.original * 100).toFixed();
      model.asFloat = model.original * 100;
    } else {
      model.toShow = '0';
    }
  }
};

transformers['none'] = {
  description: 'None',
  
  transform: function(data, panel, model){
    let op1Value = valueOf(data, panel.op1);
    let op2Value = valueOf(data, panel.op2);

    if(op1Value && op2Value){
      model.original = calculations[panel.calculation].asFloat(op1Value, op2Value);
      if(panel.style.digits === 0){
        model.toShow = model.original;
      } else {
        model.toShow = parseFloat(model.original).toFixed(panel.style.digits);
      }
      model.asInteger = parseFloat(model.original).toFixed();
      model.asFloat = model.original;
    }
  }
};

function transformation(data, panel){

  //the default model
  let model = {};

  _.defaults(model, modelDefaults);

  if(!data || data.length === 0){
    return model;
  }

  var transformer = transformers[panel.transformation];
  if(!transformer){
    throw {message: 'Transformer ' + panel.transformation + ' not found'};
  }

  transformer.transform(data, panel, model);
  return model;
}

export {transformers, transformation}
