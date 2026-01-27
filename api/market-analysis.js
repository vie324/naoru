/**
 * Vercel Serverless Function: Market Analysis
 * POST /api/market-analysis
 */

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

function generateMarketAnalysis(area, service) {
  const competitors = generateDemoCompetitors(area, service);
  const prices = [2980, 3500, 3980, 4500, 4980, 5500, 5980, 6500, 7000, 7500];

  return {
    area,
    service,
    competitorCount: competitors.length,
    averagePrice: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    },
    averageReviewCount: 120,
    topShops: competitors.slice(0, 5)
  };
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

    console.log(`[DEMO] Market analysis: ${area}, ${service || '整体'}`);

    const analysis = generateMarketAnalysis(area, service);

    res.status(200).json({
      data: analysis,
      mode: 'demo'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
