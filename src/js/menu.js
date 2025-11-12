function addMenu() {
  return fetch('/src/components/menu.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('menu').innerHTML = data;
      setActiveLink();
      mobileMenuAnimation();
  });
}  

function setActiveLink() {
    const currentFile  = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkFile = href.split('/').pop();
        
            if (linkFile === currentFile || (currentFile === '' && linkFile === '../../index.html')) {
                link.classList.add('nav-link-active-custom');
            } else {
                link.classList.remove('nav-link-active-custom'); 
            }
        }
    });
}

function mobileMenuAnimation() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navbarNav = document.getElementById('navbarNav');
    if (!menuIcon || !navbar || !navbarNav) return;

    navbarNav.addEventListener('show.bs.collapse', function () {
        menuIcon.className = 'fa-solid fa-square-xmark';
        navbar.classList.add('show-fullscreen');
    });

    navbarNav.addEventListener('hide.bs.collapse', function () {
        menuIcon.className = 'fas fa-bars';
        navbar.classList.remove('show-fullscreen');
    });
}


