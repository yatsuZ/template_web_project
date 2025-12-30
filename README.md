# Template Web Project

Template pour demarrer rapidement un projet web avec Docker + Node.js + Fastify + TypeScript + EJS.

## Structure

```
.
├── Makefile              # Commandes make
├── docker-compose.yml    # Config Docker
├── Docker/node/          # Dockerfile
└── code/
    ├── package.json
    ├── tsconfig.json
    └── srcs/
        ├── backend/
        │   ├── main.ts           # Point d'entree
        │   ├── config/fastify.ts # Config serveur (EJS + static)
        │   ├── routes/           # Routes API
        │   └── utils/logger.ts   # Logger couleurs
        └── static/
            ├── views/            # Templates EJS
            ├── css/              # Styles
            └── js/               # Scripts
```

## Commandes

### Local (sans Docker)

```bash
make local       # Build + run
make install     # Installer les dependances
make redev       # Clean + rebuild + run
make clean       # Supprimer dist/
make fclean      # Supprimer dist/ + node_modules/
```

### Docker

```bash
make docker      # Build + start containers
make stop        # Stop containers
make logs        # Voir les logs
make go_in       # Entrer dans le container
make clean_dock  # Supprimer images + volumes
make re_docker   # Rebuild complet
```

## Utilisation

### Avec Docker
1. Cloner ce repo
2. `make docker`
3. Ouvrir http://localhost:3000

### Avec Dev Container (VS Code)
Dev Container permet de developper directement dans un container Docker. Tout l'environnement (Node, npm, extensions) est isole et identique pour tous les devs.

1. Ouvrir le projet dans VS Code
2. Installer l'extension "Dev Containers"
3. `Ctrl+Shift+P` > "Dev Containers: Reopen in Container"
4. Le container demarre et tu peux dev directement dedans

## Ajouter une route API

1. Creer `code/srcs/backend/routes/api/ma-route.ts` :
```typescript
import { FastifyInstance } from 'fastify';

export async function maRoute(fastify: FastifyInstance) {
    fastify.get('/exemple', async () => {
        return { message: 'Hello!' };
    });
}
```

2. L'importer dans `routes/index.ts` :
```typescript
import { maRoute } from './api/ma-route.js';

// Dans setupRoutes():
await fastify.register(maRoute, { prefix: '/api' });
```

3. Accessible sur http://localhost:3000/api/exemple
