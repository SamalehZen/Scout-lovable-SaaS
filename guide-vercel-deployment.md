# 🚀 Déploiement Vercel - Guide Pas-à-Pas

## ⚡ Déploiement en 10 minutes

Votre configuration est **100% prête**. Ce guide vous permet de déployer en production rapidement.

---

## 📋 Étape 1 : Préparer le repository GitHub

### 1.1 Créer un nouveau repository
1. Allez sur [github.com](https://github.com)
2. **New repository** 
3. Nom : `adorable-production`
4. **Public** ou **Private** (au choix)
5. **Create repository**

### 1.2 Pusher votre code
```bash
cd /home/scrapybara/SamalehZen/Adorable-Lovable-clone-SaaS

# Initialiser git (si pas déjà fait)
git init
git add .
git commit -m "Initial production setup"

# Connecter au repository GitHub
git remote add origin https://github.com/VOTRE-USERNAME/adorable-production.git
git branch -M main
git push -u origin main
```

---

## 📋 Étape 2 : Déploiement Vercel

### 2.1 Connexion Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. **Sign up** avec GitHub
3. Autorisez l'accès à vos repositories

### 2.2 Import du projet
1. **Add New...** > **Project**
2. Trouvez `adorable-production` dans la liste
3. **Import**
4. **Framework Preset** : Next.js (auto-détecté)
5. **Root Directory** : `./` (par défaut)
6. **Build Command** : `npm run build` (auto-détecté)
7. **Install Command** : `npm install --legacy-peer-deps`

### 2.3 Variables d'environnement
**AVANT de cliquer Deploy**, ajoutez vos variables :

```env
DATABASE_URL
postgresql://neondb_owner:npg_iLRT3J1pHDNG@ep-damp-mud-a2blya8p.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

OPENROUTER_API_KEY
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

FREESTYLE_API_KEY
HAf4zHzRYQPkM5jXD5Jsdb-D778BQCb2HCA22ugAxcHkhQ3NEFCjb5tj9aJh8p5QnKT

NEXT_PUBLIC_STACK_PROJECT_ID
74133ce1-7e28-46d4-80ad-36db14724e1b

NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
pck_4redw12gta5vfxyyf9kt1cw3g67b77fy80mwzsqqq4cj8

STACK_SECRET_SERVER_KEY
ssk_w9dr8pfbd5k1mp4zwnfhqm2gak5p3jjn4szx75k0bkc7g

PREVIEW_DOMAIN
samaleh-arka.com

NEXT_PUBLIC_APP_URL
https://samaleh-arka.com
```

### 2.4 Premier déploiement
1. Cliquez **Deploy**
2. Attendez 2-3 minutes
3. ✅ **Success!** - Votre app est en ligne

**URL temporaire** : `https://adorable-production-xxx.vercel.app`

---

## 📋 Étape 3 : Configuration du domaine personnalisé

### 3.1 Ajouter le domaine dans Vercel
1. Dans votre projet Vercel
2. **Settings** > **Domains**
3. Ajouter : `samaleh-arka.com`
4. Ajouter : `www.samaleh-arka.com`

### 3.2 Configuration DNS
Chez votre registrar de domaine (où vous avez acheté samaleh-arka.com) :

**Enregistrements à ajouter :**
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www  
Value: cname.vercel-dns.com
```

⏱️ **Délai** : 15 minutes à 48h pour la propagation

---

## 📋 Étape 4 : Mise à jour Stack Auth

### 4.1 Ajouter les domaines de production
1. Allez sur [app.stack-auth.com](https://app.stack-auth.com)
2. Votre projet > **Configuration** > **Domains**
3. **Authorized domains** :
   - `https://samaleh-arka.com`
   - `https://www.samaleh-arka.com`
   - `https://adorable-production-xxx.vercel.app` (backup)

### 4.2 Callbacks
**Authorized redirect URIs** :
```
https://samaleh-arka.com/api/auth/callback
https://www.samaleh-arka.com/api/auth/callback
```

---

## 📋 Étape 5 : Test de production

### 5.1 Test automatique
Une fois le domaine configuré, testez :

```bash
curl -I https://samaleh-arka.com
# Doit retourner : HTTP/2 200
```

### 5.2 Tests fonctionnels
1. **🌐 Accès** : https://samaleh-arka.com
2. **🔐 Connexion** : Testez l'authentification
3. **🤖 IA** : Créez une nouvelle app via chat
4. **👁️ Prévisualisation** : Vérifiez que l'app générée s'affiche

---

## 📊 Dashboard de monitoring

### Vercel Analytics (Gratuit)
1. Dans votre projet Vercel
2. **Analytics** > **Enable**
3. Statistiques en temps réel

### Health checks
URL de test : `https://samaleh-arka.com/api/health`
(Créez ce endpoint si nécessaire)

---

## 🎯 Résultat final

**🎉 Félicitations ! Votre clone de Lovable est en production :**

- 🌐 **URL principale** : https://samaleh-arka.com
- 🔒 **SSL** : Automatique et gratuit
- 🚀 **CDN** : Mondial via Vercel Edge Network
- 🤖 **IA** : DeepSeek R1 gratuit et illimité
- 💾 **Base de données** : Neon PostgreSQL production
- 🔐 **Auth** : Stack Auth configuré
- 💰 **Coût** : **0€/mois** !

---

## 🆘 Dépannage

### Build failed
```bash
# Test local
npm run build
# Si erreur : vérifiez les types TypeScript
```

### Domaine SSL en attente
- ⏱️ Attendre 24-48h max
- Vérifier les enregistrements DNS
- Contacter Vercel Support si nécessaire

### Variables d'environnement
- Pas d'espaces autour du `=`
- Vérifier l'orthographe exacte
- Re-deploy après modification

### Stack Auth erreurs
- Vérifier les domaines autorisés
- Callbacks corrects
- Clés copiées complètement

---

**🚀 Votre application Adorable est maintenant live et entièrement gratuite !**

**Partagez le lien** : https://samaleh-arka.com