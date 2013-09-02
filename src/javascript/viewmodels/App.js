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