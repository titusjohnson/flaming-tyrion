Inventory = function(state) {
	var self = this;
	self.Items = ko.observableArray();


	return self;
}
InventoryItem = function(name, itemClass) {
	var self = this;
		
	self.name = name;
	self.itemClass = itemClass;

	return self;
}