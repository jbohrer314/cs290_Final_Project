(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['programPlannerControls'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span class=\"program-info-container\">\r\n    <input type=\"text\" class=\"program-title-for-planner\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":64},"end":{"line":2,"column":72}}}) : helper)))
    + "\">\r\n    <div class=\"play-button program-control-button\">Play</div>\r\n    <div class=\"stop-button program-control-button\">Stop</div>\r\n    <div class=\"save-button program-control-button\">Save</div>\r\n    <div class=\"delete-button program-control-button\">Delete</div>\r\n</span>";
},"useData":true});
})();