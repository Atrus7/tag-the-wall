
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
        }

    });


    // Graffiti Collection
    // ---------------
    var GraffitiList = Parse.Collection.extend({

        // Reference to this collection's model.
        model: Graffiti,

        initialize: function(){
            /* do something if necesary */
        }

        // Todos are sorted by their updated time.
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
          "keypress #new-todo":  "createOnEnter",
          "click #clear-completed": "clearCompleted",
          "click #toggle-all": "toggleAllComplete",
          "click .log-out": "logOut",
          "click ul#filters a": "selectFilter"
        },

        el: ".content",

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved to Parse.
        initialize: function() {
          var self = this;

          _.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'toggleAllComplete', 'logOut', 'createOnEnter');

          // Main todo management template
          this.$el.html(_.template($("#manage-template").html()));
          
          this.input = this.$("#new-todo");
          this.allCheckbox = this.$("#toggle-all")[0];

          // Create our collection of Todos
          this.todos = new TodoList;

          // Setup the query for the collection to look for todos from the current user
          this.todos.query = new Parse.Query(Todo);
          this.todos.query.equalTo("user", Parse.User.current());
            
          this.todos.bind('add',     this.addOne);
          this.todos.bind('reset',   this.addAll);
          this.todos.bind('all',     this.render);

          // Fetch all the todo items for this user
          this.todos.fetch();

          state.on("change", this.filter, this);
        },

        // Logs out the user and shows the login view
        logOut: function(e) {
          Parse.User.logOut();
          new LogInView();
          this.undelegateEvents();
          delete this;
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {
          var done = this.todos.done().length;
          var remaining = this.todos.remaining().length;

          this.$('#todo-stats').html(this.statsTemplate({
            total:      this.todos.length,
            done:       done,
            remaining:  remaining
          }));

          this.delegateEvents();

          this.allCheckbox.checked = !remaining;
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
          } else if (filterValue === "completed") {
            this.addSome(function(item) { return item.get('done') });
          } else {
            this.addSome(function(item) { return !item.get('done') });
          }
        },

        // Resets the filters to display all todos
        resetFilters: function() {
          this.$("ul#filters a").removeClass("selected");
          this.$("ul#filters a#all").addClass("selected");
          this.addAll();
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function(todo) {
          var view = new TodoView({model: todo});
          this.$("#todo-list").append(view.render().el);
        },

        // Add all items in the Todos collection at once.
        addAll: function(collection, filter) {
          this.$("#todo-list").html("");
          this.todos.each(this.addOne);
        },

        // Only adds some todos, based on a filtering function that is passed in
        addSome: function(filter) {
          var self = this;
          this.$("#todo-list").html("");
          this.todos.chain().filter(filter).each(function(item) { self.addOne(item) });
        },

        // If you hit return in the main input field, create new Todo model
        createOnEnter: function(e) {
          var self = this;
          if (e.keyCode != 13) return;

          this.todos.create({
            content: this.input.val(),
            order:   this.todos.nextOrder(),
            done:    false,
            user:    Parse.User.current(),
            ACL:     new Parse.ACL(Parse.User.current())
          });

          this.input.val('');
          this.resetFilters();
        },

        // Clear all done todo items, destroying their models.
        clearCompleted: function() {
          _.each(this.todos.done(), function(todo){ todo.destroy(); });
          return false;
        },

        toggleAllComplete: function () {
          var done = this.allCheckbox.checked;
          this.todos.each(function (todo) { todo.save({'done': done}); });
        }
    });


})