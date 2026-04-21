#!/usr/bin/env node

// Simple Node.js script to update PropertyPhoto records with enhanced URLs
// Usage: node batch_enhance_update.js

const fs = require('fs');
const path = require('path');

async function updatePhotos() {
  try {
    // Read the batch results
    const batchFile = '/tmp/enhanced_batch.json';
    if (!fs.existsSync(batchFile)) {
      console.log('No batch file found');
      return;
    }

    const results = JSON.parse(fs.readFileSync(batchFile, 'utf-8'));
    
    // Try using fetch to update each record
    let updated = 0;
    let failed = 0;

    for (const item of results) {
      try {
        const response = await fetch(
          `https://app.base44.com/api/apps/69e248a2469cc39540781cce/entities/PropertyPhoto/${item.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'app-id': '69e248a2469cc39540781cce',
            },
            body: JSON.stringify({
              enhanced_url: item.enhanced_url
            })
          }
        );

        if (response.ok) {
          updated++;
          process.stdout.write('.');
        } else {
          failed++;
          process.stdout.write('F');
        }
      } catch (err) {
        failed++;
        process.stdout.write('E');
      }
    }

    console.log(`\nUpdated: ${updated}/${results.length}, Failed: ${failed}`);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

updatePhotos();
