import io from 'socket.io-client';

class Feed {
    left = true;
    // var tweetArray = [];
    // let tweetArray;
    index = 0;
  
    leftTweets = [];
    rightTweets = [];
    // socket;
  
    eventHandlers = [];
  
    constructor() {
      this.socket = io('https://petewarrior.com', { 'path': '/bmfsvr/socket.io'});
  
      // const socket = this.socket;
  
      this.socket.on('connect', function (data) {
        console.log('connected');
      })
      this.socket.on('tweet', (tweetbody) => {
        console.log('tweet from stream', tweetbody);
        // console.log(tweet.tweet);
        // var tweetbody = {
        //   'id': tweet.tweet.id,
        //   'text': tweet.tweet.text,
        //   'userScreenName': "@" + tweet.tweet.user.screen_name,
        //   'userImage': tweet.tweet.user.profile_image_url_https,
        //   'userDescription': tweet.tweet.user.description,
        // }
        // try {
        //   if (tweet.tweet.entities.media[0].media_url_https) {
        //     tweetbody['image'] = tweet.tweet.entities.media[0].media_url_https;
        //   }
        //   if (tweet.tweet.entities.media.length) {
        //     tweetbody['images'] = tweet.entities.media.map(val => {
        //       return {
        //         width: val.width,
        //         height: val.height,
        //         url: val.media_url_https
        //       };
        //     });
        //   }
        // } catch (err) { }
  
        // console.log(tweetbody);
  
        // const tweetArray = this.left ? this.leftTweets : this.rightTweets;
        // const setTweets = left ? setLeftTweets : params.setRightTweets;
  
        this.left ? this.leftTweets.unshift(tweetbody) : this.rightTweets.unshift(tweetbody);
        this.left != this.left;
        const handler = this.eventHandlers.find((ev) => {
          return (this.left ? ev.position === 'left' : ev.position === 'right') && ev.event === 'tweet';
        });
  
        if (handler) handler.handler(tweetbody);
  
        // console.log('feed', [this.leftTweets, this.rightTweets]);
      });
  
  
      this.socket.on('allTweet', (tweet) => {
        // console.log(tweet);

        tweet = tweet.filter((t) => {
            return t.images && t.images.length;
        })
  
        const length = Math.floor(tweet.length / 2);
  
        this.leftTweets.push(...tweet.slice(0, length));
        this.rightTweets.push(...tweet.slice(length + 1));
  
        const leftHandler = this.eventHandlers.find((ev) => {
            return ev.position === 'left' && ev.event === 'tweets';
        });

        const rightHandler = this.eventHandlers.find((ev) => {
            return ev.position === 'right' && ev.event === 'tweets';
        });

        console.log('lefthan', leftHandler);

        if (leftHandler) leftHandler.handler(this.leftTweets);
        if (rightHandler) rightHandler.handler(this.rightTweets);
        


        console.log('init', tweet);
        // console.log('scene', leftPanel.getScene());
      });
    }
  
    /**
     * 
     * @param {string} position 
     * @param {Function} handler 
     */
    onTweet(position, handler) {
      this.eventHandlers.push({ position: position, handler: handler, event: 'tweet' });
    }

    /**
     * 
     * @param {string} position 
     * @param {Function} handler 
     */
    onTweets(position, handler) {
        this.eventHandlers.push({ position: position, handler: handler, event: 'tweets' });
      }
  }
  
  const feed = new Feed();
  
  export default feed;