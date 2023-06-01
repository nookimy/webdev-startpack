function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});


/*Мобильное меню*/
let burgerButton = document.querySelector(".burger-button");
let siteNav = document.querySelector(".main-header__menu");

burgerButton.onclick = function () {
    burgerButton.classList.toggle("burger-button--down");
    siteNav.classList.toggle("main-header__menu--opened");
};

/* Когда пользователь прокручивает вниз, скрыть навигационную панель. Когда пользователь прокручивает вверх, показать навигационную панель */
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        siteNav.classList.remove("main-header__menu--opened");
    } else {
        document.getElementById("navbar").style.top = "-80px";
        siteNav.classList.remove("main-header__menu--opened");
    }
    prevScrollpos = currentScrollPos;
}
