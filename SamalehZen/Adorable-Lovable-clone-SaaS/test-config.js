// Test complet de configuration - Adorable
// Usage: node test-config.js

require('dotenv').config();

async function testDatabase() {
  try {
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    
    await client.connect();
    console.log('✅ Connexion base de données réussie');
    
    // Test d'une simple requête
    const result = await client.query('SELECT NOW()');
    console.log('✅ Requête test réussie:', result.rows[0].now);
    
    await client.end();
    return true;
  } catch (error) {
    console.error('❌ Erreur base de données:', error.message);
    return false;
  }
}

async function testOpenRouter() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Adorable App Test'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'user',
            content: 'Réponds juste "Test OK" en 2 mots maximum.'
          }
        ],
        max_tokens: 10
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    console.log('✅ OpenRouter + DeepSeek R1 fonctionnel');
    console.log('🤖 Réponse:', data.choices[0].message.content.trim());
    console.log('💰 Tokens utilisés:', data.usage?.total_tokens || 'GRATUIT');
    return true;
  } catch (error) {
    console.error('❌ Erreur OpenRouter:', error.message);
    return false;
  }
}

function testEnvironmentVariables() {
  console.log('\n🔍 Vérification des variables d\'environnement...');
  
  const required = [
    'DATABASE_URL',
    'OPENROUTER_API_KEY',
    'FREESTYLE_API_KEY',
    'NEXT_PUBLIC_STACK_PROJECT_ID',
    'NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY',
    'STACK_SECRET_SERVER_KEY'
  ];
  
  let allPresent = true;
  
  required.forEach(key => {
    if (process.env[key]) {
      console.log(`✅ ${key}: Présent`);
    } else {
      console.log(`❌ ${key}: MANQUANT`);
      allPresent = false;
    }
  });
  
  if (process.env.PREVIEW_DOMAIN) {
    console.log(`✅ PREVIEW_DOMAIN: ${process.env.PREVIEW_DOMAIN}`);
  }
  
  return allPresent;
}

async function runAllTests() {
  console.log('🧪 Tests de configuration Adorable\n');
  console.log('='.repeat(50));
  
  // Test des variables d'environnement
  const envOk = testEnvironmentVariables();
  
  console.log('\n🗄️ Test de la base de données...');
  const dbOk = await testDatabase();
  
  console.log('\n🤖 Test de l\'IA (OpenRouter + DeepSeek)...');
  const aiOk = await testOpenRouter();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('='.repeat(50));
  
  console.log(`Variables d'environnement: ${envOk ? '✅' : '❌'}`);
  console.log(`Base de données (Neon): ${dbOk ? '✅' : '❌'}`);
  console.log(`IA (OpenRouter/DeepSeek): ${aiOk ? '✅' : '❌'}`);
  
  if (envOk && dbOk && aiOk) {
    console.log('\n🎉 TOUTES LES CONFIGURATIONS SONT PRÊTES !');
    console.log('🚀 Vous pouvez maintenant lancer: npm run dev');
    console.log('🌐 Et ouvrir: http://localhost:3000');
  } else {
    console.log('\n❌ Certaines configurations nécessitent des corrections.');
  }
}

// Lancer tous les tests
runAllTests().catch(console.error);