var CustomerView = function(customer) {
 
	this.render = function() {
	    this.el.html(CustomerView.template(customer));
	    return this;
	};

	this.addLocation = function(event) {
	    event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};

	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
	        app.showAlert("Contacts API not supported", "Error");
	        return;
	    }
	    var contact = navigator.contacts.create();
	    contact.name = {givenName: customer.mainContact};
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', customer.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', customer.mobilePhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save();
	    return false;
	};

	this.changePicture = function(event) {
	    event.preventDefault();
	    if (!navigator.camera) {
	        app.showAlert("Camera API not supported", "Error");
	        return;
	    }
	    var options =   {   quality: 50,
	                        destinationType: Camera.DestinationType.DATA_URL,
	                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                        encodingType: 0     // 0=JPG 1=PNG
	                    };
	 
	    navigator.camera.getPicture(
	        function(imageData) {
	            $('.customer-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
	        },
	        function() {
	            app.showAlert('Error taking picture', 'Error');
	        },
	        options);
	 
	    return false;
	};

    this.initialize = function() {
    	this.el = $('<div/>');
    	this.el.on('click', '.add-location-btn', this.addLocation);
    	this.el.on('click', '.add-contact-btn', this.addToContacts);
    	this.el.on('click', '.change-pic-btn', this.changePicture);
    };
 
    this.initialize();
 
 }
 
CustomerView.template = Handlebars.compile($("#customer-tpl").html());