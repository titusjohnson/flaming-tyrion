App.ViewModels.Play = function(url_values, state) {
    var self = this;

    // These are meant to be changed by child view models
    state.PageTitle = ko.observable("And The Hedgehog");

    // Constants. The Player object contains the game state, history of actions
    // everything that we need to construct a scene.
    // @todo: Load a JSON object from local storage to restore where the user is at.
    self.Player = new Player();


    // Events in Scenes may move the player to another scene,
    // so here we keep track of 3 values. Where the player is now, where the player was last,
    // and where the player is currently moving to, if a move is in progress.
    self.Scene = {
        "current": ko.observable(""),
        "previous": ko.observable(""),
        "next": ko.observable(""),
        "data": ko.observable()
    };

    // Monitor for a change in the current scene, and react to it, publish an internal change.
    $.subscribe('scene.next', function(context, value) {
        self.Scene.next(value);
    });
    // Monitor for a change in the next scene value, and trigger the change with a nice animation
    // and then update values and publish changes
    self.Scene.next.subscribe(function(value){
        console.log("value", value)
        // Fire off any kind of transition animation here

        // Scene data model
        self.Scene.data(new returnObjectByName('App.Scenes.'+value, window, self.Player, self), document.getElementById("Scene"));
 
        // Set our internal values, we are now on the next scene and want to reflect as such.
        self.Scene.previous(self.Scene.current());
        self.Scene.current(value);

        // Publish what happened here
        $.publish('scene.current', self.Scene.current());
        $.publish('scene.previous', self.Scene.previous());
    });

    // Set the default scene by broadcasting.
    $.publish('scene.next', "a1");

    return self;
}
