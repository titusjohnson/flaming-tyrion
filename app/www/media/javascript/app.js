// Create our master object. All our items are stored in here.
var App = {};				// Master object
App.ViewModels = {};        // KO View Models
App.ViewModels.MasterViewModel = function() {
    var self = this;

    // These are meant to be changed by child view models
    self.PageTitle = ko.observable("Deployd Kickstart");

    // Constants. The Player object contains the game state, history of actions
    // everything that we need to construct a scene.
    // @todo: Load a JSON object from local storage to restore where the user is at.
    self.Player = new Player();

    // The Scene is a self-contained interactive page. Each scene will read and write
    // state information into the Player object. Items in each Scene should be set to
    // react to the existance or non-existance of whatever Player attributes it requires
    // to continue.
    self.Scene = ko.osbservable(new Player.CurrentScene());

    // Update the page title manually since it's outside of the area that this VM is bound to
    self.PageTitle.subscribe(function(value){
    	$("title", "head").html(value);
    });

    return self;
}
var Hedgehog = function(state, player) {
	var self = this;


	return self;
}
App.ViewModels.Home = function(url_values, state) {
    var self = this;

    state.PageTitle("Home");
    state.Template("home");

    return self;
}
Player = function(state) {
    var self = this;

    self.mood = "Happy";

	self.Inventory = ko.observable(new Inventory(state));
	
	self.Inventory.Items.push(new Hedgehog(state, self))

    return self;
};
Inventory = function(state) {
	var self = this;
	self.items = ko.observableArray([]);


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