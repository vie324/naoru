/**
 * Vercel Serverless Function: Reviews Fetch
 * POST /api/reviews-fetch
 */

function generateDemoReviews(url) {
  const sampleReviews = [
    { text: '施術が丁寧で、腰痛が改善しました。スタッフの方も親切でした。', rating: '5.0', date: '2025-01-20' },
    { text: '駅から近くて通いやすいです。予約も取りやすく満足しています。', rating: '4.5', date: '2025-01-18' },
    { text: '初回割引があってお得でした。次回も利用したいと思います。', rating: '4.0', date: '2025-01-15' },
    { text: '説明が分かりやすく、安心して施術を受けられました。', rating: '5.0', date: '2025-01-12' },
    { text: 'もう少し料金が安いと嬉しいですが、効果はありました。', rating: '3.5', date: '2025-01-10' },
    { text: '清潔感のある店内で、リラックスできました。', rating: '4.5', date: '2025-01-08' },
    { text: '肩こりが楽になりました。また通いたいです。', rating: '5.0', date: '2025-01-05' },
    { text: 'スタッフの対応が良く、相談しやすかったです。', rating: '4.5', date: '2025-01-03' }
  ];

  return sampleReviews;
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
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Shop URL is required' });
    }

    console.log(`[DEMO] Reviews fetch: ${url}`);

    const reviews = generateDemoReviews(url);

    res.status(200).json({
      data: reviews,
      count: reviews.length,
      mode: 'demo'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
