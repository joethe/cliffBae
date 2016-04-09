//====================== NAVBAR CONTROLLER ============================
angular.module('mainApp').controller('navbarCtrl', function(){
    var navbar = this;
    console.log("Navbar controller loaded");

    navbar.pages = [
        {text: "Home", link: '/'},
        {text: "About", link: '/about'},
        {text: "Kittens", link: '/kittens'},
        {text: "404 Page", link: '/wefwrtbertbeb'}
    ];
});
