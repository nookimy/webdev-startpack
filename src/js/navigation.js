"use strict"

/* Ширина вьюпорта */
let windowWidth = document.documentElement.clientWidth;


/*Проверка на наличие тачскрина*/
const  isMobile = {
    Andriod: function () {
        return navigator.userAgent.match(/Andriod/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return(
            isMobile.Andriod() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
        );
    }
};



/*Стилизация меню второго уровня в зависимости от типа экрана*/
if (isMobile.any()|| windowWidth < 1024) {
    document.body.classList.add('_touch');

    /*Стрелка для раскрывающегося меню на тачскринах*/
    let menuArrows = document.querySelectorAll('.btn__open-sublist');
    if (menuArrows.length > 0) {
        [].forEach.call(menuArrows, function(menuArrow, i, menuArrows) {
            menuArrow.addEventListener('click', function() {
                [].forEach.call(menuArrows, function(menuArrow) {
                    if(menuArrow !== this) {
                        menuArrow.parentElement.classList.remove("_active");
                    } else {
                        menuArrow.parentElement.classList.toggle("_active");
                    }
                }, this);
            });
        });
    }
} else {
    document.body.classList.add('_pc');
}

/*Действия при клике на пункт меню*/
const menuLinks = document.querySelectorAll('.site-nav__list a')
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menu.classList.contains('main-header__menu--opened')) {
            menuBtn.classList.remove("burger-button--down");
            menu.classList.remove("main-header__menu--opened");
            search.classList.remove("main-header__search--opened");
            document.body.classList.remove('lock');
        }
    }
}

/*Открытие/закрытие меню и поиска в header*/
let menuBtn = document.querySelector(".burger-button");
let menu = document.querySelector(".main-header__menu");

let search = document.querySelector(".main-header__search");
let searchBtn = document.querySelector(".main-nav__search-btn");

let searchOpened = document.querySelector(".main-header__search--opened");
let menuOpened = document.querySelector(".main-header__menu--opened");

function unock() {
    if (!searchOpened && !menuOpened) {
        document.body.classList.remove('lock');
    }
}


if (menuBtn) {

    menuBtn.addEventListener('click', function (e) {
        menuBtn.classList.toggle("burger-button--down");
        menu.classList.toggle("main-header__menu--opened");
        search.classList.remove("main-header__search--opened");
        document.body.classList.remove('lock');

        if (menu.classList.contains('main-header__menu--opened')) {
            document.body.classList.add('lock');
        }

    });

}

if (searchBtn) {
    searchBtn.addEventListener('click', function (e) {
        menuBtn.classList.remove("burger-button--down");
        menu.classList.remove("main-header__menu--opened");
        search.classList.toggle("main-header__search--opened");
        document.body.classList.remove('lock');

        if (search.classList.contains('main-header__search--opened')) {
            document.body.classList.add('lock');
        }
    });
}


/*Поведение меню при скролле*/
let scrollpos = window.scrollY;
let scrollChange;
const mainHeader = document.querySelector(".main-header")
var prevScrollpos = window.pageYOffset;

function fixFeader() {
    if (windowWidth < 1024) {
        scrollChange = 150;

    } else {
        scrollChange = 274;

    }
    scrollpos = window.scrollY;
    if (scrollpos >= scrollChange) {
        mainHeader.classList.add("main-header--fixed");
    } else {
        mainHeader.classList.remove("main-header--fixed");
    }
}

function scrollShowHeader() {

        var currentScrollPos = window.pageYOffset;

        if (prevScrollpos > currentScrollPos) {
            document.querySelector('.main-header__nav').style.transform = "translateY(0)";

        } else {
            document.querySelector('.main-header__nav').style.transform = "translateY(-100%)";

        }

        prevScrollpos = currentScrollPos;

}

window.addEventListener('scroll', function() {
    scrollShowHeader();
    fixFeader();
});

/*Положение основного контента страницы в зависимости от высоты хэдера*/
let navHeight = document.querySelector('.main-header__nav').offsetHeight;
let menuHeight = document.querySelector('.main-header__menu').offsetHeight;

function headerPadding() {

    if (windowWidth < 1024) {
        mainHeader.style.paddingBottom = navHeight + "px";
        menu.style.paddingTop = navHeight + "px";
        search.style.paddingTop = navHeight + "px";
    } else {
        mainHeader.style.paddingBottom = navHeight + menuHeight + "px";
        console.log()
    }



};

headerPadding();





