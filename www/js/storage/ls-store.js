var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var customers = JSON.parse(window.localStorage.getItem("customers"));
        var results = customers.filter(function(element) {
            var fullName = element.name + " " + element.location;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function(id, callback) {
        var customers = JSON.parse(window.localStorage.getItem("customers"));
        var customer = null;
        var l = customers.length;
        for (var i=0; i < l; i++) {
            if (customers[i].id === id) {
                customer = customers[i];
                break;
            }
        }
        callLater(callback, customer);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    var customers = [
            {"id": 1, "name": "Benteler - Jiading", "location": "Jiading", "mainContact": "Mark", "officePhone": "0123456", "mobilePhone": "6543210", "email" : "Mark@Benteler.com"},
            {"id": 2, "name": "Formica", "location": "Newcastle", "mainContact": "Bob", "officePhone": "0123456", "mobilePhone": "6543210", "email" : "Bob@Formica.com"},
            {"id": 3, "name": "Crown", "location": "Stoke", "mainContact": "Sandra", "officePhone": "0123456", "mobilePhone": "6543210", "email" : "Sandra@Crown.com"},
            {"id": 4, "name": "SPTS", "location": "Wales", "mainContact": "James", "officePhone": "0123456", "mobilePhone": "6543210", "email" : "James@SPTS.com"},
            {"id": 5, "name": "Nissan", "location": "Sunderland", "mainContact": "Neil", "officePhone": "0123456", "mobilePhone": "6543210", "email" : "Neil@Nissan.com"}
        ];

    window.localStorage.setItem("customers", JSON.stringify(customers));

    callLater(successCallback);

}