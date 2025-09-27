const fs = require('fs');

const data = JSON.parse(fs.readFileSync('streams_all.json', 'utf-8'));

const blacklistNames = ['CCTV', '中央一套', '金山防盗链', '测试'];
const blacklistOrgIds = [21, 29];

const filtered = data.filter(item => {
  const name = item.name || '';
  const desc = item.desc || '';
  const nameOk = !blacklistNames.some(key => name.includes(key) || desc.includes(key));
  const idOk = !blacklistOrgIds.includes(item.orgId);
  return nameOk && idOk;
});

let m3u = '#EXTM3U\n';

filtered.forEach(item => {
  const logo = item.icon || (item.share && item.share.image) || '';
  const apiUrl = `https://iqilu.vercel.app/api/iqilu?orgid=${item.orgId}&num=${item.index}`;
  m3u += `#EXTINF:-1 tvg-logo="${logo}",${item.name}\n`;
  m3u += `${apiUrl}\n`;
});

fs.writeFileSync('iqilu.m3u', m3u, 'utf-8');
console.log('Filtered M3U generated: iqilu.m3u');