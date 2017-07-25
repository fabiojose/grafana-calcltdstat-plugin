import kbn from 'app/core/utils/kbn';

import './css/styles.css!';
import './css/circle.css!'

export class Renderer {
  constructor(panel, model, sanitize, dashboard){
    this._panel = panel;
    this._model = model;
    this._sanitize = sanitize;
    this._dashboard = dashboard;

    this._formatters = [];

  }

  get panel() {
    return this._panel;
  }

  set panel(p){
    this._panel = p;
  }

  get model(){
    return this._model;
  }

  set model(m){
    this._model = m;
  }

  get dashboard(){
    return this._dashboard;
  }

  set dashboard(d){
    this._dashboard = d;
  }

  render(){
    //console.log(this._panel.style);

    let size = (this._panel.style.size === 'default' ? '' : this._panel.style.size);
    let color = (this._panel.style.color === 'default' ? '' : this._panel.style.color);

    let result = '<div class="' + (this._panel.style.showCircle ? 'c100 ' : '') + 'p' + this._model.asInteger + ' center ' + color + ' ' + size + ' dark" style="margin-top: 10%">';

    result += '<span>' + this._model.toShow + '</span>';

    if(this._panel.style.showCircle){
      result += '<div class="slice"><div class="bar"></div><div class="fill"></div></div>';
    }

    result += '</div>';

    return result;
  }
}

let sizes = {};
sizes['default'] = {
  description: 'Default',
  cssClass: ''
};

sizes['small'] = {
  description: 'Small',
  cssClass: 'small'
};

sizes['big'] = {
  description: 'Big',
  cssClass: 'big'
};

let colors = {};
colors['default'] = {
  description: 'Default',
  cssClass: ''
};

colors['red'] = {
  description: 'Red',
  cssClass: 'red'
};

colors['green'] = {
  description: 'Green',
  cssClass: 'green'
};

colors['white'] = {
  description: 'White',
  cssClass: 'white'
}

export {sizes, colors}
