;(function (global, $) {

    //'new' an object
    var Greeting = function (firstName, lastName, language) {
        return new Greeting.init(firstName, lastName, language);
    }

    //hidden within the scope of the IIFE and never directly accessible
    var supportedLanguages = ['en', 'hi', 'be']; //Englsh, Hindi & Bengali

    //informal greetings
    greetings = {
        en: 'Hello',
        hi: 'Namaste',
        be: 'Nomoshkar'
    };

    //formal greetings
    formalGreetings = {
        en: 'Greetings',
        hi: 'Namaste Ji',
        be: 'Nomoshkar Apnake'
    };

    //logger messages
    var logMessages = {
        en: 'Logged in',
        hi: 'pravesh kar chuka hain',
        be: 'probesh kore niyeche'
    };

    //prototype holds methods (to save memory space)
    Greeting.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },

        validate: function () {
            //check that it is a valid language
            //references the externally inaccessible 'supportedLanguages' within the closure
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw 'Invalid Language';
            }
        },

        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + ' !';
        },

        //retrieve messages from object by referring to properties using [] syntax
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },

        //chainable methods return their own containing object
        greet: function (formal) {
            var message;

            //if undefined or null , it will be coreced to 'false'
            if (formal) {
                message = this.formalGreeting();
            } else {
                message = this.greeting();
            }

            if (console) {
                console.log(message);
            }

            //'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },

        log: function () {

            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            //make chainable
            return this;
        },

        setLanguage: function(language) {

            //set the language
            this.language = language;
            //Validate
            this.validate();
            //make chainable
            return this;
        },
        
        HTMLGreetings: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded';
            }

            if(!selector) {
                throw 'Missing jQuery selector';
            }

            //determine the message
            var message;
            if (formal) {
                message = this.formalGreeting();
            } else {
                message = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(message);

            //make chainable
            return this;

        }

    };

    //the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greeting.init = function (firstName, lastName, language) {

        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        self.validate();

    }

    //trick borrowed from jQuery so we don't have to use th 'new' keyword
    Greeting.init.prototype = Greeting.prototype;

    //attach our Greeting to the global object, and provide a shorthand '$D' to minimize repetetive coding
    global.Greeting = global.D$ = Greeting;

}(window, jQuery));