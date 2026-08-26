const sectionOrder = ['home', 'about', 'services', 'skills', 'portfolio', 'experience', 'contact'];
const portfolioProjects = Array.isArray(window.portfolioProjects) ? window.portfolioProjects : [];

const renderPortfolio = () => {
        const grid = document.getElementById('portfolio-grid');
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('project-modal-content');

        if (!grid || !portfolioProjects.length) {
            return;
        }

        grid.innerHTML = portfolioProjects
            .map(
                (project) => `
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
            `
            )
            .join('');

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
                    ${project.images
                        .map(
                            (image) => `
                                <figure class="project-modal__figure">
                                    <img src="${image}" alt="${project.title} visuel" loading="lazy">
                                </figure>
                            `
                        )
                        .join('')}
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
        const backdrop = modal.querySelector('[data-close="true"]');
        const closeButton = modal.querySelector('.project-modal__close');

        backdrop?.addEventListener('click', closeProject);
        closeButton?.addEventListener('click', closeProject);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeProject();
            }
        });
    }
};

const loadSections = async () => {
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
        .to('.first', { duration: 1.5, delay: 0.5, top: '-100%' })
        .to('.second', { duration: 1.5, delay: 0.2, top: '-100%' }, '<')
        .to('.third', { duration: 1.5, delay: 0.2, top: '-100%' }, '<');

    gsap.from('.home__img', { opacity: 0, duration: 2, delay: 2, x: 60 });
    gsap.from('.home__information', { opacity: 0, duration: 3, delay: 2.3, y: 25 });
    gsap.from('.anime-text', { opacity: 0, duration: 3, delay: 2.3, y: 25, stagger: 0.3 });
    gsap.from('.nav__logo', { opacity: 0, duration: 3, delay: 3.2, y: 25 });
    gsap.from('.nav__item', { opacity: 0, duration: 3, delay: 3.2, y: 25, stagger: 0.2 });
    gsap.from('.home__social-icon', { opacity: 0, duration: 3, delay: 4, y: 25, stagger: 0.2 });
};

loadSections();