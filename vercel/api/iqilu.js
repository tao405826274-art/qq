import fetch from 'node-fetch';

export default async function handler(req, res) {
  const orgid = req.query.orgid; // 访问 /api/orgid?orgid=1
  try {
    const response = await fetch(`https://app.litenews.cn/v1/app/play/tv/live?orgid=${orgid}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}