window.portfolioCategories = [
    { id: 'all', name: 'Tous', slug: 'all' },
    { id: 'branding', name: 'Branding', slug: 'branding' },
    { id: 'design', name: 'Design', slug: 'design' },
    { id: 'site-web', name: 'Site Web', slug: 'site-web' },
    { id: 'ui-ux', name: 'UI/UX', slug: 'ui-ux' },
    { id: 'photographie', name: 'Photographie', slug: 'photographie' },
    { id: 'video', name: 'Vidéo', slug: 'video' },
    { id: 'communication', name: 'Communication', slug: 'communication' }
];

window.portfolioProjects = [{
        id: 'enessi',
        slug: 'enessi',
        number: '01',
        year: '2026',
        title: 'ENESSI',
        client: 'ENESSI',
        category: 'Branding',
        categorySlug: 'branding',
        summary: 'Identité visuelle, packaging et communication de marque pour une marque premium émergente.',
        description: 'Une refonte complète de l’identité visuelle et de la présence digitale d’ENESSI, pensée pour une communication plus premium et cohérente.',
        coverImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        logo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
        ],
        tags: ['Branding', 'Packaging', 'Design', 'Communication'],
        services: ['Direction artistique', 'Identité visuelle', 'Packaging'],
        status: 'published',
        order: 1,
        sections: [
            { title: 'Présentation', body: 'Refonte complète d’une identité et d’une présence visuelle pour sortir d’une communication standard.' },
            { title: 'Palette', body: 'Palette monochrome avec accents chauds et contrastes premium.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' }
        ]
    },
    {
        id: 'lokaale',
        slug: 'lokaale',
        number: '02',
        year: '2025',
        title: 'LOKAALE',
        client: 'LOKAALE',
        category: 'Site Web',
        categorySlug: 'site-web',
        summary: 'Site vitrine premium orienté storytelling, performances et expérience utilisateur moderne.',
        description: 'Une présence Web pensée pour raconter l’histoire de la marque et convertir les visiteurs en clients.',
        coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
        logo: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
        ],
        tags: ['Web', 'UI/UX', 'Design', 'Storytelling'],
        services: ['Design Web', 'UI/UX', 'Développement front'],
        status: 'published',
        order: 2,
        sections: [
            { title: 'Objectif', body: 'Créer un site qui raconte la marque avec clarté et élégance sans surcharge.' }
        ]
    },
    {
        id: 'phenix',
        slug: 'phenix',
        number: '03',
        year: '2025',
        title: 'Phénix',
        client: 'Phénix Studio',
        category: 'Design',
        categorySlug: 'design',
        summary: 'Série de visuels éditoriaux pour une communication visuelle plus forte et plus mémorable.',
        description: 'Direction visuelle basée sur contrastes, rythme et typographie pour renforcer l’identité d’un studio créatif.',
        coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
        logo: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
        images: [
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
        ],
        tags: ['Design', 'Art direction', 'Editorial'],
        services: ['Conception visuelle', 'Art direction', 'Branding'],
        status: 'draft',
        order: 3,
        sections: [
            { title: 'Concept', body: 'Une direction visuelle qui mélange minimalisme, énergie et composition audacieuse.' }
        ]
    }
];