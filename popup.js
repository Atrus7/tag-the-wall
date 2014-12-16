
$(document).ready(function(){
    Parse.$ = jQuery;

    // Initialize Parse with your Parse application javascript keys
    Parse.initialize("CVbYCUyIgQ255dpPxaRyx8uaR70t8gvUhmK29C3j",
                       "le7e4vYRItSEvMdknX7tFxLs6AQr1FlIUldXN121");

    function dothatuploadthing() {
        chrome.tabs.executeScript({
            code: 'sprivate = ' + $("#private").is(":checked") + ';'
        });
        chrome.tabs.executeScript({
            code: 'name = "' + $("#title").val() + '"; upload();'
        });
    }

    function loadPrivateCall() {
        chrome.tabs.executeScript({
            code: 'loadPrivate();'
        });
    }

    function toggleMode() {
        chrome.tabs.executeScript({
            code: 'toggleMode();'
        });
    }

    function toggleGraffiti() {
        chrome.tabs.executeScript({
            code: 'toggleGraffiti();'
        });
    } 

    function setWeight(){
        chrome.tabs.executeScript({
            code: 'stroke = ' + $("#w").val() + ';'
        });
    }

    function superCoderMasterFunction() {
        
        console.log("Starting super function");
        var passed_id = String($("#private_id").val());
        var url;
        if (passed_id == "") {
            console.log("Can't lookup blank field");
        } else {

            var Graffiti = Parse.Object.extend("Graffiti");
            var query = new Parse.Query(Graffiti);

            // setting the query criteria
            query.get(passed_id, {
                success: function(result) {
                    console.log("download is successfull");
                    // Do something with the returned Parse.Object values
                    var graffiti = result;
                    url = graffiti.get('urlString');
                    chrome.extension.getBackgroundPage().url = url;
                    chrome.extension.getBackgroundPage().passed_id = passed_id;
                    chrome.extension.getBackgroundPage().viewPrivate = true;
                    chrome.tabs.update({
                            url: "http://" + url
                        }
                    );
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    }

    function setRed() {
        chrome.tabs.executeScript({
            code: 'color = RED;'
        });
    }

    function setGreen() {
        chrome.tabs.executeScript({
            code: 'color = GREEN;'
        });
    }

    function setBlue() {
        chrome.tabs.executeScript({
            code: 'color = BLUE;'
        });
    }

    function setYellow() {
        chrome.tabs.executeScript({
            code: 'color = YELLOW;'
        });
    }


    document.getElementById('load').addEventListener('click', superCoderMasterFunction);
    document.getElementById('save').addEventListener('click', dothatuploadthing);
    document.getElementById('toggle').addEventListener('click', toggleMode);
    document.getElementById('graffiti').addEventListener('click', toggleGraffiti);
    document.getElementById('red').addEventListener('click', setRed);
    document.getElementById('green').addEventListener('click', setGreen);
    document.getElementById('blue').addEventListener('click', setBlue);
    document.getElementById('yellow').addEventListener('click', setYellow);
    document.getElementById('setweight').addEventListener('click', setWeight);


    /* ============== Unfinished codes below ============== */
    // codes below attempt to build a list of public and private graffities loading from Parse
    // the model and how it would interact with the views are largely completed, popup.html gave
    // a mockup of how the views would look in a static Html format.
    // But the difficulty is with the restriction set forth by chrome extension's Content Security Policy.
    // The policy disable javascript's eval() functions and the like. However, in the case of templating, as
    // is used below, popup.html contains scripts need to be evaluated for rendering. So no eval() no 
    // rendering possible. 
    // One way to get around this may be to do sandboxing, details are not figured out yet, 
    // please see https://developer.chrome.com/extensions/sandboxingEval for details
    // or use angular.js instead of backbone.js to build the following model, 
    // or watch this video for enlightment https://www.youtube.com/watch?v=GBxv8SaX0gg


    function loadGraffitiAll(){
        var query = new Parse.Query(Graffiti);
        query.contains("urlString", "google");
        query.find({
          success: function(results) {
            // results is an array of Parse.Object.
            console.log("download is successfull");
          },

          error: function(error) {
            // error is an instance of Parse.Error.
            alert("Error: " + error.code + " " + error.message);
          }
        });
    }
    document.getElementById('graffiti-list').addEventListener('click', loadGraffitiAll);




    /* Model and view for each item in the graffiti-list */
    // graffiti Model
    // ----------

    // graffiti model has `title`, `urlString`, and `png` attributes.
    var Graffiti = Parse.Object.extend("Graffiti", {
    
        // Ensure that each todo created has `content`.
        initialize: function() {
          /*if (!this.get("content")) {
            this.set({"content": this.defaults.content});
          }*/
        },

        isOwner: function(){
            return ((this.user === Parse.User.current()) ? true : false);
        }

    });

    // This is the transient application state, not persisted on Parse
      var AppState = Parse.Object.extend("AppState", {
        defaults: {
          filter: "all"
        }
      });


    // Graffiti Collection
    // ---------------
    var GraffitiList = Parse.Collection.extend({

        // Reference to this collection's model.
        model: Graffiti,

        initialize: function(){
            /* do something if necesary */
        },

        // Filter down the list of all graffiti items that belongs to the user
        mine: function() {
          return this.filter(function(graffiti){ return graffiti.isOwner(); });
        },

        // Filter down the list to all graffiti items that NOT belongs to the user.
        others: function() {
          return this.without.apply(this, this.privateItems());
        },


        // graffitis are sorted by their updated time.
        comparator: function(graffiti) {
          return graffiti.get('updatedAt');
        }

    });

    // Graffiti Item View
    // --------------

    // The DOM element for a graffiti item...
    var GraffitiView = Parse.View.extend({

        //... is a list tag.
        tagName:  "li",

        // Cache the template function for a single item.
        template: _.template($('#item-template').html()),

        // The DOM events specific to an item.
        events: {
          "click .toggle"  : "toggleShow"
        },
        
        // may allow user to change the title on the list
        initialize: function() {
          /*_.bindAll(this, 'render', 'close', 'remove');
          this.model.on('change', this.render);
          this.model.on('destroy', this.remove);*/
        },

        // Re-render the contents of the todo item.
        render: function() {
          /*$(this.el).html(this.template(this.model.toJSON()));
          this.input = this.$('.edit');*/
          return this;
        },

        // Toggle the `"show"` state of the model.
        toggleShow: function() {
          // do some work here to toggle showing graffiti 

        },

    });

    // The main view that lets a user manage the graffiti
    var ManageGraffitiView = Parse.View.extend({

        // Our template for the line of statistics at the bottom of the app.
        statsTemplate: _.template($('#footer-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
          "click #submit-changes":  "submit",
          //"click #toggle-all": "toggleAllComplete",
          //"click .log-out": "logOut",
          "click ul#filters a": "selectFilter"
        },

        el: ".content",

        // At initialization we bind to the relevant events on the `graffitis`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting graffitis that might be saved to Parse.
        initialize: function() {
          var self = this;

          //_.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'toggleAllComplete', 'logOut', 'submit');
          _.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'submit');

          state.on("change", this.filter, this);

          // Main graffiti management template
          this.$el.html(_.template($("#manage-template").html()));

          // Create our collection of graffitis
          this.graffitis = new GraffitiList;

          // Setup the query for the collection to look for graffitis from the current user
          this.graffitis.query = new Parse.Query(Graffiti);
          //this.graffitis.query.equalTo("user", Parse.User.current());
          //this.graffitis.query.equalTo("urlString", location.hostname);
          this.graffitis.query.contains("urlString", "google");
            
          this.graffitis.on('add',     this.addOne);
          this.graffitis.on('reset',   this.addAll);
          this.graffitis.on('all',     this.render);

          // Fetch all the graffiti items for this user for this website
          this.graffitis.fetch();

        },

        // Logs out the user and shows the login view
       /* logOut: function(e) {
          Parse.User.logOut();
          new LogInView();
          this.undelegateEvents();
          delete this;
        },*/

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
          var numPrivate = this.graffitis.privateItems().length;
          var numPublic = this.graffitis.publicItems().length;

          this.$('#graffiti-footer').html(this.statsTemplate({
            numTotal  :      numPrivate + numPublic,
            numPrivate  :       numPrivate,
            numPublic   :    numPublic
          }));

          this.delegateEvents();

        },

        // Filters the list based on which type of filter is selected
        selectFilter: function(e) {
          var el = $(e.target);
          var filterValue = el.attr("id");
          state.set({filter: filterValue});
          Parse.history.navigate(filterValue);
        },

        filter: function() {
          var filterValue = state.get("filter");
          this.$("ul#filters a").removeClass("selected");
          this.$("ul#filters a#" + filterValue).addClass("selected");
          if (filterValue === "all") {
            this.addAll();
          } else if (filterValue === "private") {
            this.addSome(function(item) { return item.isOwner() });
          } else {
            this.addSome(function(item) { return !item.isOwner() });
          }
        },

        // Resets the filters to display all graffitis
        resetFilters: function() {
          this.$("ul#filters a").removeClass("selected");
          this.$("ul#filters a#all").addClass("selected");
          this.addAll();
        },

        // Add a single graffiti item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(graffiti) {
          var view = new TodoView({model: graffiti});
          this.$("#graffiti-list").append(view.render().el);
        },

        // Add all items in the graffitis collection at once.
        addAll: function(collection, filter) {
          this.$("#graffiti-list").html("");
          this.graffitis.each(this.addOne);
        },

        // Only adds some graffitis, based on a filtering function that is passed in
        addSome: function(filter) {
          var self = this;
          this.$("#graffiti-list").html("");
          this.graffitis.chain().filter(filter).each(function(item) { self.addOne(item) });
        },

        // If you hit return in the main input field, create new Todo model
        submit: function() {

          this.graffitis.create({
            title:   xxx,
            urlString:      xxx,
            png:        null,
            user:    Parse.User.current(),
            ACL:     new Parse.ACL(Parse.User.current())
          });

          this.input.val('');
          this.resetFilters();
        }
    });

    var AppRouter = Parse.Router.extend({
        routes: {
          "all": "all",
          "mine": "private",
          "others": "public"
        },

        initialize: function(options) {
        },

        all: function() {
          state.set({ filter: "all" });
        },

        mine: function() {
          state.set({ filter: "private" });
        },

        others: function() {
          state.set({ filter: "public" });
        }
    });

    var state = new AppState;

    new AppRouter;
    new AppView;
    Parse.history.start();


})