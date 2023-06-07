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

let mainHeader = document.querySelector(".main-header");
let burgerButton = document.querySelector(".burger-button");
let siteNav = document.querySelector(".main-header__menu");


/*Открытие меню по клику на бургер*/
burgerButton.onclick = function () {
    burgerButton.classList.toggle("burger-button--down");
    siteNav.classList.toggle("main-header__menu--opened");
    search.classList.remove("main-header__search--opened");
};

let searchOpenButton = document.querySelector(".main-nav__search-btn");
let search = document.querySelector(".main-header__search");

/*Открытие поиска в мобильном меню*/
searchOpenButton.onclick = function () {
    burgerButton.classList.remove("burger-button--down");
    siteNav.classList.remove("main-header__menu--opened");
    search.classList.toggle("main-header__search--opened");
};

let windowWidth = document.documentElement.clientWidth;
function checkScreen() {
    if (windowWidth < 992) {
        mainHeader.classList.add('main-header--mobile');
    } else {
        mainHeader.classList.add('main-header--desktop');
        mainHeader.classList.remove('main-header--mobile');
    }
};

checkScreen();

/*function checkScreen() {
    let windowWidth = document.documentElement.clientWidth; // ширина окна за вычетом полосы прокрутки

    if (windowWidth < 992) {
        mainHeader.classList.remove('main-header--desktop');
        mainHeader.classList.add('main-header--fixed');
    } else {
        mainHeader.classList.remove('main-header--fixed');
        mainHeader.classList.add('main-header--desktop');
    }
};

checkScreen();
/!* Когда пользователь прокручивает вниз, скрыть навигационную панель. Когда пользователь прокручивает вверх, показать навигационную панель*!/

function menuPosition() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        mainHeaderFixed.style.transform = "none";
        siteNav.classList.remove("main-header__menu--opened");
    } else {
        mainHeaderFixed.style.transform = "translateY(-100%)";
        siteNav.classList.remove("main-header__menu--opened");
    }
    prevScrollpos = currentScrollPos;
}

window.onscroll = menuPosition;

window.addEventListener('resize', (e) => {
    checkScreen();


