const FIXED_CLASS = 'fixed';
const OPEN_MENU_CLASS = 'header__navigation--open';
const OPEN_MENU_BUTTON_CLASS = 'header__menu-button--menu-open';

const html = document.querySelector('html');
const headerContainer = document.querySelector('.header__container');

const initMenu = (container) => {
    const menuList = container.querySelector('.header__navigation');
    const menuItems = container.querySelectorAll('.menu__item');
    const menuButton = container.querySelector('.header__menu-button');

    menuButton.addEventListener('click', () => {
        html.classList.toggle(FIXED_CLASS);
        menuList.classList.toggle(OPEN_MENU_CLASS);
        menuButton.classList.toggle(OPEN_MENU_BUTTON_CLASS);

        if (container.classList.contains(OPEN_MENU_CLASS)) {
            menuItems[0].focus();
        }
    });
};

if (headerContainer) {
    initMenu(headerContainer);
}
