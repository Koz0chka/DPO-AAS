// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mainNav = document.querySelector('.nav-links');

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);

    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }

    navOverlay.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

if (navOverlay) {
    navOverlay.addEventListener('click', toggleMenu);
}

// Закрытие меню при клике на ссылку
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Закрытие меню при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        toggleMenu();
    }
});

// Кнопка "Наверх"
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top';
scrollTopButton.id = 'scrollTop';
scrollTopButton.setAttribute('aria-label', 'Back to top');
scrollTopButton.innerHTML = '↑';
document.body.appendChild(scrollTopButton);

scrollTopButton.style.zIndex = '2004';

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});