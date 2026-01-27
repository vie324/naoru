/**
 * Vercel Serverless Function: Ranking Check
 * POST /api/ranking-check
 */

function generateDemoRanking(keyword, shopName) {
  const rank = Math.floor(Math.random() * 20) + 1;

  return {
    keyword,
    rank,
    date: new Date().toISOString()
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
    const { keyword, shopName, keywords } = req.body;

    // Bulk check
    if (keywords && Array.isArray(keywords)) {
      console.log(`[DEMO] Bulk ranking check: ${keywords.length} keywords`);

      const results = keywords.map(kw => generateDemoRanking(kw, shopName));

      return res.status(200).json({
        data: results,
        mode: 'demo'
      });
    }

    // Single check
    if (!keyword || !shopName) {
      return res.status(400).json({ error: 'Keyword and shop name are required' });
    }

    console.log(`[DEMO] Ranking check: "${keyword}" - ${shopName}`);

    const result = generateDemoRanking(keyword, shopName);

    res.status(200).json({
      data: result,
      mode: 'demo'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
