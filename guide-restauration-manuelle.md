# Guide de Restauration Manuelle - Adorable

## 🎯 Objectif
Restaurer le projet Adorable complet avec votre configuration OpenRouter déjà validée.

## 📋 Étapes simples

### 1. **Cloner le projet original**
```bash
cd /home/scrapybara
git clone https://github.com/freestyle-sh/adorable adorable-complet
cd adorable-complet
```

### 2. **Copier votre configuration validée**
```bash
cp /home/scrapybara/SamalehZen/Adorable-Lovable-clone-SaaS/.env .env
```

### 3. **Installer les dépendances**
```bash
npm install --legacy-peer-deps
npm install @ai-sdk/openai --legacy-peer-deps
```

### 4. **Appliquer la configuration OpenRouter**

**Fichier `src/lib/model.ts` :**
```typescript
import { createOpenAI } from "@ai-sdk/openai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const MODEL = openrouter("deepseek/deepseek-r1-0528:free");
```

**Fichier `src/mastra/agents/builder.ts` :**
```typescript
// Remplacer la ligne d'import
import { MODEL } from "@/lib/model";

// Remplacer dans builderAgent
model: MODEL,
```

### 5. **Initialiser la base de données**
```bash
npx drizzle-kit push
```

### 6. **Lancer l'application**
```bash
npm run dev
```

### 7. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

---

## ✅ Avantages de votre configuration

- **IA 100% gratuite** avec DeepSeek R1
- **Base de données Neon** déjà configurée  
- **Authentification Stack Auth** prête
- **Sandboxes Freestyle** fonctionnelles
- **Domaine personnalisé** : samaleh-arka.com

---

## 🚨 En cas de problème

### Erreurs TypeScript
```bash
# Next.js est déjà configuré pour ignorer les erreurs temporaires
npm run dev
```

### Problème de dépendances
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Test de configuration
```bash
# Utiliser le script de test créé
node test-config.js
```

---

## 📞 Support

Votre configuration est **100% validée** :
- ✅ OpenRouter + DeepSeek R1 fonctionnel
- ✅ Base de données Neon opérationnelle  
- ✅ Toutes les clés API configurées

Il suffit maintenant de restaurer l'interface utilisateur complète !