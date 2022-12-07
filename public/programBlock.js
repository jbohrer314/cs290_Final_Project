(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['programBlock'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"quarter\" id=\"quarter\" checked>\r\n        <label for=\"quarter\">Quarter</label>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"quarter\" id=\"quarter\">\r\n        <label for=\"quarter\">Quarter</label>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"eight\" id=\"eight\" checked>\r\n        <label for=\"eight\">Eighth</label>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"eight\" id=\"eight\">\r\n        <label for=\"eight\">Eighth</label>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"sixteen\" id=\"sixteen\" checked>\r\n        <label for=\"sixteen\">Sixteenth</label>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"sixteen\" id=\"sixteen\">\r\n        <label for=\"sixteen\">Sixteenth</label>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"triplet\" id=\"triplet\" checked>\r\n        <label for=\"triplet\">Triplet</label>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "        <input type=\"checkbox\" name=\"triplet\" id=\"triplet\">\r\n        <label for=\"triplet\">Triplet</label>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"program-block-icon program-list-container\">\r\n    <div class=\"program-block-item-wrapper\">\r\n        <label for=\"tempo\">Tempo</label>\r\n        <input type=\"number\" name=\"tempo\" id=\"tempo\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"tempo") || (depth0 != null ? lookupProperty(depth0,"tempo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tempo","hash":{},"data":data,"loc":{"start":{"line":4,"column":60},"end":{"line":4,"column":69}}}) : helper)))
    + "\">\r\n    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n        <label for=\"counts\">Counts</label>\r\n        <input type=\"number\" name=\"counts\" id=\"counts\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"counts") || (depth0 != null ? lookupProperty(depth0,"counts") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"counts","hash":{},"data":data,"loc":{"start":{"line":9,"column":62},"end":{"line":9,"column":72}}}) : helper)))
    + "\">\r\n    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"quarter") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"eight") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":23,"column":8},"end":{"line":29,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sixteen") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":33,"column":8},"end":{"line":39,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"triplet") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":43,"column":8},"end":{"line":49,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n\r\n    <div class=\"program-block-item-wrapper\">\r\n        <button class=\"delete-block-button\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":53,"column":48},"end":{"line":53,"column":58}}}) : helper)))
    + "\">X</button>\r\n    </div>\r\n\r\n</div>";
},"useData":true});
})();