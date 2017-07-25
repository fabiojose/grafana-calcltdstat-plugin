import _ from 'lodash';
import angular from 'angular';

import {sizes} from './renderer';
import {colors} from './renderer';
import {calculations} from './calculations';
import {transformers} from './transformers';

export class CalcltdStatEditorCtrl {

  constructor($scope, $q, $injector, uiSegmentSrv){
    $scope.editor = this;

    this.$q = $q;
    this.uiSegmentSrv = uiSegmentSrv;

    this.panelCtrl= $scope.ctrl;
    this.panel = this.panelCtrl.panel;
    this.addColumnSegment = this.uiSegmentSrv.newPlusButton();

    this._columns = null;

    this._sizes = sizes;
    this._colors = colors;
    this._calculations = calculations;
    this._transformers = transformers;
  }

  set sizes(s){
    this._sizes = s;
  }

  get sizes(){
    return this._sizes;
  }

  set colors(c){
    this._colors = c;
  }

  get colors(){
    return this._colors;
  }

  set calculations(c){
    this._calculations = calculations;
  }

  get calculations(){
    return this._calculations;
  }

  set transformers(t){
    this._transformers = t;
  }

  get transformers(){
    return this._transformers;
  }

  render(){
    this.panelCtrl.render();
  }
}

export function calcltdStatEditor($q, uiSegmentSrv){

  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'public/plugins/calcltdstat-panel/editor.html',
    controller: CalcltdStatEditorCtrl,
  };
}
