//====================== NAVBAR CONTROLLER ============================
angular.module('mainApp').controller('navbarCtrl', function(){
    var navbar = this;
    console.log("Navbar controller loaded");

    navbar.pages = [
        {text: "Home", link: '/'},
        {text: "How To", link: '/howTo'},
        {text: "About", link: '/about'},
        {text: "Art Assets", link: '/art'},
        {text: "Quotes", link: '/quotes'},
        {text: "Snap", link: '/snap'},
        {text: "Tiles", link: '/tiles'},
        {text: "Game", link: '/game'}
    ];
});
