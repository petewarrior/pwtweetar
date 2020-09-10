// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from 'react-360-web';
// import * as OVRUI from 'ovrui';
import { loadFont, addFontFallback } from 'ovrui';

// import * as sample from './sample.json';

const leftPanel = new Surface(
  8000, /* width */
  1440, /* height */
  Surface.SurfaceShape.Flat /* shape */
);

const rightPanel = new Surface(
  8000, /* width */
  1440, /* height */
  Surface.SurfaceShape.Flat /* shape */
);

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  Promise.all([
    // loadFont('./fonts/cjk_0.fnt', './fonts/cjk_0_sdf.png'),
    // loadFont('./fonts/cjk_1.fnt', './fonts/cjk_1_sdf.png'),
    // loadFont('./fonts/cjk_2.fnt', './fonts/cjk_2_sdf.png'),
    // loadFont('./fonts/japanese.fnt', './fonts/japanese.png'),
  ]).then((result) => {
    result.forEach((item) => {
      console.log('font', item);
      addFontFallback(r360.runtime.guiSys.font, item);
    });
  });



  // const [leftTweets, setLeftTweets] = useState([]);
  // const [rightTweets, setRightTweets] = useState([]);

  // const data = sample.data;
  // const mediaList = sample.includes.media;
  // const authors = sample.includes.users;

  // const testTweets = data.map(val => {
  //   const tweet = val;
  //   if (tweet.attachments && tweet.attachments.media_keys) {
  //     tweet.images = [];
  //     const media_keys = tweet.attachments.media_keys;

  //     media_keys.forEach(key => {
  //       const media = mediaList.find(m => m.media_key === key);
  //       if (media) {
  //         tweet.images.push(media);
  //       }
  //     });
  //   }

  //   tweet.author = authors.find(a => a.id === tweet.author_id);

  //   return tweet;
  // })

  // const length = Math.floor(testTweets.length / 2);

  // const leftTweets = testTweets.slice(0, length);
  // const rightTweets = testTweets.slice(length + 1);

  leftPanel.setAngle(
    -Math.PI / 2, /* yaw angle */
    0 /* pitch angle */
  );

  rightPanel.setAngle(
    Math.PI / 2, /* yaw angle */
    0 /* pitch angle */
  );

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('PWTweetAR', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  console.log('left', r360.renderToSurface(
    r360.createRoot('TweetWall',
      { /* initial props */
        position: 'left',
        // tweets: feed,
      }),
    leftPanel
  ));

  r360.renderToSurface(
    r360.createRoot('TweetWall',
      { /* initial props */
        position: 'right',
        // tweets: feed,
      }),
    rightPanel
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('eso0932a (1).jpg'));
  // r360.runtime.guiSys.setFont()
}


window.React360 = { init };