Player = function(game) {
    var self = this;

    self.mood = "Happy";

	self.Inventory = new Inventory(game);
	
	self.Inventory.Items.push(new Hedgehog(game, self));


	console.log(self);
    return self;
};