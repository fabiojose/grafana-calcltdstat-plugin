import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import {calcltdStatEditor} from './editor';
import {Renderer} from './renderer';
import {transformation} from './transformers';

//Temporary
import $ from 'jquery';

const panelDefaults = {

  calculation: 'division',
  transformation: 'percentile',
  style:{
    size: 'default',
    color: 'default',
    showCircle: true,
    digits: 0
  },
  op1: {
    name: 'Partial',
    type: 'metric',
    defaultValue: 0
  },
  op2: {
    name: 'Total',
    type: 'metric',
    defaultValue: 1
  }

};

export class CalcltdStatCtrl extends MetricsPanelCtrl {

  constructor($scope, $injector, variableSrv) {
    super($scope, $injector);
    _.defaults(this.panel, panelDefaults);

    this._dataRaw = null;
    this._value = 0;

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));

  }

  get dataRaw(){
    return this._dataRaw;
  }

  set dataRaw(raw){
    this._dataRaw = raw;
  }

  get value(){
    return this._value;
  }

  set value(v){
    this._value = v;
  }

  onInitEditMode() {
    this.addEditorTab('Options', calcltdStatEditor, 2);
  }

  onDataReceived(dataList) {
    this._dataRaw = dataList;

    this.render();
  }

  onDataError(err){
    this._dataRaw = [];
    this.render();
  }

  toggleSort(column, columnIndex){

  }

  render(){
    this._value = transformation(this._dataRaw, this.panel);
    super.render(this._value);
  }

  link(scope, elem, attrs, ctrl){

    var data;
    var ctrl = ctrl;
    var panel = ctrl.panel;
    var pageCount = 0;

    function renderPanel() {

      let renderer = new Renderer(panel, data, ctrl.$sanitize, ctrl.dashboard);
      let html = renderer.render();

      //console.log(html);

      let roote = elem.find('.singlestat-panel-value');
      roote.empty();
      roote.html(html);

    }

    ctrl.events.on('render', function(renderData){
      data = renderData || data;

      if(data){
        renderPanel();
      }

      ctrl.renderingCompleted();
    });
  }
}

CalcltdStatCtrl.templateUrl = 'module.html';
