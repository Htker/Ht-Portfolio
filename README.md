# HTKER Portfolio

Portfolio personnel statique en HTML/CSS/JS avec routes SPA et panneau d'administration local via `localStorage`.

## Prêt au déploiement

Ce projet est configuré pour un hébergement statique gratuit sur Cloudflare Pages.

### Points importants
- Les routes SPA sont prises en charge via le fichier `_redirects`.
- Le site est compatible avec un déploiement depuis la racine du dépôt.
- L'admin fonctionne localement sans backend ; les modifications sont enregistrées dans le navigateur (localStorage).

## Démarrer localement

```bash
npm run start
```

Puis ouvrir : http://localhost:8000

## Vérifier la syntaxe JavaScript

```bash
npm run check
```

## Déploiement Cloudflare Pages

1. Pousser le dépôt GitHub.
2. Connecter le dépôt dans Cloudflare Pages.
3. Choisir :
   - Framework preset : `None`
   - Build command : laisser vide
   - Output directory : `.`
4. Déployer.

Le fichier `_redirects` permet de gérer les routes comme `/projets`, `/about`, `/contact`, `/admin` sans 404.

## Note utile

L'administration locale est pratique pour un portfolio perso, mais elle n'est pas un vrai CMS backend. Pour une édition partagée ou persistante côté serveur, il faudra ensuite ajouter une base de données et un backend.
