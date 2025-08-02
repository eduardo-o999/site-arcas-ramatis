document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Altera o ícone do hamburger para X quando ativo
            const hamburger = this.querySelector('.hamburger');
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
            } else {
                hamburger.classList.add('active');
            }
        });
    }

    // Gerenciar dropdowns em dispositivos móveis
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');

        // Em dispositivos móveis, o primeiro clique abre o dropdown
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Fechar outros dropdowns abertos
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            const hamburger = menuToggle.querySelector('.hamburger');
            hamburger.classList.remove('active');
        }
    });

    // Fechar menu ao clicar em um link (em dispositivos móveis)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && !this.parentElement.classList.contains('has-dropdown')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
                const hamburger = menuToggle.querySelector('.hamburger');
                hamburger.classList.remove('active');
            }
        });
    });

    // Adiciona classe active ao link da página atual
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref !== 'index.html' && currentPage.includes(linkHref.split('.')[0]))) {
            link.classList.add('active');
        }
    });

    // Estilização do menu hamburger quando ativo
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        const hamburger = this.querySelector('.hamburger');
        hamburger.classList.toggle('active');
    });

    // Adiciona estilos CSS para o hamburger ativo
    const style = document.createElement('style');
    style.textContent = `
        .hamburger.active {
            background-color: transparent;
        }
        
        .hamburger.active::before {
            transform: rotate(45deg);
            top: 0;
        }
        
        .hamburger.active::after {
            transform: rotate(-45deg);
            bottom: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Tabs (para páginas que usam abas, como agenda.html)
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remover classe ativa de todos os botões e conteúdos
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Adicionar classe ativa ao botão e conteúdo clicado
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Ativar a primeira aba por padrão
        if (tabButtons[0]) {
            tabButtons[0].click();
        }
    }

    // Accordion (para FAQs)
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', function() {
                // Toggle para o item atual
                item.classList.toggle('active');
            });
        });
    }

    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar URL sem recarregar a página
                history.pushState(null, null, targetId);
            }
        });
    });

    // Botão de voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animação de elementos ao scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        function checkIfInView() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Verificar elementos visíveis ao carregar a página
        checkIfInView();
        
        // Verificar elementos visíveis ao rolar a página
        window.addEventListener('scroll', checkIfInView);
    }
});