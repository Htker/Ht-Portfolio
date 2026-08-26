const sectionOrder = ['home', 'about', 'services', 'skills', 'portfolio', 'experience', 'contact'];

const portfolioProjects = [{
        id: 'htker-card',
        number: '01',
        year: '2025',
        title: 'Htker · Carte de visite',
        category: 'Web · Identité',
        summary: 'Site link-in-bio brutalist construit en HTML/CSS pur, avec marque graffiti et palette acide signature.',
        link: 'https://htker.github.io/htker-catre-visite/',
        logo: 'https://id-preview--660a7d4d-1afb-4dd2-95de-f94be3557045.lovable.app/__l5e/assets-v1/59d684d7-4615-4497-ae0c-2d6a43f29e8f/htker-card.png',
        images: [
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
        ],
        tags: ['HTML', 'CSS', 'Design', 'Branding'],
        description: 'Une page unique qui sert de carte de visite digitale : identité visuelle claire, typographie tranchée, palette acide et storytelling brutaliste.',
        deliverables: ['Logo', 'Palette visuelle', 'Page de présentation', 'Identité numérique']
    },
    {
        id: 'acid-brand',
        number: '02',
        year: '2025',
        title: 'Acid Brand System',
        category: 'Identité visuelle',
        summary: 'Logo, système de marque, éléments print et direction créative pour une identité audacieuse.',
        link: '#',
        logo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
        images: [
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
        ],
        tags: ['Branding', 'Logo', 'Print', 'Direction artistique'],
        description: 'Système de marque pensé pour une présence forte et mémorable, avec des éléments visuels modulaires et une identité facilement reproductible en print et digital.',
        deliverables: ['Logo', 'Palette chromatique', 'Mockups', 'Assets de marque']
    },
    {
        id: 'lome-logistics',
        number: '03',
        year: '2024',
        title: 'Lomé Logistics Ops',
        category: 'DevOps · Outil interne',
        summary: 'Node, Docker, dashboard et workflow interne pour la gestion opérationnelle et la logistique digitale.',
        link: '#',
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        images: [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1558494949-b640bbd9d89d?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80'
        ],
        tags: ['Node', 'Docker', 'Dashboard', 'DevOps'],
        description: 'Un système interne pensé pour simplifier les tâches de logistique et d’exploitation quotidienne, avec contrôle visuel, suivi et automatisation des étapes clés.',
        deliverables: ['Dashboard', 'Automatisation', 'Structure technique', 'UX interne']
    },
    {
        id: 'mixtape-cover',
        number: '04',
        year: '2024',
        title: 'Mixtape Cover Series',
        category: 'Graphic Design',
        summary: 'Print, typo, collage visuel et direction artistique pour une série de couvertures mémorables.',
        link: '#',
        logo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
        images: [
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
        ],
        tags: ['Print', 'Typo', 'Collage', 'Art direction'],
        description: 'Série de couvertures visuelles pensée comme une collection cohérente avec une forte identité typographique, des palettes agressives et une composition singulière.',
        deliverables: ['Covers', 'Direction artistique', 'Print', 'Packaging visuel']
    }
];

const renderPortfolio = () => {
        const grid = document.getElementById('portfolio-grid');
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('project-modal-content');

        if (!grid) {
            return;
        }

        grid.innerHTML = portfolioProjects.map((project) => `
        <article class="portfolio__card" data-project-id="${project.id}">
            <div class="portfolio__media">
                <img src="${project.logo}" alt="${project.title}" loading="lazy">
            </div>
            <div class="portfolio__body">
                <span class="portfolio__tag">№ ${project.number} · ${project.year}</span>
                <h3>${project.title}</h3>
                <p class="portfolio__category">${project.category}</p>
                <p>${project.summary}</p>
                <button class="portfolio__button" type="button" data-project-id="${project.id}">Voir le projet</button>
            </div>
        </article>
    `).join('');

        const openProject = (projectId) => {
                const project = portfolioProjects.find((item) => item.id === projectId);

                if (!project || !modal || !modalContent) {
                    return;
                }

                modalContent.innerHTML = `
            <div class="project-modal__header">
                <div>
                    <span class="portfolio__tag">№ ${project.number} · ${project.year}</span>
                    <h3 id="project-modal-title">${project.title}</h3>
                    <p class="portfolio__category">${project.category}</p>
                </div>
                ${project.link && project.link !== '#' ? `<a class="project-modal__link" href="${project.link}" target="_blank" rel="noreferrer">Voir le site ↗</a>` : ''}
            </div>

            <div class="project-modal__hero">
                <img src="${project.logo}" alt="${project.title}">
            </div>

            <div class="project-modal__content">
                <p>${project.description}</p>

                <div class="project-modal__tags">
                    ${project.tags.map((tag) => `<span>${tag}</span>`).join('')}
                </div>

                <div class="project-modal__grid">
                    ${project.images.map((image) => `
                        <figure class="project-modal__figure">
                            <img src="${image}" alt="${project.title} visuel" loading="lazy">
                        </figure>
                    `).join('')}
                </div>

                <div class="project-modal__deliverables">
                    <h4>Livrables</h4>
                    <ul>
                        ${project.deliverables.map((item) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeProject = () => {
        if (!modal) {
            return;
        }

        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    grid.querySelectorAll('[data-project-id]').forEach((card) => {
        const button = card.querySelector('.portfolio__button');
        const trigger = button || card;

        trigger.addEventListener('click', (event) => {
            event.stopPropagation();
            const projectId = trigger.getAttribute('data-project-id') || card.getAttribute('data-project-id');
            openProject(projectId);
        });
    });

    if (modal) {
        modal.querySelector('[data-close="true"]').addEventListener('click', closeProject);
        modal.querySelector('.project-modal__close').addEventListener('click', closeProject);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeProject();
            }
        });
    }
};

const loadSections = async() => {
    const appRoot = document.getElementById('app');

    if (!appRoot) {
        return;
    }

    for (const sectionName of sectionOrder) {
        try {
            const response = await fetch(`sections/${sectionName}.html`);

            if (!response.ok) {
                throw new Error(`Impossible de charger ${sectionName}.html`);
            }

            const markup = await response.text();
            appRoot.insertAdjacentHTML('beforeend', markup);
        } catch (error) {
            console.error(error);
        }
    }

    renderPortfolio();
    initMenu();
    initAnimations();
};

const initMenu = () => {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-menu');

    if (!toggle || !nav) {
        return;
    }

    toggle.onclick = () => {
        nav.classList.toggle('show');
    };

    nav.querySelectorAll('.nav__link').forEach((link) => {
        link.onclick = () => nav.classList.remove('show');
    });
};

const initAnimations = () => {
    if (typeof gsap === 'undefined') {
        return;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

    timeline
        .to('.first', { duration: 1.5, delay: .5, top: '-100%' })
        .to('.second', { duration: 1.5, delay: .2, top: '-100%' }, '<')
        .to('.third', { duration: 1.5, delay: .2, top: '-100%' }, '<');

    gsap.from('.home__img', { opacity: 0, duration: 2, delay: 2, x: 60 });
    gsap.from('.home__information', { opacity: 0, duration: 3, delay: 2.3, y: 25 });
    gsap.from('.anime-text', { opacity: 0, duration: 3, delay: 2.3, y: 25, stagger: .3 });
    gsap.from('.nav__logo', { opacity: 0, duration: 3, delay: 3.2, y: 25 });
    gsap.from('.nav__item', { opacity: 0, duration: 3, delay: 3.2, y: 25, stagger: .2 });
    gsap.from('.home__social-icon', { opacity: 0, duration: 3, delay: 4, y: 25, stagger: .2 });
};

loadSections();