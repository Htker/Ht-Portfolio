const STORAGE_KEY = 'ht_portfolio_state_v1';
const sectionOrder = ['home', 'about', 'services', 'skills', 'portfolio', 'experience', 'contact'];

const slugify = (value = '') => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const getDefaultCategories = () => [
    { id: 'all', name: 'Tous', slug: 'all' },
    { id: 'branding', name: 'Branding', slug: 'branding' },
    { id: 'design', name: 'Design', slug: 'design' },
    { id: 'site-web', name: 'Site Web', slug: 'site-web' },
    { id: 'ui-ux', name: 'UI/UX', slug: 'ui-ux' },
    { id: 'photographie', name: 'Photographie', slug: 'photographie' },
    { id: 'video', name: 'Vidéo', slug: 'video' },
    { id: 'communication', name: 'Communication', slug: 'communication' }
];

const getPortfolioState = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.warn('Portfolio state invalid, reset in progress.', error);
        }
    }

    const initialState = {
        categories: getDefaultCategories(),
        projects: (window.portfolioProjects || []).map((project, index) => ({
            ...project,
            status: project.status || 'published',
            order: project.order ? ? (index + 1),
            categorySlug: project.categorySlug || slugify(project.category || 'Autres')
        }))
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
    return initialState;
};

const savePortfolioState = (state) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const getProjects = () => {
    const state = getPortfolioState();
    return [...(state.projects || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
};

const getCategories = () => {
    const state = getPortfolioState();
    const categories = state.categories || getDefaultCategories();
    return [{ id: 'all', name: 'Tous', slug: 'all' }, ...categories.filter((category) => category.slug !== 'all')];
};

const normalizeRoute = (value = '/') => {
    const raw = String(value || '/').trim();
    if (!raw || raw === '#') {
        return '/';
    }

    const cleaned = raw.startsWith('#/') ? raw.slice(1) : raw;
    const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    return withSlash.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
};

const getCurrentRoute = () => {
    const hashRoute = window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : null;
    const staticRoute = window.__STATIC_ROUTE__ || null;
    const path = hashRoute || staticRoute || window.location.pathname;
    return normalizeRoute(path || '/');
};

const routeTo = (path) => {
    const target = normalizeRoute(path);
    history.pushState({}, '', target);
};

const htmlEscape = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

const bindRouteLinks = () => {
    document.querySelectorAll('[data-route]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('data-route');
            if (!target) {
                return;
            }
            event.preventDefault();
            routeTo(target);
            renderApp();
        });
    });
};

const initMenu = () => {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-menu');

    if (!toggle || !nav) {
        return;
    }

    toggle.onclick = () => nav.classList.toggle('show');
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

const renderHomePage = async() => {
    const app = document.getElementById('app');
    if (!app) {
        return;
    }

    app.innerHTML = '';

    for (const sectionName of sectionOrder) {
        try {
            const response = await fetch(`/sections/${sectionName}.html`);
            if (!response.ok) {
                throw new Error(`Section ${sectionName} introuvable.`);
            }
            const markup = await response.text();
            app.insertAdjacentHTML('beforeend', markup);
        } catch (error) {
            console.error(error);
        }
    }

    bindRouteLinks();
    initMenu();
    initAnimations();
};

const renderStaticSection = async(routeName) => {
    const app = document.getElementById('app');
    if (!app) {
        return;
    }

    try {
        const response = await fetch(`/sections/${routeName}.html`);
        if (!response.ok) {
            throw new Error(`Section ${routeName} introuvable.`);
        }

        const markup = await response.text();
        app.innerHTML = markup;
        bindRouteLinks();
        initMenu();
    } catch (error) {
        console.error(error);
        app.innerHTML = '<main class="l-main bd-grid"><section class="portfolio-page"><p>Erreur de chargement.</p></section></main>';
    }
};

const renderProjectCard = (project) => `
    <article class="portfolio__card">
        <div class="portfolio__media">
            <img src="${project.coverImage || project.logo || project.images?.[0] || ''}" alt="${htmlEscape(project.title)}" loading="lazy">
        </div>
        <div class="portfolio__body">
            <span class="portfolio__tag">${htmlEscape(project.client || 'Projet')} · ${htmlEscape(project.year || '2026')}</span>
            <h3>${htmlEscape(project.title)}</h3>
            <p class="portfolio__category">${htmlEscape(project.category || 'Autres')}</p>
            <p>${htmlEscape(project.summary || project.description || '')}</p>
            <div class="portfolio__tags">
                ${(project.tags || []).slice(0, 3).map((tag) => `<span>${htmlEscape(tag)}</span>`).join('')}
            </div>
            <a href="/projets/${project.categorySlug || 'all'}/${project.slug || project.id}" class="portfolio__button" data-route="/projets/${project.categorySlug || 'all'}/${project.slug || project.id}">Voir le projet</a>
        </div>
    </article>
`;

const renderPortfolioPage = () => {
    const route = getCurrentRoute();
    const selectedCategory = route === '/projets' ? 'all' : route.split('/').filter(Boolean)[1] || 'all';
    const allProjects = getProjects().filter((project) => project.status === 'published');
    const filteredProjects = selectedCategory === 'all'
        ? allProjects
        : allProjects.filter((project) => (project.categorySlug || slugify(project.category || 'Autres')) === selectedCategory);

    const filters = getCategories().map((category) => {
        const isActive = category.slug === selectedCategory;
        const routePath = category.slug === 'all' ? '/projets' : `/projets/${category.slug}`;
        return `<a class="portfolio__filter ${isActive ? 'is-active' : ''}" href="${routePath}" data-route="${routePath}">${htmlEscape(category.name)}</a>`;
    }).join('');

    const content = filteredProjects.length
        ? filteredProjects.map(renderProjectCard).join('')
        : '<div class="portfolio__empty"><h3>Aucun projet dans cette catégorie.</h3><p>Ajoutez-en un depuis l’admin.</p></div>';

    const app = document.getElementById('app');
    if (!app) {
        return;
    }

    app.innerHTML = `
        <main class="l-main bd-grid portfolio-shell">
            <section class="portfolio-page">
                <div class="section__header section__header--compact">
                    <span class="section__eyebrow">Portfolio</span>
                    <h2>Projets sélectionnés</h2>
                </div>

                <div class="portfolio__filters" aria-label="Catégories du portfolio">${filters}</div>

                <div class="portfolio__grid portfolio__grid--full">${content}</div>
            </section>
        </main>
    `;

    bindRouteLinks();
    initMenu();
};

const renderProjectDetail = (projectSlug) => {
    const app = document.getElementById('app');
    if (!app) {
        return;
    }

    const route = getCurrentRoute();
    const routeParts = route.split('/').filter(Boolean);
    const currentCategory = routeParts[1] || 'all';
    const allPublished = getProjects().filter((project) => project.status === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
    const project = allPublished.find((item) => (item.slug || item.id) === projectSlug);

    if (!project) {
        app.innerHTML = `
            <main class="l-main bd-grid portfolio-shell">
                <section class="portfolio-page">
                    <div class="project-not-found">
                        <span class="section__eyebrow">404</span>
                        <h2>Projet introuvable</h2>
                        <p>Le projet demandé n’existe pas ou n’est plus publié.</p>
                        <a href="/projets" class="portfolio__button" data-route="/projets">Retour au portfolio</a>
                    </div>
                </section>
            </main>
        `;
        bindRouteLinks();
        return;
    }

    const projectIndex = allPublished.findIndex((item) => (item.slug || item.id) === projectSlug);
    const previousProject = allPublished[projectIndex - 1];
    const nextProject = allPublished[projectIndex + 1];
    const previousRoute = previousProject ? `/projets/${previousProject.categorySlug || 'all'}/${previousProject.slug || previousProject.id}` : `/projets/${currentCategory !== 'all' ? currentCategory : 'all'}`;
    const nextRoute = nextProject ? `/projets/${nextProject.categorySlug || 'all'}/${nextProject.slug || nextProject.id}` : `/projets/${currentCategory !== 'all' ? currentCategory : 'all'}`;

    const gallery = (project.images || []).map((image) => `
        <figure class="project-page__gallery-item">
            <img src="${image}" alt="${htmlEscape(project.title)}" loading="lazy">
        </figure>
    `).join('');

    const blocks = (project.sections || []).map((block) => `
        <article class="project-page__block">
            ${block.title ? `<h3>${htmlEscape(block.title)}</h3>` : ''}
            ${block.body ? `<p>${htmlEscape(block.body)}</p>` : ''}
            ${block.image ? `<img src="${block.image}" alt="${htmlEscape(block.title || project.title)}" loading="lazy">` : ''}
        </article>
    `).join('');

    app.innerHTML = `
        <main class="l-main bd-grid portfolio-shell">
            <article class="project-page">
                <header class="project-page__header">
                    <div>
                        <span class="section__eyebrow">${htmlEscape(project.category || 'Projet')}</span>
                        <h2>${htmlEscape(project.title)}</h2>
                    </div>
                    <a href="/projets/${project.categorySlug || 'all'}" class="project-page__back" data-route="/projets/${project.categorySlug || 'all'}">Retour aux projets</a>
                </header>

                <div class="project-page__hero">
                    <img src="${project.coverImage || project.logo || project.images?.[0] || ''}" alt="${htmlEscape(project.title)}">
                </div>

                <div class="project-page__meta">
                    <div><span>Client</span><strong>${htmlEscape(project.client || 'Client')}</strong></div>
                    <div><span>Année</span><strong>${htmlEscape(project.year || '2026')}</strong></div>
                    <div><span>Catégorie</span><strong>${htmlEscape(project.category || 'Autres')}</strong></div>
                    <div><span>Services</span><strong>${htmlEscape((project.services || ['Direction créative']).join(', '))}</strong></div>
                </div>

                <div class="project-page__summary">
                    <p>${htmlEscape(project.description || project.summary || '')}</p>
                    <div class="portfolio__tags">
                        ${(project.tags || []).map((tag) => `<span>${htmlEscape(tag)}</span>`).join('')}
                    </div>
                </div>

                ${blocks}

                <div class="project-page__gallery">
                    ${gallery || '<p>Aucune image supplémentaire pour le moment.</p>'}
                </div>

                <div class="project-page__nav">
                    <a href="${previousRoute}" class="project-page__nav-link" data-route="${previousRoute}">← Projet précédent</a>
                    <a href="${nextRoute}" class="project-page__nav-link" data-route="${nextRoute}">Projet suivant →</a>
                </div>
            </article>
        </main>
    `;

    bindRouteLinks();
    initMenu();
};

const renderAdminPage = () => {
    const app = document.getElementById('app');
    if (!app) {
        return;
    }

    const state = getPortfolioState();
    const projectRows = getProjects().map((project) => `
        <tr>
            <td>${htmlEscape(project.title)}</td>
            <td>${htmlEscape(project.category || 'Autres')}</td>
            <td>${htmlEscape(project.status || 'published')}</td>
            <td>
                <button type="button" class="admin__action" data-action="edit-project" data-project-id="${project.id}">Modifier</button>
                <button type="button" class="admin__action admin__action--danger" data-action="delete-project" data-project-id="${project.id}">Supprimer</button>
            </td>
        </tr>
    `).join('');

    const categoryRows = (state.categories || getDefaultCategories()).filter((category) => category.slug !== 'all').map((category) => `
        <li>
            <span>${htmlEscape(category.name)}</span>
            <button type="button" class="admin__action admin__action--danger" data-action="delete-category" data-category-id="${category.id}">Supprimer</button>
        </li>
    `).join('');

    app.innerHTML = `
        <main class="l-main bd-grid portfolio-shell">
            <section class="admin-panel">
                <div class="section__header section__header--compact">
                    <span class="section__eyebrow">Admin</span>
                    <h2>Gestion du portfolio</h2>
                </div>

                <div class="admin__grid">
                    <div class="admin__card">
                        <h3>+ Nouveau projet</h3>
                        <form id="project-form" class="admin__form">
                            <input type="hidden" name="project-id" id="project-id">
                            <label>
                                Titre
                                <input type="text" name="title" required>
                            </label>
                            <label>
                                Slug
                                <input type="text" name="slug" placeholder="ex: enessi">
                            </label>
                            <label>
                                Client
                                <input type="text" name="client">
                            </label>
                            <label>
                                Année
                                <input type="text" name="year" value="2026">
                            </label>
                            <label>
                                Catégorie
                                <select name="category">
                                    ${getCategories().filter((category) => category.slug !== 'all').map((category) => `<option value="${category.slug}">${htmlEscape(category.name)}</option>`).join('')}
                                </select>
                            </label>
                            <label>
                                Statut
                                <select name="status">
                                    <option value="published">Publié</option>
                                    <option value="draft">Brouillon</option>
                                </select>
                            </label>
                            <label>
                                Ordre
                                <input type="number" name="order" value="1">
                            </label>
                            <label>
                                Description
                                <textarea name="description" rows="4"></textarea>
                            </label>
                            <label>
                                Image principale
                                <input type="url" name="coverImage" placeholder="https://...">
                            </label>
                            <label>
                                Tags
                                <input type="text" name="tags" placeholder="Branding, Design, Packaging">
                            </label>
                            <div class="admin__form-actions">
                                <button type="submit" class="portfolio__button">Enregistrer</button>
                                <button type="button" class="admin__button admin__button--secondary" id="project-form-cancel" hidden>Annuler</button>
                            </div>
                        </form>
                    </div>

                    <div class="admin__card">
                        <h3>Catégories</h3>
                        <form id="category-form" class="admin__form admin__form--compact">
                            <label>
                                Nom de la catégorie
                                <input type="text" name="category-name" required>
                            </label>
                            <button type="submit" class="portfolio__button">Ajouter</button>
                        </form>
                        <ul class="admin__category-list">${categoryRows || '<li>Aucune catégorie pour le moment.</li>'}</ul>
                    </div>
                </div>

                <div class="admin__card admin__card--wide">
                    <h3>Projets existants</h3>
                    <table class="admin__table">
                        <thead>
                            <tr>
                                <th>Projet</th>
                                <th>Catégorie</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>${projectRows || '<tr><td colspan="4">Aucun projet.</td></tr>'}</tbody>
                    </table>
                </div>
            </section>
        </main>
    `;

    bindRouteLinks();
    initMenu();

    const projectForm = document.getElementById('project-form');
    const categoryForm = document.getElementById('category-form');
    const projectSubmitButton = projectForm?.querySelector('button[type="submit"]');
    const projectCancelButton = document.getElementById('project-form-cancel');

    const resetProjectFormState = () => {
        if (!projectForm) {
            return;
        }

        projectForm.reset();
        projectForm.elements['project-id'].value = '';
        projectForm.elements.year.value = '2026';
        projectForm.elements.status.value = 'published';
        projectForm.elements.order.value = '1';

        if (projectSubmitButton) {
            projectSubmitButton.textContent = 'Enregistrer';
        }

        if (projectCancelButton) {
            projectCancelButton.hidden = true;
        }
    };

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = new FormData(projectForm);
        const raw = Object.fromEntries(form.entries());
        const state = getPortfolioState();
        const category = (state.categories || getDefaultCategories()).find((item) => item.slug === raw.category) || { name: 'Autres', slug: 'autres' };
        const normalizedProject = {
            id: raw['project-id'] || slugify(raw.title || 'nouveau-projet'),
            slug: raw.slug || slugify(raw.title || 'nouveau-projet'),
            client: raw.client || 'Client',
            year: raw.year || '2026',
            category: category.name,
            categorySlug: category.slug,
            description: raw.description || 'Description de projet.',
            summary: raw.description || 'Description de projet.',
            coverImage: raw.coverImage || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
            logo: raw.coverImage || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
            images: [raw.coverImage || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'],
            tags: (raw.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
            services: ['Direction créative', 'Design', 'Production'],
            status: raw.status || 'published',
            order: Number(raw.order || 1),
            title: raw.title || 'Projet sans titre'
        };

        const existingIndex = state.projects.findIndex((project) => project.id === normalizedProject.id || project.slug === normalizedProject.slug);
        if (existingIndex >= 0) {
            state.projects[existingIndex] = { ...state.projects[existingIndex], ...normalizedProject };
        } else {
            state.projects.push(normalizedProject);
        }

        savePortfolioState(state);
        resetProjectFormState();
        renderAdminPage();
    });

    projectCancelButton?.addEventListener('click', () => {
        resetProjectFormState();
        projectForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    categoryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = new FormData(categoryForm);
        const value = (form.get('category-name') || '').toString().trim();
        if (!value) {
            return;
        }

        const state = getPortfolioState();
        const slug = slugify(value);
        if (!state.categories.some((category) => category.slug === slug)) {
            state.categories.push({ id: slug, name: value, slug, description: value });
            savePortfolioState(state);
        }

        renderAdminPage();
    });

    document.querySelectorAll('[data-action="delete-project"]').forEach((button) => {
        button.addEventListener('click', () => {
            const state = getPortfolioState();
            state.projects = state.projects.filter((project) => project.id !== button.dataset.projectId);
            savePortfolioState(state);
            renderAdminPage();
        });
    });

    document.querySelectorAll('[data-action="delete-category"]').forEach((button) => {
        button.addEventListener('click', () => {
            const state = getPortfolioState();
            state.categories = state.categories.filter((category) => category.id !== button.dataset.categoryId && category.slug !== 'all');
            savePortfolioState(state);
            renderAdminPage();
        });
    });

    document.querySelectorAll('[data-action="edit-project"]').forEach((button) => {
        button.addEventListener('click', () => {
            const project = getProjects().find((item) => item.id === button.dataset.projectId);
            if (!project) {
                return;
            }

            const form = document.getElementById('project-form');
            form.elements['project-id'].value = project.id;
            form.elements.title.value = project.title || '';
            form.elements.slug.value = project.slug || '';
            form.elements.client.value = project.client || '';
            form.elements.year.value = project.year || '2026';
            form.elements.category.value = project.categorySlug || slugify(project.category || 'autres');
            form.elements.status.value = project.status || 'published';
            form.elements.order.value = project.order || 1;
            form.elements.description.value = project.description || project.summary || '';
            form.elements.coverImage.value = project.coverImage || project.logo || '';
            form.elements.tags.value = (project.tags || []).join(', ');

            if (projectSubmitButton) {
                projectSubmitButton.textContent = 'Mettre à jour';
            }

            if (projectCancelButton) {
                projectCancelButton.hidden = false;
            }

            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
};

const renderApp = async () => {
    const route = getCurrentRoute();
    const segments = route.split('/').filter(Boolean);

    if (route === '/' || route === '/home' || route === '/accueil') {
        await renderHomePage();
        return;
    }

    if (route === '/projets' || (segments[0] === 'projets' && !segments[2])) {
        renderPortfolioPage();
        return;
    }

    if (segments[0] === 'projets' && segments[2]) {
        renderProjectDetail(segments[2]);
        return;
    }

    if (route === '/about' || route === '/services' || route === '/contact' || route === '/skills') {
        const sectionName = route.replace('/', '') || 'home';
        await renderStaticSection(sectionName);
        return;
    }

    if (route === '/admin') {
        renderAdminPage();
        return;
    }

    await renderHomePage();
};

window.addEventListener('popstate', renderApp);
window.addEventListener('DOMContentLoaded', () => {
    initMenu();
    bindRouteLinks();
    renderApp();
});

if (document.readyState !== 'loading') {
    initMenu();
    bindRouteLinks();
    renderApp();
}