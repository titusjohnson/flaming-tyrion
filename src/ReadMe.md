# Deployd Headstart
### Basic Concepts.
Headstart is mostly a set of Grunt and Bower configuration files, and a loose framework of supporting JS designed to give the user a simple MVC-esq experience, intended for use with Deployd for any backend data needs.

At its core, Gruntfile.js makes strong assumptions about workflow. Foundation4 is preconfigured, SASS is assumed, and the front-end uses jQuery, KnockoutJS, and FinchJS. Headstart provides a very basic framework, consisting of FinchJS for routing, and KnockoutJS for everything else. Routes initalize named KnockoutJS view models, which in turn provide data to templates. It's a very simple setup focused on getting pages working immediatly, and in as traditional a style as possible.

### Getting started
We assume that you have already installed deployd, node, and have grunt-cli working. The following set of terminal commands also assume you're on OSX.

    $ cd /your/destination
    $ dpd create your-app-name
    $ cd your-app-name
    $ git clone https://github.com/titusjohnson/deployd-headstart your-app-name
    $ cd your-app-name
    $ npm install
    $ bower install
    $ grunt init
    $ grunt

At this point your new app is being monitored. Bower has grabbed all the source files needed, the grunt:init call ran through Bower's components directory and compiled some lib files for you. Grunt is watching your source folder, and will automatically compile changed SCSS, templates, images, and javascript into deployd's public directory. If you fire up deployd in the parent directory you should be able to visit the site's small front-end and view some extra documentation.

Some things are still a bit rough, and most of the documentation is in the code. The structure of the framework is very simple, there are two main viewmodels, each page is a child view model that Finch binds when it detects a matching route change. What happens when a page loads is up to you. I usually grab some data from Deployd and insert it into any observables I want, return the object, and then write up some templates.

###Adding Pages
Edit app.js and add the desired routes. Name the view model something simple.

    App.Routes = {
        "": "Home",
        "docs": "Docs",
        "docs/:document": "ViewDoc"
        "route/path": "NewViewModelName"
    };

In /javascript/viewmodels/ create a new file with this as the content. Replace $$NAME$$ with the name of your View Model, assigned above. This file contains only one function, which will be bound by KnockoutJS when a user navigates to the route you created.

    App.ViewModels.$$NAME$$ = function(url_values, state) {
        var self = this;

        state.PageTitle("Docs");

        return self;
    };

Create a new html file in /templates/views/, name it $$controller$$.html. Seed it with the following html, and edit the ID  accordingly. This file is nothing but a single, or closly related, set of KnockoutJS templates. The file will be concatenated into one single file by Grunt.

    &lt;script type="text/html" id="$controller$"&gt;
        Template HTML here.
    &lt;/script&gt;

Now you have a new route set up, a view model to power it, and a template to display data with. Within the view model itself you can directly call dpd.js to fetch or save any data. Fetch a group, load it into the view model's properties, and when the method is returned everything will be bound and displayed.