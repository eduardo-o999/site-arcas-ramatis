document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.menu-principal');
    const navList = document.querySelector('.menu-list');
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            // Alterna estado visual do hamburger (classe .active controlada por CSS)
            const hamburger = this.querySelector('.menu-hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
    }

    // Gerenciar dropdowns
    dropdownItems.forEach(item => {
        const trigger = item.querySelector('.dropdown-trigger');
        const dropdown = item.querySelector('.dropdown');
        const svgd = item.querySelector('.svg-dropdown');

        function toggleSvgdClass() {
            svgd.classList.toggle('active');
        }
        // Em dispositivos móveis, o clique abre/fecha o dropdown
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 1220) {
                    e.preventDefault();
                    item.classList.toggle('active');
                    toggleSvgdClass();

                    // Fechar outros dropdowns abertos
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }   

        // Em desktops, mouse por cima do item
        dropdown.addEventListener('mouseenter', toggleSvgdClass);
        dropdown.addEventListener('mouseleave', toggleSvgdClass);
        trigger.addEventListener('mouseenter', toggleSvgdClass);
        trigger.addEventListener('mouseleave', toggleSvgdClass);
});

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target) && navList.classList.contains('active')) {
            // Remove classes dos elementos principais
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Remove classe do hambúrguer
            const hamburger = menuToggle.querySelector('.menu-hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
            }

            // Remove classe dos SVGs dos dropdowns
            const allSvgDropdowns = document.querySelectorAll('.svg-dropdown');
            allSvgDropdowns.forEach(svg => svg.classList.remove('active'));

            // Fecha quaisquer dropdowns abertos
            dropdownItems.forEach(otherItem => otherItem.classList.remove('active'));
        }
    });

    // Fechar o menu ao clicar em um link (mobile)
    const navLinks = document.querySelectorAll('.menu-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && !this.parentElement.classList.contains('has-dropdown')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                navList.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Remove classe do hambúrguer
                const hamburger = menuToggle.querySelector('.menu-hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }

                // Remove classe dos SVGs dos dropdowns
                const allSvgDropdowns = document.querySelectorAll('.svg-dropdown');
                allSvgDropdowns.forEach(svg => svg.classList.remove('active'));
            }
        });
    });



    // Adiciona classe "active" ao link da página atual
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref !== 'index.html' && currentPage.includes(linkHref.split('.')[0]))) {
            link.classList.add('active');
        }
    });
    
    // Tabs/Abas (para páginas como agenda.html)
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Reset/Remove classe ativa de todas as tabs
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Adiciona classe ativa à tab clicada
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

    // Botão de voltar ao topo - IMPLEMENTAR!!
    // const backToTopButton = document.querySelector('.back-to-top');
    // if (backToTopButton) {
    //     window.addEventListener('scroll', function() {
    //         if (window.pageYOffset > 300) {
    //             backToTopButton.classList.add('visible');
    //         } else {
    //             backToTopButton.classList.remove('visible');
    //         }
    //     });

    //     backToTopButton.addEventListener('click', function() {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     });
    // }



    // const animatedElements = document.querySelectorAll('.animate-on-scroll');
    // if (animatedElements.length > 0) {
    //     function checkIfInView() {
    //         animatedElements.forEach(element => {
    //             const elementTop = element.getBoundingClientRect().top;
    //             const elementVisible = 150;
                
    //             if (elementTop < window.innerHeight - elementVisible) {
    //                 element.classList.add('visible');
    //             }
    //         });
    //     }

    //     checkIfInView();
        
    //     // Verificar elementos visíveis ao rolar a página
    //     window.addEventListener('scroll', checkIfInView);
    // }

    function setActiveParentMenu() {
        const currentPage = window.location.pathname.split('/').pop();
        const pageMapping = {
            'inicie-seu-tratamento.html': 'tratamentos',
            'curativos.html': 'tratamentos',
            'perguntas-frequentes.html': 'tratamentos',
            'livros.html': 'dicas-culturais',
            'videos.html': 'dicas-culturais'
        };

        function activateParentByKey(parentKey) {
            const dropdownItems = document.querySelectorAll('.has-dropdown');
            dropdownItems.forEach(item => {
                const trigger = item.querySelector('.dropdown-trigger');
                if (!trigger) return;
                const triggerTextKey = trigger.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                if (triggerTextKey === parentKey) {
                    trigger.classList.add('active');
                }
            });
        }

        if (pageMapping[currentPage]) {
            activateParentByKey(pageMapping[currentPage]);
            return;
        }

        // fallback trigger
        const activeLink = document.querySelector('.menu-list a.active');
        if (activeLink) {
            const parentDropdown = activeLink.closest('.has-dropdown');
            if (parentDropdown) {
                const trigger = parentDropdown.querySelector('.dropdown-trigger');
                if (trigger) {
                    trigger.classList.add('active');
                }
            }
        }
    }

    setActiveParentMenu();
});