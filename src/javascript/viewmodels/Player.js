Player = function(state) {
    var self = this;

    self.mood = "Happy";

	self.Inventory = ko.observable(new Inventory(state));
	
	self.Inventory.Items.push(new Hedgehog(state, self))

    return self;
};