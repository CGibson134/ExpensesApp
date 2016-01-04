var HomeView = function(store) {	

	this.render = function() {
	    this.el.html(HomeView.template());
	    return this;
	};

	this.findByName = function() {
		var searchValue = "";
		if (!$('.search-key').val() == "")
		{
			searchValue = $('.search-key').val();
		}
	    store.findByName(searchValue, function(customers) {
	        $('.customer-list').html(HomeView.liTemplate(customers));
	    });
	};

	this.initialize = function() {
	    // Define a div wrapper for the view. The div wrapper is used to attach events.
	    this.el = $('<div/>');
	    this.findByName();	    
	    this.el.on('keyup', '.search-key', this.findByName);
	};

	this.initialize(); 
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#customer-li-tpl").html());