# Plan Détaillé de Déploiement Local - Adorable (Clone Lovable SaaS)

## 📋 Vue d'ensemble du projet

**Adorable** est un clone open-source de Lovable - un agent IA qui peut créer des sites web et applications via une interface de chat. Le projet utilise Next.js, React 19, TypeScript et PostgreSQL.

## 🛠️ Prérequis système

### Versions requises
- **Node.js** : Version 18.x ou supérieure (recommandé: 20.x)
- **npm** : Version 8.x ou supérieure
- **Git** : Pour le contrôle de version
- **PostgreSQL** : Base de données (local ou cloud comme Neon)

### Vérification des prérequis
```bash
node --version    # Doit être >= 18.0.0
npm --version     # Doit être >= 8.0.0
git --version     # Vérifier que git est installé
```

## 🔑 Comptes et clés API nécessaires

### 1. Anthropic API Key
- **Objectif** : Alimenter l'IA qui génère le code
- **Où l'obtenir** : [https://console.anthropic.com](https://console.anthropic.com)
- **Prix** : Pay-per-use, crédit gratuit pour débuter
- **Nécessaire pour** : Fonctionnalité de génération de code IA

### 2. Freestyle API Key
- **Objectif** : Sandboxes pour l'exécution de code et prévisualisation
- **Où l'obtenir** : [https://admin.freestyle.sh/dashboard/api-tokens](https://admin.freestyle.sh/dashboard/api-tokens)
- **Prix** : Actuellement gratuit
- **Nécessaire pour** : Prévisualisation des applications générées

### 3. Stack Auth (Authentification)
- **Objectif** : Gestion des utilisateurs et authentification
- **Où l'obtenir** : [https://app.stack-auth.com](https://app.stack-auth.com)
- **Configuration** : Créer une nouvelle application
- **Important** : Activer "Allow all localhost callbacks for development"

### 4. Base de données PostgreSQL
**Option A - Local :**
```bash
# Installation Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Créer une base de données
sudo -u postgres createdb adorable
sudo -u postgres psql -c "CREATE USER adorable_user WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE adorable TO adorable_user;"
```

**Option B - Cloud (Recommandé pour débuter) :**
- **Neon** : [https://neon.tech](https://neon.tech) (gratuit, facile)
- **Supabase** : Alternative gratuite
- **PlanetScale** : Autre option cloud

## 🚀 Installation étape par étape

### Étape 1 : Clonage et dépendances
```bash
# Le projet est déjà dans /home/scrapybara/SamalehZen/Adorable-Lovable-clone-SaaS
cd /home/scrapybara/SamalehZen/Adorable-Lovable-clone-SaaS

# Installation des dépendances
npm install
```

### Étape 2 : Configuration des variables d'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos vraies valeurs
nano .env
```

**Contenu du fichier .env à remplir :**
```env
# Base de données PostgreSQL
DATABASE_URL=postgresql://adorable_user:your_password@localhost:5432/adorable
# OU pour Neon : postgresql://user:password@hostname.neon.tech/database?sslmode=require

# Clé API Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clé API Freestyle
FREESTYLE_API_KEY=fs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Stack Auth (depuis votre dashboard)
NEXT_PUBLIC_STACK_PROJECT_ID=your-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your-publishable-client-key
STACK_SECRET_SERVER_KEY=your-secret-server-key

# Domaine de prévisualisation (optionnel)
PREVIEW_DOMAIN=votre-domaine.com
```

### Étape 3 : Initialisation de la base de données
```bash
# Pusher le schéma vers la base de données
npx drizzle-kit push
```

Cette commande va créer les tables suivantes :
- `apps` : Applications générées
- `app_users` : Utilisateurs avec permissions
- `messages` : Messages de chat
- `app_deployments` : Déploiements des apps

### Étape 4 : Vérification de la configuration
```bash
# Vérifier que TypeScript compile
npx tsc --noEmit

# Vérifier le linting
npm run lint
```

### Étape 5 : Lancement du serveur de développement
```bash
npm run dev
```

Le serveur sera accessible sur : [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration avancée (Optionnel)

### Domaine de prévisualisation personnalisé
1. Aller sur [Freestyle Dashboard](https://admin.freestyle.sh/dashboard/domains)
2. Vérifier un nouveau domaine
3. Suivre les instructions DNS
4. Ajouter `PREVIEW_DOMAIN=votre-domaine.com` dans .env

### Configuration Stack Auth détaillée
1. Créer une application sur [Stack Auth](https://app.stack-auth.com)
2. Dans Configuration > Domains :
   - Activer "Allow all localhost callbacks for development"
3. Noter les clés depuis le dashboard
4. Configurer les callbacks pour production si nécessaire

## 🧪 Tests et vérification

### Checklist de vérification
- [ ] Le serveur démarre sans erreurs sur localhost:3000
- [ ] La base de données est accessible et les tables sont créées
- [ ] L'authentification fonctionne (inscription/connexion)
- [ ] La génération de code via chat fonctionne
- [ ] La prévisualisation des apps générées fonctionne

### Tests de fonctionnalité
1. **Test d'authentification** : S'inscrire et se connecter
2. **Test de génération** : Demander à l'IA de créer une simple app
3. **Test de prévisualisation** : Vérifier que l'app générée s'affiche
4. **Test de persistence** : Vérifier que les apps sont sauvegardées

## 🚨 Résolution de problèmes courants

### Erreur de base de données
```bash
# Vérifier la connexion
psql $DATABASE_URL -c "SELECT 1;"

# Recréer les tables si nécessaire
npx drizzle-kit push --force
```

### Erreur d'API Anthropic
- Vérifier que la clé API est valide
- Vérifier les crédits disponibles sur le compte
- Tester la clé avec curl :
```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-sonnet-20240229","max_tokens":10,"messages":[{"role":"user","content":"Hi"}]}'
```

### Erreur de build
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json .next
npm install
```

### Port déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

## 🚀 Déploiement en production

### Build de production
```bash
npm run build
npm run start
```

### Utilisation du script de déploiement
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📋 Variables d'environnement - Résumé

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `DATABASE_URL` | ✅ | URL de connexion PostgreSQL |
| `ANTHROPIC_API_KEY` | ✅ | Clé API Anthropic pour l'IA |
| `FREESTYLE_API_KEY` | ✅ | Clé API Freestyle pour sandboxes |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | ✅ | ID projet Stack Auth |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | ✅ | Clé publique Stack Auth |
| `STACK_SECRET_SERVER_KEY` | ✅ | Clé secrète Stack Auth |
| `PREVIEW_DOMAIN` | ❌ | Domaine personnalisé pour prévisualisation |

## 🎯 Prochaines étapes

Une fois le déploiement local réussi :
1. Tester toutes les fonctionnalités
2. Personnaliser l'interface si nécessaire
3. Configurer un domaine personnalisé
4. Planifier le déploiement en production (Vercel, Railway, etc.)
5. Mettre en place la monitoring et les analytics

## 📞 Support

- **Documentation officielle** : README.md du projet
- **Issues GitHub** : Pour reporter des bugs
- **Discord Freestyle** : Pour l'aide sur l'API Freestyle
- **Stack Auth Docs** : Pour l'authentification

---

**Note importante** : Ce projet nécessite des clés API payantes pour fonctionner pleinement. Assurez-vous de comprendre les coûts associés avant de l'utiliser en production.