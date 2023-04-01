// get the device type value from the array sent from the form in controlDevice.html.
// This is used to pass it as an argument in handleSelection function below to display 
// the appropriate settings based on the selected device type.
function getDeviceTypeValue(value)
{
    var array = value.split(",");
    return array[1];
}

// display the appropriate settings based on the selected device type.
function handleSelection(choice) {
    
    if (choice == "security" || choice == "lighting" || choice == "kitchen") {
        document.getElementById('div1').style.display = "block";
        document.getElementById('div2').style.display = "none";
        document.getElementById('div3').style.display = "none";
        document.getElementById('div4').style.display = "none";
    }
    if (choice == "curtain") {
        document.getElementById('div2').style.display = "block";
        document.getElementById('div1').style.display = "none";
        document.getElementById('div3').style.display = "none";
        document.getElementById('div4').style.display = "none";
        document.getElementById('div5').style.display = "none";
    }
    if (choice == "cooling") {
        document.getElementById('div3').style.display = "block";
        document.getElementById('div1').style.display = "block";
        document.getElementById('div2').style.display = "none";
        document.getElementById('div4').style.display = "none";
        document.getElementById('div5').style.display = "none";
    }
    if (choice == "heating") {
        document.getElementById('div4').style.display = "block";
        document.getElementById('div1').style.display = "block";
        document.getElementById('div2').style.display = "none";
        document.getElementById('div3').style.display = "none";
        document.getElementById('div5').style.display = "none";
    }
    if (choice == "audio-visual") {
        document.getElementById('div5').style.display = "block";
        document.getElementById('div1').style.display = "block";
        document.getElementById('div2').style.display = "none";
        document.getElementById('div3').style.display = "none";
        document.getElementById('div4').style.display = "none";
    }
}

// function check if a string has special characters, code from https://bobbyhadz.com/blog/javascript-check-if-string-contains-special-characters#:~:text=To%20check%20if%20a%20string,special%20character%20and%20false%20otherwise.
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

// check if user selected a device name in the form
function validateName() {
    let name = document.forms["form"]["name"].value;
    // check if user entered a valid name
    if (name.trim().length == 0) 
    {
        alert("Please choose your Device Name");
        return false;
    }
}

// validate the form contents 
function validateForm() {

    let name = document.forms["form"]["name"].value;

    // check if user entered a valid device name ***************

    if (name.trim().length == 0) 
    {
        alert("Please choose your Device Name");
        return false;
    }

    // check if the device name contains any special characters
    if (containsSpecialChars(name)) 
    {
        alert("Invalid Name!" + "\n" + "Device name should not contain special characters.");
        return false;
    }

    // check if the device name is within the set limit of length 
    if (name.trim().length > 30)
    {
        alert("Invalid Name!" + "\n" + "Device name should not exceed 30 characters.");
        return false;
    }
    // ****************************

    let typeOfDevice = document.forms["form"]["type"].value; // access the type of device
    if (typeOfDevice.trim().length == 0) 
    {
        alert("Please choose the type of device"); //Alert that no device type was selected
        return false;
    }

    // check if the radio button for on/off option is displayed on the screen
    if (document.getElementById('div1').style.display == "block") {

        let checked_option = document.forms["form"]["status"].value;
        //Test if any option was checked (on/off)
        if (checked_option.trim().length == 0) 
        { 
            alert("Please check one of the options"); //Alert that nothing was checked
            return false;
        }
    }

    // check if the radio button for open/closed is displayed on the screen
    if (document.getElementById('div2').style.display == "block") 
    {
        let state = document.forms["form"]["state"].value;
        //Test if any option was checked (open/closed)
        if (state.trim().length <= 0) 
        { 
            alert("No state(open/closed) entered"); //Alert that nothing was checked
            return false;
        }
    }

    // check if the temperature input for cooling device is displayed on the screen
    if (document.getElementById('div3').style.display == "block") 
    {
        let temperature = document.forms["form"]["coolTemp"].value;
        //Test if any temperature value was entered
        if (temperature.trim().length <= 0) 
        { 
            alert("No temperature value entered"); //Alert that no temperature was entered
            return false;
        }
    }

    // check if the temperature input for heating device is displayed on the screen
    if (document.getElementById('div4').style.display == "block") 
    {
        let temperature = document.forms["form"]["heatTemp"].value;
        //Test if any temperature value was entered
        if (temperature.trim().length <= 0) 
        { 
            alert("No temperature value entered"); //Alert that no temperature was entered
            return false;
        }
    }

    // check if the volume input is displayed on the screen
    if (document.getElementById('div5').style.display == "block") 
    {
        let volume = document.forms["form"]["volume"].value;
        //Test if any volume value was entered
        if (volume.trim().length <= 0) 
        { 
            alert("No volume value entered"); //Alert that no volume was entered
            return false;
        }
    }    
}