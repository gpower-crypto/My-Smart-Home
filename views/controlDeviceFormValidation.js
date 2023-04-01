// validate the form contents for the control device page
function validateInputForm() {

    let name = document.forms["form"]["name"].value;

    // check if user entered a valid device name
    if (name.trim().length == 0) 
    {
        alert("Please choose your Device Name");
        return false;
    }

    if (document.getElementById('div1').style.display == "block") {

        let checked_option = document.forms["form"]["status"].value;
        //Test if any option was checked (on/off)
        if (checked_option.trim().length == 0) 
        { 
            alert("Please check one of the options"); //Alert that nothing was checked
            return false;
        }
    } 
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