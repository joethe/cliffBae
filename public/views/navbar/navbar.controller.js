//====================== NAVBAR CONTROLLER ============================
angular.module('mainApp').controller('navbarCtrl', function(){
    var navbar = this;
    console.log("Navbar controller loaded");

    navbar.pages = [
        {text: "Home", link: '/'},
        {text: "About", link: '/about'},
        {text: "Test Games", link: '/testgames'},
        {text: "Art Assets", link: '/art'}
    ];
});
