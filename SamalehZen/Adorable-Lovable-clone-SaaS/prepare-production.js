# Script de préparation au déploiement
# Usage: node prepare-production.js

const fs = require('fs');
const path = require('path');

console.log('🚀 Préparation pour le déploiement production...\n');

// Configuration pour la production
const productionConfig = {
  domain: 'samaleh-arka.com',
  vercelConfig: {
    name: 'adorable-production',
    framework: 'nextjs',
    buildCommand: 'npm run build',
    outputDirectory: '.next',
    installCommand: 'npm install --legacy-peer-deps'
  }
};

// Créer vercel.json
const vercelJson = {
  "name": productionConfig.vercelConfig.name,
  "framework": productionConfig.vercelConfig.framework,
  "buildCommand": productionConfig.vercelConfig.buildCommand,
  "outputDirectory": productionConfig.vercelConfig.outputDirectory,
  "installCommand": productionConfig.vercelConfig.installCommand,
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "www.samaleh-arka.com"
        }
      ],
      "destination": "https://samaleh-arka.com",
      "permanent": true
    }
  ]
};

// Écrire vercel.json
fs.writeFileSync('vercel.json', JSON.stringify(vercelJson, null, 2));
console.log('✅ vercel.json créé');

// Créer .env.production (template)
const envProduction = `# Configuration Production Adorable
# À configurer dans Vercel Dashboard > Settings > Environment Variables

# Base de données Neon (Production)
DATABASE_URL=postgresql://neondb_owner:npg_iLRT3J1pHDNG@ep-damp-mud-a2blya8p.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# OpenRouter API (Gratuit)
OPENROUTER_API_KEY=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

# Freestyle API
FREESTYLE_API_KEY=HAf4zHzRYQPkM5jXD5Jsdb-D778BQCb2HCA22ugAxcHkhQ3NEFCjb5tj9aJh8p5QnKT

# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=74133ce1-7e28-46d4-80ad-36db14724e1b
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_4redw12gta5vfxyyf9kt1cw3g67b77fy80mwzsqqq4cj8
STACK_SECRET_SERVER_KEY=ssk_w9dr8pfbd5k1mp4zwnfhqm2gak5p3jjn4szx75k0bkc7g

# Domaine de production
PREVIEW_DOMAIN=samaleh-arka.com
NEXT_PUBLIC_APP_URL=https://samaleh-arka.com
`;

fs.writeFileSync('.env.production', envProduction);
console.log('✅ .env.production créé');

// Créer deploy.sh pour automatiser
const deployScript = `#!/bin/bash
# Script de déploiement automatisé

echo "🚀 Déploiement Adorable Production..."

# Build local pour vérifier
echo "📦 Build local..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi"
else
    echo "❌ Erreur de build, arrêt du déploiement"
    exit 1
fi

# Git commit et push
echo "📤 Push vers GitHub..."
git add .
git commit -m "Production deployment $(date)"
git push origin main

echo "🎉 Code poussé ! Vercel va déployer automatiquement."
echo "🌐 Surveillez: https://vercel.com/dashboard"
echo "📱 Votre app sera disponible sur: https://samaleh-arka.com"
`;

fs.writeFileSync('deploy.sh', deployScript);
console.log('✅ deploy.sh créé');

// Mettre à jour next.config.ts pour la production
const nextConfigUpdate = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    viewTransition: true,
  },
  devIndicators: false,
  
  // Configuration production
  compress: true,
  poweredByHeader: false,
  
  // Variables d'environnement publiques
  env: {
    CUSTOM_DOMAIN: process.env.PREVIEW_DOMAIN,
  },
  
  // Headers de sécurité
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
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
  
  // Redirections
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;`;

fs.writeFileSync('next.config.ts', nextConfigUpdate);
console.log('✅ next.config.ts mis à jour pour la production');

// Instructions finales
console.log('\n🎯 Fichiers de production créés :');
console.log('📄 vercel.json - Configuration Vercel');
console.log('📄 .env.production - Variables d\'environnement');
console.log('📄 deploy.sh - Script de déploiement');
console.log('📄 next.config.ts - Configuration Next.js');

console.log('\n🚀 Prochaines étapes :');
console.log('1. chmod +x deploy.sh');
console.log('2. Créer un repo GitHub');
console.log('3. git remote add origin <votre-repo>');
console.log('4. ./deploy.sh');
console.log('5. Importer sur Vercel');
console.log('6. Configurer les variables d\'environnement');
console.log('7. Ajouter votre domaine samaleh-arka.com');

console.log('\n💡 Votre app sera 100% gratuite et production-ready !');