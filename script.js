/* ===========================================
   LUZES DO RIO - JavaScript v2
   =========================================== */

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
    number: '5521973721000',
    messages: {
        pt: 'Olá! Vim através do site Luzes do Rio, com o Código Davi. Sou membro de uma embaixada do Flamengo e gostaria de saber mais sobre as condições especiais.',
        en: 'Hello! I came from the Luzes do Rio website, with Code Davi. I am a member of a Flamengo Embassy and would like to know more about the special conditions.'
    }
};

let currentLang = 'pt';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initLanguageToggle();
    initMobileMenu();
    initCarousels();
    initForm();
    initCounters();
    initWhatsApp();
});

/* ===================== NAVBAR ===================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]:not(.whatsapp-float)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });

                // Close mobile menu
                document.getElementById('navLinks').classList.remove('active');
                document.getElementById('hamburger').classList.remove('active');
            }
        });
    });
}

/* ===================== SCROLL REVEAL ===================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* ===================== LANGUAGE TOGGLE ===================== */
const translations = {
    pt: {
        'nav.home': 'Início',
        'nav.embassies': 'Embaixadas',
        'nav.development': 'Empreendimento',
        'nav.stadium': 'Estádio',
        'nav.prices': 'Valores',
        'nav.contact': 'Contato',
        'nav.cta': 'Fale Conosco',
        'hero.badge': 'Sua janela para o novo Estádio do Flamengo',
        'hero.title1': 'Viva ao Lado da',
        'hero.title2': 'Paixão Rubro-Negra!',
        'hero.subtitle': 'O único empreendimento do Rio com vista privilegiada para o futuro estádio do Mengão. Condições exclusivas para membros das Embaixadas oficiais.',
        'hero.cta1': 'Quero Garantir Minha Unidade',
        'hero.cta2': 'Ver Benefícios Embaixadas',
        'hero.stat1': 'Unidades',
        'hero.stat2': 'Pavimentos',
        'hero.stat3': 'min do Porto Maravilha',
        'flamengo.tag': 'Uma Nação, Um Sonho',
        'flamengo.title': 'O Maior Clube do <span class="highlight">Brasil</span> ao Seu Lado',
        'flamengo.p1': 'Imagine acordar e ver o novo estádio do Flamengo da sua janela. Estar a minutos de viver cada emoção rubro-negra. Essa é a oportunidade única que o Luzes do Rio oferece.',
        'flamengo.p2': 'Localizado estrategicamente no Porto Maravilha, você estará no coração das maiores conquistas que virão. É mais que um lar — é fazer parte da história.',
        'flamengo.cta': 'Garanta Sua Unidade',
        'embaixadas.tag': 'Exclusivo',
        'embaixadas.title': 'Benefícios para <span class="highlight">Embaixadas</span>',
        'embaixadas.subtitle': 'Condições especiais e vantagens únicas para membros oficiais das Embaixadas e Consulados do Flamengo.',
        'embaixadas.b1.title': 'Prioridade de Acesso',
        'embaixadas.b1.desc': 'Membros das embaixadas têm prioridade na escolha das unidades e condições de pagamento diferenciadas.',
        'embaixadas.b2.title': 'Descontos Exclusivos',
        'embaixadas.b2.desc': 'Valores especiais que só quem é rubro-negro de verdade pode aproveitar.',
        'embaixadas.b3.title': 'Áreas Personalizadas',
        'embaixadas.b3.desc': 'Espaços temáticos do Flamengo nas áreas comuns para viver a paixão todos os dias.',
        'embaixadas.b4.title': 'Comunidade Rubro-Negra',
        'embaixadas.b4.desc': 'Viva cercado por torcedores que compartilham a mesma paixão.',
        'embaixadas.b5.title': 'Localização Privilegiada',
        'embaixadas.b5.desc': 'A minutos do novo estádio e de toda a infraestrutura do Porto Maravilha.',
        'embaixadas.b6.title': 'Atendimento VIP',
        'embaixadas.b6.desc': 'Equipe dedicada para atender membros das embaixadas com exclusividade.',
        'emp.tag': 'O Empreendimento',
        'emp.title': 'Luzes do <span class="highlight">Rio</span>',
        'emp.desc': 'O Condomínio Candeeiro une história e modernidade. No terreno onde o Barão de Mauá construiu a primeira fábrica de vela e sabão do Brasil, nasce um empreendimento que ilumina o futuro do Rio.',
        'emp.f1.title': 'História Preservada',
        'emp.f1.desc': 'Casarão histórico do Barão de Mauá restaurado',
        'emp.f2.title': 'Bike Elétrica Inclusa',
        'emp.f2.desc': 'Cada apartamento vem com uma bicicleta Lev',
        'emp.f3.title': 'Lazer Padrão Resort',
        'emp.f3.desc': 'Piscina, academia, sport bar e muito mais',
        'emp.f4.title': 'Mobilidade Total',
        'emp.f4.desc': 'VLT, Terminal Gentileza e Rodoviária próximos',
        'emp.f5.title': 'Pet Friendly',
        'emp.f5.desc': 'Pet Place e Pet Care no condomínio',
        'emp.f6.title': 'Coworking',
        'emp.f6.desc': 'Espaço de trabalho moderno no condomínio',
        'lazer.tag': 'Lazer Completo',
        'lazer.title': 'Estrutura <span class="highlight">Padrão Resort</span>',
        'lazer.i1': 'Piscina',
        'lazer.i2': 'Academia',
        'lazer.i3': 'Pilates/Yoga',
        'lazer.i4': 'Sport Bar',
        'lazer.i5': 'Salão de Festas',
        'lazer.i6': 'Brinquedoteca',
        'lazer.i7': 'Pet Place',
        'lazer.i8': 'Coworking',
        'stadium.tag': 'O Sonho Rubro-Negro',
        'stadium.title': 'O Novo <span class="highlight-gold">Estádio do Flamengo</span>',
        'stadium.p1': 'O tão sonhado estádio próprio do Mengão está mais próximo do que nunca. E você pode estar ainda mais perto!',
        'stadium.p2': 'Imagine caminhar até o estádio nos dias de jogo, encontrar a Nação nas ruas, e voltar para casa depois da vitória. Isso é viver o Flamengo de verdade.',
        'stadium.sf1': 'Caminhada até o estádio',
        'stadium.sf2': 'Vista privilegiada do seu apartamento',
        'stadium.sf3': 'Viva cada vitória intensamente',
        'videos.tag': 'Experiência Imersiva',
        'videos.title': 'Conheça o <span class="highlight">Projeto</span>',
        'videos.subtitle': 'Veja em detalhes como será viver no Luzes do Rio.',
        'videos.v1.title': 'Tour Virtual',
        'videos.v2.title': 'Viva essa Emoção',
        'prices.tag': 'Investimento',
        'prices.title': 'Valores <span class="highlight">Especiais</span>',
        'prices.subtitle': 'Condições exclusivas de lançamento. Invista no seu futuro rubro-negro.',
        'prices.featured': 'Mais Procurado',
        'prices.cta': 'Tenho Interesse',
        'prices.plantas': 'Plantas dos Apartamentos',
        'prices.c1.title': '1 Quarto',
        'prices.c1.size': 'A partir de 31,62m²',
        'prices.c1.desc': 'Ideal para investidores e jovens profissionais',
        'prices.c1.f1': 'Varanda integrada',
        'prices.c1.f2': 'Piso laminado nos quartos',
        'prices.c1.f3': 'Bike elétrica inclusa',
        'prices.c1.f4': 'Alta demanda de aluguel',
        'prices.c2.title': '2 Quartos',
        'prices.c2.size': 'A partir de 42m²',
        'prices.c2.desc': 'Perfeito para famílias e casais',
        'prices.c2.f1': 'Varanda espaçosa',
        'prices.c2.f2': 'Piso laminado nos quartos',
        'prices.c2.f3': 'Bike elétrica inclusa',
        'prices.c2.f4': 'Apenas 8 colunas disponíveis',
        'prices.c2.f5': 'Alta valorização',
        'prices.c3.title': '2 Quartos (Ponta)',
        'prices.c3.size': 'Metragem maior',
        'prices.c3.desc': 'Mais espaço e conforto para sua família',
        'prices.c3.f1': 'Maior metragem da linha',
        'prices.c3.f2': 'Vista privilegiada',
        'prices.c3.f3': 'Piso laminado nos quartos',
        'prices.c3.f4': 'Bike elétrica inclusa',
        'location.tag': 'Localização',
        'location.title': 'No Coração do <span class="highlight">Porto Maravilha</span>',
        'location.l1.title': 'Terminal Gentileza',
        'location.l1.desc': 'VLT e integração modal',
        'location.l2.title': 'Rodoviária Novo Rio',
        'location.l2.desc': 'Conexão com todo o Brasil',
        'location.l3.title': 'Museu do Amanhã',
        'location.l3.desc': 'Cultura e lazer próximos',
        'location.l4.title': 'Rio Star',
        'location.l4.desc': 'Roda Gigante do Rio',
        'location.l5.title': 'AquaRio',
        'location.l5.desc': 'Maior aquário da América do Sul',
        'location.l6.title': 'Estádio do Flamengo',
        'location.l6.desc': 'Futuro estádio rubro-negro',
        'contact.tag': 'Contato',
        'contact.title': 'Fale com Nossa <span class="highlight">Equipe</span>',
        'contact.subtitle': 'Tire suas dúvidas, agende uma visita ou garanta sua unidade. Nossa equipe está pronta para atender você com exclusividade.',
        'contact.phone': 'Telefone',
        'contact.address': 'Endereço',
        'contact.partners': 'Uma realização:',
        'contact.form.title': 'Cadastre-se para Condições Especiais',
        'contact.form.name': 'Nome completo',
        'contact.form.email': 'Seu melhor e-mail',
        'contact.form.phone': 'WhatsApp com DDD',
        'contact.form.interest': 'Interesse em qual unidade?',
        'contact.form.investment': 'Investimento',
        'contact.form.embassy': 'Você é membro de alguma Embaixada?',
        'contact.form.embassy.yes': 'Sim, sou membro oficial',
        'contact.form.embassy.no': 'Não, mas sou torcedor',
        'contact.form.embassy.interested': 'Tenho interesse em saber mais',
        'contact.form.message': 'Mensagem (opcional)',
        'contact.form.privacy': 'Concordo com a Política de Privacidade e autorizo o contato da equipe Cury.',
        'contact.form.submit': 'Quero Ser Contatado',
        'contact.form.success.title': 'Cadastro realizado com sucesso!',
        'contact.form.success.desc': 'Nossa equipe entrará em contato em breve.',
        'book.tag': 'Material Completo',
        'book.title': 'Conheça Todos os <span class="highlight">Detalhes</span>',
        'book.subtitle': 'Explore o book digital completo do empreendimento com todas as informações, plantas e perspectivas.',
        'book.cta': 'Solicitar Book Completo',
        'footer.desc': 'O empreendimento mais conectado ao futuro do Flamengo e ao melhor do Rio de Janeiro. Uma realização Cury Construtora.',
        'footer.quick': 'Links Rápidos',
        'footer.info': 'Informações',
        'footer.privacy': 'Política de Privacidade',
        'footer.rights': 'Todos os direitos reservados.'
    },
    en: {
        'nav.home': 'Home',
        'nav.embassies': 'Embassies',
        'nav.development': 'Development',
        'nav.stadium': 'Stadium',
        'nav.prices': 'Prices',
        'nav.contact': 'Contact',
        'nav.cta': 'Contact Us',
        'hero.badge': 'Your window to the new Flamengo Stadium',
        'hero.title1': 'Live Alongside the',
        'hero.title2': 'Red-and-Black Passion!',
        'hero.subtitle': 'The only development in Rio with a privileged view of Flamengo\'s future stadium. Exclusive conditions for official Embassy members.',
        'hero.cta1': 'I Want to Secure My Unit',
        'hero.cta2': 'See Embassy Benefits',
        'hero.stat1': 'Units',
        'hero.stat2': 'Floors',
        'hero.stat3': 'min from Porto Maravilha',
        'flamengo.tag': 'One Nation, One Dream',
        'flamengo.title': 'The Biggest Club in <span class="highlight">Brazil</span> by Your Side',
        'flamengo.p1': 'Imagine waking up and seeing the new Flamengo stadium from your window. Being minutes away from living every red-and-black emotion. This is the unique opportunity that Luzes do Rio offers.',
        'flamengo.p2': 'Strategically located in Porto Maravilha, you\'ll be at the heart of the greatest achievements to come. It\'s more than a home — it\'s being part of history.',
        'flamengo.cta': 'Secure Your Unit',
        'embaixadas.tag': 'Exclusive',
        'embaixadas.title': 'Benefits for <span class="highlight">Embassies</span>',
        'embaixadas.subtitle': 'Special conditions and unique advantages for official members of Flamengo Embassies and Consulates.',
        'embaixadas.b1.title': 'Priority Access',
        'embaixadas.b1.desc': 'Embassy members have priority in choosing units and differentiated payment conditions.',
        'embaixadas.b2.title': 'Exclusive Discounts',
        'embaixadas.b2.desc': 'Special prices that only true red-and-black fans can enjoy.',
        'embaixadas.b3.title': 'Themed Areas',
        'embaixadas.b3.desc': 'Flamengo-themed spaces in common areas to live the passion every day.',
        'embaixadas.b4.title': 'Red-Black Community',
        'embaixadas.b4.desc': 'Live surrounded by fans who share the same passion.',
        'embaixadas.b5.title': 'Privileged Location',
        'embaixadas.b5.desc': 'Minutes from the new stadium and all Porto Maravilha infrastructure.',
        'embaixadas.b6.title': 'VIP Service',
        'embaixadas.b6.desc': 'Dedicated team to serve embassy members exclusively.',
        'emp.tag': 'The Development',
        'emp.title': 'Luzes do <span class="highlight">Rio</span>',
        'emp.desc': 'Condomínio Candeeiro combines history and modernity. On the land where Baron of Mauá built Brazil\'s first candle and soap factory, a development is born that illuminates Rio\'s future.',
        'emp.f1.title': 'Preserved History',
        'emp.f1.desc': 'Restored historic mansion of the Baron of Mauá',
        'emp.f2.title': 'Electric Bike Included',
        'emp.f2.desc': 'Each apartment comes with a Lev electric bicycle',
        'emp.f3.title': 'Resort-Style Leisure',
        'emp.f3.desc': 'Pool, gym, sports bar and much more',
        'emp.f4.title': 'Total Mobility',
        'emp.f4.desc': 'VLT, Gentileza Terminal and Bus Station nearby',
        'emp.f5.title': 'Pet Friendly',
        'emp.f5.desc': 'Pet Place and Pet Care in the condominium',
        'emp.f6.title': 'Coworking',
        'emp.f6.desc': 'Modern workspace in the condominium',
        'lazer.tag': 'Complete Leisure',
        'lazer.title': '<span class="highlight">Resort-Style</span> Structure',
        'lazer.i1': 'Pool',
        'lazer.i2': 'Gym',
        'lazer.i3': 'Pilates/Yoga',
        'lazer.i4': 'Sports Bar',
        'lazer.i5': 'Party Room',
        'lazer.i6': 'Playroom',
        'lazer.i7': 'Pet Place',
        'lazer.i8': 'Coworking',
        'stadium.tag': 'The Red-Black Dream',
        'stadium.title': 'The New <span class="highlight-gold">Flamengo Stadium</span>',
        'stadium.p1': 'Flamengo\'s long-awaited own stadium is closer than ever. And you can be even closer!',
        'stadium.p2': 'Imagine walking to the stadium on game days, meeting the Nation in the streets, and returning home after the victory. That\'s truly living Flamengo.',
        'stadium.sf1': 'Walk to the stadium',
        'stadium.sf2': 'Privileged view from your apartment',
        'stadium.sf3': 'Live every victory intensely',
        'videos.tag': 'Immersive Experience',
        'videos.title': 'Discover the <span class="highlight">Project</span>',
        'videos.subtitle': 'See in detail what living at Luzes do Rio will be like.',
        'videos.v1.title': 'Virtual Tour',
        'videos.v2.title': 'Live the Emotion',
        'prices.tag': 'Investment',
        'prices.title': '<span class="highlight">Special</span> Prices',
        'prices.subtitle': 'Exclusive launch conditions. Invest in your red-and-black future.',
        'prices.featured': 'Most Popular',
        'prices.cta': 'I\'m Interested',
        'prices.plantas': 'Apartment Floor Plans',
        'prices.c1.title': '1 Bedroom',
        'prices.c1.size': 'Starting from 31.62m²',
        'prices.c1.desc': 'Ideal for investors and young professionals',
        'prices.c1.f1': 'Integrated balcony',
        'prices.c1.f2': 'Laminate flooring in bedrooms',
        'prices.c1.f3': 'Electric bike included',
        'prices.c1.f4': 'High rental demand',
        'prices.c2.title': '2 Bedrooms',
        'prices.c2.size': 'Starting from 42m²',
        'prices.c2.desc': 'Perfect for families and couples',
        'prices.c2.f1': 'Spacious balcony',
        'prices.c2.f2': 'Laminate flooring in bedrooms',
        'prices.c2.f3': 'Electric bike included',
        'prices.c2.f4': 'Only 8 columns available',
        'prices.c2.f5': 'High appreciation',
        'prices.c3.title': '2 Bedrooms (Corner)',
        'prices.c3.size': 'Larger size',
        'prices.c3.desc': 'More space and comfort for your family',
        'prices.c3.f1': 'Largest size in the line',
        'prices.c3.f2': 'Privileged view',
        'prices.c3.f3': 'Laminate flooring in bedrooms',
        'prices.c3.f4': 'Electric bike included',
        'location.tag': 'Location',
        'location.title': 'In the Heart of <span class="highlight">Porto Maravilha</span>',
        'location.l1.title': 'Gentileza Terminal',
        'location.l1.desc': 'VLT and modal integration',
        'location.l2.title': 'Novo Rio Bus Station',
        'location.l2.desc': 'Connection with all of Brazil',
        'location.l3.title': 'Museum of Tomorrow',
        'location.l3.desc': 'Culture and leisure nearby',
        'location.l4.title': 'Rio Star',
        'location.l4.desc': 'Rio\'s Ferris Wheel',
        'location.l5.title': 'AquaRio',
        'location.l5.desc': 'Largest aquarium in South America',
        'location.l6.title': 'Flamengo Stadium',
        'location.l6.desc': 'Future red-black stadium',
        'contact.tag': 'Contact',
        'contact.title': 'Talk to Our <span class="highlight">Team</span>',
        'contact.subtitle': 'Clear your doubts, schedule a visit or secure your unit. Our team is ready to serve you exclusively.',
        'contact.phone': 'Phone',
        'contact.address': 'Address',
        'contact.partners': 'A realization by:',
        'contact.form.title': 'Sign Up for Special Conditions',
        'contact.form.name': 'Full name',
        'contact.form.email': 'Your best email',
        'contact.form.phone': 'WhatsApp with area code',
        'contact.form.interest': 'Interest in which unit?',
        'contact.form.investment': 'Investment',
        'contact.form.embassy': 'Are you a member of any Embassy?',
        'contact.form.embassy.yes': 'Yes, I am an official member',
        'contact.form.embassy.no': 'No, but I am a fan',
        'contact.form.embassy.interested': 'I\'m interested in learning more',
        'contact.form.message': 'Message (optional)',
        'contact.form.privacy': 'I agree to the Privacy Policy and authorize contact from the Cury team.',
        'contact.form.submit': 'I Want to Be Contacted',
        'contact.form.success.title': 'Registration successful!',
        'contact.form.success.desc': 'Our team will contact you soon.',
        'book.tag': 'Complete Material',
        'book.title': 'Discover All the <span class="highlight">Details</span>',
        'book.subtitle': 'Explore the complete digital book of the development with all information, floor plans and perspectives.',
        'book.cta': 'Request Complete Book',
        'footer.desc': 'The development most connected to Flamengo\'s future and the best of Rio de Janeiro. A Cury Construtora realization.',
        'footer.quick': 'Quick Links',
        'footer.info': 'Information',
        'footer.privacy': 'Privacy Policy',
        'footer.rights': 'All rights reserved.'
    }
};

function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const savedLang = localStorage.getItem('preferredLang') || 'pt';

    currentLang = savedLang;
    setLanguage(savedLang);
    updateWhatsAppLink();

    langBtns.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setLanguage(lang);
            updateWhatsAppLink();
            localStorage.setItem('preferredLang', lang);
        });
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const t = translations[lang];

    elements.forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else if (el.tagName === 'OPTION') {
                el.textContent = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}

/* ===================== WHATSAPP ===================== */
function initWhatsApp() {
    updateWhatsAppLink();
}

function updateWhatsAppLink() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        const message = encodeURIComponent(WHATSAPP_CONFIG.messages[currentLang]);
        whatsappBtn.href = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${message}`;
        whatsappBtn.target = '_blank';
    }
}

/* ===================== MOBILE MENU ===================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ===================== CAROUSELS ===================== */
function initCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        if (slides.length === 0) return;

        let currentIndex = 0;

        // Create dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            currentIndex = index;
            if (currentIndex >= slides.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = slides.length - 1;

            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

        // Auto-advance every 5 seconds
        setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
}

/* ===================== FORM ===================== */
function initForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = currentLang === 'pt' ? 'Redirecionando...' : 'Redirecting...';
        submitBtn.disabled = true;

        // Collect Form Data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const interest = document.getElementById('interest').options[document.getElementById('interest').selectedIndex].text;
        const embassy = document.getElementById('embaixada').options[document.getElementById('embaixada').selectedIndex].text;
        const message = document.getElementById('message').value;

        // Build WhatsApp Message
        let whatsappMsg = `Olá! Gostaria de saber mais sobre o *Luzes do Rio*.\n\n`;
        whatsappMsg += `Me chamo *${name}*.\n`;
        whatsappMsg += `📧 *Email:* ${email}\n`;
        whatsappMsg += `📱 *Telefone:* ${phone}\n`;
        whatsappMsg += `🏠 *Interesse:* ${interest}\n`;

        if (embassy && embassy !== 'Você é membro de alguma Embaixada?' && embassy !== 'Are you a member of any Embassy?') {
            whatsappMsg += `🔴⚫ *Embaixada:* ${embassy}\n`;
        }

        if (message) {
            whatsappMsg += `\n💬 *Mensagem:* ${message}\n`;
        }

        // Encode and Redirect
        const encodedMsg = encodeURIComponent(whatsappMsg);
        const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodedMsg}`;

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            form.style.display = 'none';
            formSuccess.classList.add('show');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });

    // Phone mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
        });
    }
}

/* ===================== COUNTERS ===================== */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}
