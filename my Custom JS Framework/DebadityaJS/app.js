//Gets a new object (the artitechture allows us to not have to use the 'new' keyword here)
var d = D$('John', 'Doe');
console.log(d);

//use our chainable methods
d.greet().setLanguage('hi').greet(true).setLanguage('be').greet().log();

//let's use our object on the click of the login button
$('#login').click(function() {

    //create a new 'Greeting' object (let's assume that we know the name from login)
    var loginGreeter = D$('Debaditya', 'Choudhury');
    //hide the login on the screen
    $('#login-div').hide();
    //fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
    loginGreeter.setLanguage($('#language').val()).HTMLGreetings('#greeting', true).log();
});