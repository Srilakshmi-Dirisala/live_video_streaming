const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: 'C:\\Users\\Dell\\Downloads\\ffmpeg-2025-11-06-git-222127418b-full_build\\ffmpeg-2025-11-06-git-222127418b-full_build\\bin\\ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=1:hls_list_size=2:hls_flags=delete_segments]',
        dash: false
      }
    ]
  }
};

const nms = new NodeMediaServer(config);
nms.run();

console.log('✅ RTMP: rtmp://localhost:1935/live');
console.log('✅ HLS:  http://localhost:8000/live/test/index.m3u8');
