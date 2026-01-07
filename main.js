/**
 * OPENSOURCE Centro TI - JavaScript
 * Funcionalidades para site institucional
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('OPENSOURCE Centro TI - Site carregado com sucesso!');
    
    // ====================
    // 1. MENU RESPONSIVO
    // ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        // Cria botão hamburguer se não existir
        if (!menuToggle.innerHTML.trim()) {
            menuToggle.innerHTML = '☰';
            menuToggle.style.cssText = `
                display: none;
                font-size: 28px;
                background: none;
                border: none;
                color: #333;
                cursor: pointer;
                padding: 10px;
            `;
        }
        
        // Mostra botão em telas pequenas
        function toggleMenuButton() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
                navMenu.style.display = 'none';
            } else {
                menuToggle.style.display = 'none';
                navMenu.style.display = 'flex';
            }
        }
        
        // Toggle menu ao clicar
        menuToggle.addEventListener('click', function() {
            if (navMenu.style.display === 'block') {
                navMenu.style.display = 'none';
                menuToggle.innerHTML = '☰';
            } else {
                navMenu.style.display = 'block';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '60px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                menuToggle.innerHTML = '✕';
            }
        });
        
        // Inicializa e monitora redimensionamento
        toggleMenuButton();
        window.addEventListener('resize', toggleMenuButton);
    }
    
    // ====================
    // 2. BOTÕES INTERATIVOS
    // ====================
    const buttons = document.querySelectorAll('button, .btn, .ver-editora, .cta-button');
    
    buttons.forEach(button => {
        // Efeito hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.2s';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Feedback ao clicar
        button.addEventListener('click', function(e) {
            console.log(`Botão "${this.textContent.trim()}" clicado!`);
            
            // Se for um link interno (#), rola suavemente
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================
    // 3. FORMULÁRIO DE CONTATO
    // ====================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Simulação de envio
            console.log('=== FORMULÁRIO ENVIADO ===');
            console.log(`Nome: ${name}`);
            console.log(`Email: ${email}`);
            console.log(`Mensagem: ${message}`);
            
            alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // ====================
    // 4. ANIMAÇÃO DE SCROLL
    // ====================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadein');
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('section, .card, .feature').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
    
    // ====================
    // 5. CONTADOR DE VISITAS SIMPLES
    // ====================
    const visitCount = localStorage.getItem('opensource_visits') || 0;
    const newCount = parseInt(visitCount) + 1;
    localStorage.setItem('opensource_visits', newCount);
    
    const counterElement = document.getElementById('visit-counter');
    if (counterElement) {
        counterElement.textContent = `Já visitaram: ${newCount} pessoas`;
    }
    
    // ====================
    // 6. DATA ATUAL NO FOOTER
    // ====================
    const footerDate = document.getElementById('current-year');
    if (footerDate) {
        footerDate.textContent = new Date().getFullYear();
    }
    
    // ====================
    // 7. CARREGAMENTO DE PARCEIROS (EXEMPLO DINÂMICO)
    // ====================
    const partnersContainer = document.getElementById('partners-container');
    if (partnersContainer && partnersContainer.children.length === 0) {
        const partners = ['Cisco', 'Microsoft', 'CompTIA', 'Linux Foundation', 'Red Hat', 'AWS'];
        
        partners.forEach(partner => {
            const img = document.createElement('img');
            img.src = `assets/img/partners/${partner.toLowerCase().replace(' ', '-')}.png`;
            img.alt = partner;
            img.title = partner;
            img.style.width = '100px';
            img.style.height = 'auto';
            img.style.margin = '10px';
            img.style.filter = 'grayscale(100%)';
            img.style.transition = 'filter 0.3s';
            
            img.addEventListener('mouseenter', () => {
                img.style.filter = 'grayscale(0%)';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.filter = 'grayscale(100%)';
            });
            
            partnersContainer.appendChild(img);
        });
    }
    
});

// ====================
// FUNÇÕES GLOBAIS
// ====================

/**
 * Abre modal de imagem
 */
function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <img src="${imageSrc}" style="max-width: 90%; max-height: 90%; border-radius: 10px;">
        <button onclick="closeModal()" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
        ">✕</button>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Fecha modal
 */
function closeModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

/**
 * Rola para o topo
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostra botão "voltar ao topo" ao rolar
window.addEventListener('scroll', function() {
    const topButton = document.getElementById('top-button');
    if (topButton) {
        if (window.scrollY > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    }
});