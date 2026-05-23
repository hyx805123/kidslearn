const https = require('https');
const url = 'https://www.digmandarin.com/chinese-pinyin-chart';
https.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    // Find all URLs with mp3
    const mp3regex = /https?:[^"'\s)]+\.mp3/gi;
    const mp3s = data.match(mp3regex) || [];
    console.log('MP3 URLs found:', mp3s.length);
    mp3s.slice(0, 20).forEach(u => console.log(u));

    // Look for audio/source tags
    const audioRegex = /<audio[^>]*>[\s\S]*?<\/audio>/gi;
    const audioTags = data.match(audioRegex) || [];
    console.log('\nAudio tags found:', audioTags.length);
    audioTags.slice(0, 3).forEach(u => console.log(u.slice(0, 200)));

    // Look for onclick or data attributes related to audio
    const onclickAudio = /onclick[^>]*audio[^>]*/gi;
    const clicks = data.match(onclickAudio) || [];
    console.log('\nOnclick audio:', clicks.length);
    clicks.slice(0, 3).forEach(u => console.log(u.slice(0, 200)));

    // Look for any digmandarin CDN pattern
    const cdnPattern = /digmandarin[^"'\s]*/gi;
    const cdns = data.match(cdnPattern) || [];
    const uniqueCdns = [...new Set(cdns)].filter(c => c.includes('audio') || c.includes('mp3') || c.includes('sound') || c.includes('pinyin'));
    console.log('\nDigmandarin CDN patterns:', uniqueCdns.length);
    uniqueCdns.forEach(u => console.log(u));

    // Check for wp-content/uploads pattern
    const wpPattern = /wp-content[^"'\s]*pinyin[^"'\s]*/gi;
    const wps = data.match(wpPattern) || [];
    console.log('\nWP pinyin paths:', wps.length);
    wps.slice(0, 5).forEach(u => console.log(u));

    // Check for any .mp3 in the page at all
    const allMp3 = /[^"'\s]*\.mp3[^"'\s]*/gi;
    const allMp3s = data.match(allMp3) || [];
    console.log('\nAll mp3 refs:', allMp3s.length);
    [...new Set(allMp3s)].slice(0, 10).forEach(u => console.log(u));
  });
}).on('error', e => console.error(e));
