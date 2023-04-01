module.exports = function (app) {
    // render the home page
    app.get("/", (req, res) => res.render("index.html")); 

    // render the about page
    app.get("/about", (req, res) => res.render("about.html"));

    // render the add device page
    app.get("/addDevice", (req, res) => res.render("addDevice.html"));

    // render the list of all devices in the list page
    // display the name and type for each device in the list
    app.get("/list", (req, res) => {
        // collect the names and type of all the devices from the database
        query = "SELECT name, type FROM devices;";
        db.query(query, (err, result) => {
            if(err)
            {
                res.redirect("/");
            }
            else{
                res.render("list.html", {listOfDevices: result})
            }
        });
    });

    // render the device status page showing the list of devices 
    // to choose from to view its status.
    app.get("/deviceStatus", (req, res) => {
        // collect the name of all the devices from the database
        query = "SELECT name FROM devices;";
        db.query(query, (err, result) => {
            if(err)
            {
                res.redirect("/");
            }
            else{
                res.render("deviceStatus.html", {listOfDevices: result})
            }
        });
    });

    // get the name, type and status, and settings of the selected device and pass it to the
    // html document to render in the form of a table.
    app.get("/showStatus", (req, res) => {
        // collect the name, type and status, and settings of the device name
        let query = "SELECT name, type, status, setting FROM devices WHERE name = ?;";
        let newRecord = [req.query.name];

        db.query(query, newRecord, (err, result) => {
            if (err) 
            {
                res.redirect("/");
            }
            else 
            {
                res.render("showStatus.html", {device: result[0]}); // result is an array of objects
            }
        });
    });

    // render the control device page where the user can choose among the list of devices
    // to update its settings.
    app.get("/controlDevice", (req, res) => {
        // collect the name and type of all the devices from the database
        query = "SELECT name, type FROM devices;";
        db.query(query, (err, result) => {
            if(err)
            {
                res.redirect("/");
            }
            else{
                res.render("controlDevice.html", {listOfDevices: result})
            }
        });
    });

    // render the delete device page which allows the user to choose
    // which device they want to delete.
    app.get("/deleteDevice", (req, res) => {
        // collect the name of all the devices from the database
        query = "SELECT name FROM devices;";
        db.query(query, (err, result) => {
            if(err)
            {
                res.redirect("/");
            }
            else
            {
                res.render("deleteDevice.html", {listOfDevices: result})
            }
        });
    });

    // perform the delete method in sql to delete the selected device 
    // based on the chosen device name. Then render the confirmation page
    app.post("/deviceDeleted", (req, res) => {
        // delete the record from the table where the name is the selected name
        let query = "DELETE FROM devices WHERE name = ?";
        let newRecord = [req.body.name];
        
        db.query(query, newRecord, (err) => {
            if (err)
            {
                res.redirect("/");
            }
            else 
            {
                res.render("deletedConfirmation.html", {deviceName: newRecord[0]});
            }
        });
    });

    // perform the update method in sql to update the selected device 
    // based on the chosen device's type. Then render the confirmation page
    app.post("/deviceUpdated", (req, res) => {
        let query;
        let newRecord;

        // ** get the values of the device name and device type from the array
        // access the user's selected device name and type

        let a = req.body.name;       // name is an array of the device name and type
        let array = a.split(",");    // split the array
        let name = array[0];         // access the device name
        let typeOfDevice = array[1]; // access the device type

        // based on the type of device selected, get the appropriate input values from the form
        // and store them in newRecord and 
        // update the status and/or setting in the database for the selected device name
        if (typeOfDevice == "security" || typeOfDevice == "lighting" || typeOfDevice == "kitchen") 
        {
            query = "UPDATE devices SET status = ? WHERE name = ?";
            newRecord = [req.body.status, name];
        }
        else if (typeOfDevice == "curtain") 
        {
            query = "UPDATE devices SET status = ? WHERE name = ?";
            newRecord = [req.body.state, name];
        }
        else if (typeOfDevice == "cooling") 
        {
            query = "UPDATE devices SET status = ?, setting = ? WHERE name = ?";
            newRecord = [req.body.status, req.body.coolTemp, name];
        }
        else if (typeOfDevice == "heating") 
        {
            query = "UPDATE devices SET status = ?, setting = ? WHERE name = ?";
            newRecord = [req.body.status, req.body.heatTemp, name];
        }
        else 
        {
            query = "UPDATE devices SET status = ?, setting = ? WHERE name = ?";
            newRecord = [req.body.status, req.body.volume, name];
        }
        
        db.query(query, newRecord, (err) => {
            if (err)
            {
                res.redirect("/");
            }
            else
            {
                res.render("updatedConfirmation.html", {deviceName: name});
            }
        });
    });

    // perform the insert method in sql to insert the selected device in the table
    // based on the chosen devic's type. Then show the confirmation page
    app.post("/deviceAdded", (req, res) => {
        let query;
        let newRecord;
        let typeOfDevice = req.body.type;

        // based on the type of device selected, get the appropriate input values from the
        // form and store them in newRecord and insert the device properties and values 
        // into the respective fields in the table in the database
        if (typeOfDevice == "security" || typeOfDevice == "lighting" || typeOfDevice == "kitchen") 
        {
            query = "INSERT INTO devices (name, type, status) VALUES(?,?,?)";
            newRecord = [req.body.name, typeOfDevice, req.body.status];
        }
        else if (typeOfDevice == "curtain") 
        {
            query = "INSERT INTO devices (name, type, status) VALUES(?,?,?)";
            newRecord = [req.body.name, typeOfDevice, req.body.state];
        }
        else if (typeOfDevice == "cooling") 
        {
            query = "INSERT INTO devices (name, type, status, setting) VALUES(?,?,?,?)";
            newRecord = [req.body.name, typeOfDevice, req.body.status, req.body.coolTemp];
        }
        else if (typeOfDevice == "heating") 
        {
            query = "INSERT INTO devices (name, type, status, setting) VALUES(?,?,?,?)";
            newRecord = [req.body.name, typeOfDevice, req.body.status, req.body.heatTemp];
        }
        else 
        {
            query = "INSERT INTO devices (name, type, status, setting) VALUES(?,?,?,?)";
            newRecord = [req.body.name, typeOfDevice, req.body.status, req.body.volume];
        }
    
        db.query(query, newRecord, (err) => {
            if (err)
            {
                console.log(err.message);
            }
            else 
            {
                res.render("deviceConfirmation.html", {deviceName: req.body.name})
            }
        });
    });
};