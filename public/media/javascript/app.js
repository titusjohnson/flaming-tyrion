// Create our master object. All our items are stored in here.
var App = {};				// Master object
App.ViewModels = {};        // KO View Models
App.ViewModels.MasterViewModel = function() {
    var self = this;

    // These are meant to be changed by child view models
    self.Template = ko.observable("home");
    self.PageTitle = ko.observable("Deployd Kickstart");
    self.TemplateViewModel = ko.observable("");
    self.Alpha = "Wrong View Model";

    // Update the page title manually since it's outside of the area that this VM is bound to
    self.PageTitle.subscribe(function(value){
    	$("title", "head").html(value);
    });

    return self;
}
App.ViewModels.Docs = function(url_values, state) {
    var self = this;

	state.PageTitle("Docs");

    return self;
};
App.ViewModels.Home = function(url_values, state) {
    var self = this;

    state.PageTitle("Home");
    state.Template("home");

    return self;
}
// source: http://stackoverflow.com/questions/6268679/best-way-to-get-the-key-of-a-key-value-javascript-object
if(!Object.keys) Object.keys = function(o){
     if (o !== Object(o))
          throw new TypeError('Object.keys called on non-object');
     var ret=[],p;
     for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
     return ret;
}

// source: http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
// modified return to just pass object
function returnObjectByName(objectName, context, args) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    var namespaces = objectName.split(".");
    var func = namespaces.pop();

    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }

    return context[func].apply(this, args);
}
$(function(){
    // Initialize the master View Model.
    App.State = new App.ViewModels.MasterViewModel();
    ko.applyBindings(App.State, document.getElementById("App"));

    // Routes table 
    // This is a route => method name relationship
    // 
    // See Finch.js documentation for more about how you can use the router.
    // http://stoodder.github.io/finchjs/
    App.Routes = {
        "": "Home",
        "docs": "Docs",
        "docs/:document": "ViewDoc"
    };

    // Register each table item as a route to watch
    $.each(App.Routes, function(key, value) {
        Finch.route(key, function(bindings) {
            // When a route is called init a new sub-VM in our dedicated observable
            App.State.TemplateViewModel(new returnObjectByName("App.ViewModels."+value, window, bindings, App.State), document.getElementById("PageTemplate"));
            // Set the default template after the sub-VM is loaded, which renders the page
            App.State.Template(value.toLowerCase());
        });
    });

    // Start the application
    Finch.listen();
});