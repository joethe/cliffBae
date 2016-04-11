//====================== NAVBAR CONTROLLER ============================
angular.module('mainApp').controller('navbarCtrl', function(){
    var navbar = this;
    console.log("Navbar controller loaded");

    navbar.pages = [
        {text: "Home", link: '/'},
        {text: "About", link: '/about'},
        {text: "Art Assets", link: '/art'},
        {text: "Quotes", link: '/quotes'},
        {text: "How To Play", link: '/howTo'},
        {text: "Game", link: '/game'}
    ];
});
