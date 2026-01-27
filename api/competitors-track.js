/**
 * Vercel Serverless Function: Competitor Tracking
 * POST /api/competitors-track
 */

// Demo mode by default (can be switched to real scraping later)
const USE_REAL_SCRAPING = process.env.USE_REAL_SCRAPING === 'true';

// Demo data generator
function generateDemoCompetitors(area, service = '整体') {
  const shopNames = [
    'リラクゼーションスペース',
    '癒しの整体院',
    'ボディケアサロン',
    'ヘルスケア整体',
    'リフレッシュ館',
    '快適整体',
    'もみほぐし専門店',
    'からだリセット',
    'ストレッチ整体',
    'トータルケア'
  ];

  const basePrices = [2980, 3500, 3980, 4500, 4980, 5500, 5980, 6500, 7000, 7500];

  return shopNames.map((name, index) => ({
    name: `${name} ${area}店`,
    url: `https://beauty.hotpepper.jp/demo/${area}/${index}`,
    price: `¥${basePrices[index].toLocaleString()}`,
    reviewCount: `${50 + Math.floor(Math.random() * 200)}`,
    rating: `${(3.5 + Math.random() * 1.5).toFixed(1)}`,
    rank: index + 1
  }));
}

// Real scraping function (for future implementation)
async function scrapeCompetitors(area, service) {
  // TODO: Implement with Puppeteer when enabled
  // For now, return demo data
  return generateDemoCompetitors(area, service);
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { area, service } = req.body;

    if (!area) {
      return res.status(400).json({ error: 'Area is required' });
    }

    console.log(`[${USE_REAL_SCRAPING ? 'REAL' : 'DEMO'}] Competitor tracking: ${area}, ${service || '整体'}`);

    let competitors;
    if (USE_REAL_SCRAPING) {
      competitors = await scrapeCompetitors(area, service);
    } else {
      competitors = generateDemoCompetitors(area, service);
    }

    res.status(200).json({
      data: competitors,
      cached: false,
      timestamp: Date.now(),
      mode: USE_REAL_SCRAPING ? 'real' : 'demo'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
