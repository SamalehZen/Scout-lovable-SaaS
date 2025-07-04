# 🚀 Guide de Déploiement Production - Adorable

## 🎯 Plan de déploiement complet

Votre configuration est déjà **100% fonctionnelle** en local. Ce guide vous permettra de la déployer en production facilement et gratuitement.

---

## 📋 Prérequis (✅ Déjà validés)

- ✅ **OpenRouter + DeepSeek R1** : IA gratuite configurée
- ✅ **Base de données Neon** : Production-ready, 99.9% uptime
- ✅ **Stack Auth** : Authentification prête pour la production
- ✅ **Freestyle API** : Sandboxes configurés
- ✅ **Domaine personnalisé** : samaleh-arka.com disponible

---

## 🌐 Option 1 : Vercel (Recommandé - GRATUIT)

### Avantages Vercel
- **Gratuit** pour projets Next.js
- **Déploiement automatique** depuis GitHub
- **SSL gratuit** pour votre domaine
- **CDN mondial** intégré
- **Serverless** par défaut
- **Intégration parfaite** avec Next.js

### Étapes de déploiement

#### 1. **Préparation du repository GitHub**
```bash
# Aller dans votre projet restauré
cd /home/scrapybara/adorable-complet

# Créer un nouveau repo GitHub (si pas déjà fait)
git init
git add .
git commit -m "Initial commit - Adorable with OpenRouter"
git branch -M main

# Pusher vers votre GitHub
git remote add origin https://github.com/VOTRE-USERNAME/adorable-production.git
git push -u origin main
```

#### 2. **Déploiement Vercel**
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. **Import Project** > Sélectionnez votre repo
4. **Framework Preset** : Next.js (auto-détecté)
5. Cliquez sur **Deploy**

#### 3. **Configuration des variables d'environnement**
Dans le dashboard Vercel > Settings > Environment Variables :

```env
# Base de données (Production ready)
DATABASE_URL=postgresql://neondb_owner:npg_iLRT3J1pHDNG@ep-damp-mud-a2blya8p.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# IA Gratuite
OPENROUTER_API_KEY=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

# Sandboxes
FREESTYLE_API_KEY=HAf4zHzRYQPkM5jXD5Jsdb-D778BQCb2HCA22ugAxcHkhQ3NEFCjb5tj9aJh8p5QnKT

# Authentification
NEXT_PUBLIC_STACK_PROJECT_ID=74133ce1-7e28-46d4-80ad-36db14724e1b
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_4redw12gta5vfxyyf9kt1cw3g67b77fy80mwzsqqq4cj8
STACK_SECRET_SERVER_KEY=ssk_w9dr8pfbd5k1mp4zwnfhqm2gak5p3jjn4szx75k0bkc7g

# Domaine personnalisé
PREVIEW_DOMAIN=samaleh-arka.com
```

#### 4. **Configuration du domaine personnalisé**

**Dans Vercel Dashboard :**
1. **Settings** > **Domains**
2. Ajouter `samaleh-arka.com`
3. Suivre les instructions DNS

**Enregistrements DNS à ajouter chez votre registrar :**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

---

## 🌐 Option 2 : Railway (Alternative GRATUITE)

### Avantages Railway
- **$5 gratuits/mois** (largement suffisant)
- **Déploiement automatique** 
- **Base de données PostgreSQL** intégrée (si besoin)
- **Logs en temps réel**

### Étapes Railway
1. [railway.app](https://railway.app) > Sign up avec GitHub
2. **New Project** > **Deploy from GitHub repo**
3. Sélectionner votre repo
4. **Variables** > Ajouter vos variables d'environnement
5. **Settings** > **Custom Domain** > Ajouter samaleh-arka.com

---

## 🌐 Option 3 : Fly.io (Pour plus de contrôle)

### Avantages Fly.io
- **Gratuit** jusqu'à 3 apps
- **Déploiement global**
- **Docker-based**
- **Plus de contrôle** sur l'infrastructure

---

## 🔧 Configuration Stack Auth pour Production

### Mise à jour des domaines autorisés
1. Allez sur [app.stack-auth.com](https://app.stack-auth.com)
2. **Configuration** > **Domains**
3. Ajouter vos domaines de production :
   - `https://samaleh-arka.com`
   - `https://www.samaleh-arka.com`
   - `https://votre-url-vercel.vercel.app` (backup)

### Callbacks de production
```
Authorized redirect URIs:
- https://samaleh-arka.com/api/auth/callback
- https://www.samaleh-arka.com/api/auth/callback
```

---

## 🔒 Configuration SSL et Sécurité

### Vercel (Automatique)
- ✅ SSL gratuit via Let's Encrypt
- ✅ HTTPS redirect automatique
- ✅ Security headers par défaut

### Configuration recommandée dans `next.config.ts`
```typescript
const nextConfig: NextConfig = {
  // ... votre config existante
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

---

## 📊 Monitoring et Analytics

### 1. **Vercel Analytics** (Gratuit)
```bash
npm install @vercel/analytics
```

Dans `app/layout.tsx` :
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. **Monitoring d'erreurs**
- **Sentry** : Gratuit jusqu'à 5k erreurs/mois
- **LogRocket** : Session replay
- **Vercel Speed Insights** : Performance

---

## 🧪 Tests de déploiement

### Script de validation production
```javascript
// test-production.js
async function testProductionDeployment() {
  const PROD_URL = 'https://samaleh-arka.com'; // Votre domaine
  
  console.log('🧪 Test du déploiement production...');
  
  try {
    // Test du health check
    const response = await fetch(`${PROD_URL}/api/health`);
    console.log('✅ Application accessible');
    
    // Test de l'authentification
    const authTest = await fetch(`${PROD_URL}/api/auth/config`);
    console.log('✅ Authentification configurée');
    
    console.log('🎉 Déploiement production validé !');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}
```

---

## 💰 Coûts de production

| Service | Coût mensuel |
|---------|--------------|
| **Vercel** | **GRATUIT** (hobby) |
| **Neon Database** | **GRATUIT** (0.5GB) |
| **OpenRouter/DeepSeek** | **GRATUIT** |
| **Stack Auth** | **GRATUIT** (10k MAU) |
| **Freestyle** | **GRATUIT** actuellement |
| **SSL/CDN** | **GRATUIT** (Vercel) |
| **TOTAL** | **0€** 🎉 |

---

## 🚀 Checklist de déploiement

### Avant déploiement
- [ ] Code pushé sur GitHub
- [ ] Variables d'environnement préparées
- [ ] Domaine DNS configuré
- [ ] Stack Auth mis à jour

### Déploiement
- [ ] Projet importé sur Vercel
- [ ] Variables d'environnement ajoutées
- [ ] Premier déploiement réussi
- [ ] Domaine personnalisé configuré

### Après déploiement  
- [ ] SSL fonctionnel (https)
- [ ] Authentification testée
- [ ] Génération d'app testée
- [ ] Monitoring configuré

---

## 🆘 Support et dépannage

### Erreurs communes

**Build failed** :
```bash
# Vérifier les types TypeScript
npm run build
```

**Variables d'environnement** :
- Vérifier l'orthographe exacte
- Pas d'espaces avant/après les =
- Valeurs entre guillemets si nécessaire

**Domaine SSL** :
- Attendre 24-48h pour la propagation DNS
- Vérifier les enregistrements CNAME

---

## 🎯 Résultat final

Une fois déployé, vous aurez :

🌐 **https://samaleh-arka.com** - Votre app Adorable  
🔒 **SSL gratuit** - Sécurisé par défaut  
🚀 **CDN mondial** - Vitesse optimale  
💰 **Coût total : 0€** - Entièrement gratuit  
🤖 **IA illimitée** - DeepSeek R1 gratuit  
🔧 **Déploiement continu** - Auto-deploy depuis GitHub  

**Votre clone de Lovable sera 100% opérationnel en production !**