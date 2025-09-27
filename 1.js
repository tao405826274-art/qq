const https = require('https');
const fs = require('fs');
const path = require('path');

base = 100 * 10

const ORGID_START = 1 + base;
const ORGID_END = base + 100;
const ORGIDS = Array.from({ length: ORGID_END - ORGID_START + 1 }, (_, i) => i + ORGID_START);

const OUTPUT_FILE = path.join(__dirname, `streams_${ORGID_START}-${ORGID_END}.json`);

async function fetchOrgId(orgId) {
  return new Promise((resolve) => {
    const url = `https://app.litenews.cn/v1/app/play/tv/live?orgid=${orgId}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.data && Array.isArray(json.data)) {
            const validStreams = json.data
              .filter(item => item.stream && item.stream.startsWith('http'))
              .map(item => {
                item.stream = item.stream.replace(/\s/g, '');
                return { orgId, ...item };
              });
            resolve(validStreams);
          } else {
            resolve([]);
          }
        } catch {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function fetchAllStreams() {
  const results = [];
  for (const orgId of ORGIDS) {
    const streams = await fetchOrgId(orgId);
    if (streams.length > 0) {
      results.push(...streams);
      console.log(`Fetched orgId ${orgId}, got ${streams.length} valid streams`);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`All done! ${results.length} streams saved to ${OUTPUT_FILE}`);
}

fetchAllStreams();