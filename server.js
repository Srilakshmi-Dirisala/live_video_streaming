const NodeMediaServer = require('node-media-server');
const express = require('express');
const path = require('path');
const os = require('os');

// ------------------
// FFmpeg path setup
// ------------------
const isWindows = os.platform() === 'win32';
const ffmpegPath = isWindows
  ? 'C:\\ffmpeg\\bin\\ffmpeg.exe' // adjust if on Windows
  : '/usr/bin/ffmpeg'; // VPS Linux

// ------------------
// NodeMediaServer config
// ------------------
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: path.join(__dirname, 'media'),
    allow_origin: '*',
  },
  trans: {
    ffmpeg: ffmpegPath,
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=3:hls_flags=delete_segments]',
        dash: false,
      },
    ],
  },
};

// ------------------
// Start NodeMediaServer
// ------------------
const nms = new NodeMediaServer(config);
nms.run();
console.log('✅ NodeMediaServer started!');
console.log('RTMP URL: rtmp://72.61.170.227:1935/live');
console.log('HLS URL: http://72.61.170.227:8000/live/test/index.m3u8');

// ------------------
// Express server for HTML player
// ------------------
const app = express();

// Serve player.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'player.html'));
});

// Serve media (HLS) files
app.use('/live', express.static(path.join(__dirname, 'media/live')));

app.listen(3000, () => {
  console.log('✅ Player running at http://72.61.170.227:3000');
});
