App.ViewModels.MasterViewModel = function() {
    var self = this;

    // These are meant to be changed by child view models
    self.Template = ko.observable("home");
    self.PageTitle = ko.observable("Deployd Kickstart");
    self.TemplateViewModel = ko.observable("");
    self.Alpha = "Wrong View Model";

    self.getTemplate = function() {
        return self.Template;
    }
    // Update the page title manually since it's outside of the area that this VM is bound to
    self.PageTitle.subscribe(function(value){
     $("title", "head").html(value);
    });

    return self;
}
