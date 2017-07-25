
var templateDefaults = {
  type: 'link',
  text: null,
  selector: '/.*/',
  metadata: {
    link: 'http://grafana.com',
    queries: [
      {
        field: 'field_name',
        value: {
          source: 'literal',
          get: null,
          default: ''
        }
      }
    ]
  }
};

var templates = {};

templates['link'] = {
  description: "URL Link",

  metadata:{
    sources: {}
  }
};

templates['link'].metadata.sources['literal'] = {
  description: "Literal"
};

templates['link'].metadata.sources['column'] = {
  description: "Column"
}

export {templates, templateDefaults}

