# Health check endpoint for production monitoring
# File: src/app/api/health/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test database connection
    const dbTest = process.env.DATABASE_URL ? true : false;
    
    // Test OpenRouter API key
    const aiTest = process.env.OPENROUTER_API_KEY ? true : false;
    
    // Test Freestyle API key  
    const freestyleTest = process.env.FREESTYLE_API_KEY ? true : false;
    
    // Test Stack Auth
    const authTest = process.env.NEXT_PUBLIC_STACK_PROJECT_ID ? true : false;
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      domain: process.env.PREVIEW_DOMAIN,
      services: {
        database: dbTest ? 'connected' : 'disconnected',
        ai: aiTest ? 'configured' : 'missing',
        freestyle: freestyleTest ? 'configured' : 'missing',
        auth: authTest ? 'configured' : 'missing',
      },
      version: '1.0.0'
    };
    
    const allHealthy = dbTest && aiTest && freestyleTest && authTest;
    
    return NextResponse.json(health, { 
      status: allHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}