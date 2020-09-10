import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  VrButton
} from 'react-360';

import Tweet from './tweet.react';
import feed from './feed';

const axios = require('axios').default;

export default class TweetWall extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructed wall', this.props);

    // console.log('window', window);
  }

  // fadeAnim = useRef(new Animated.Value(0)).current;
  state = {
    fadeAnim: new Animated.Value(0),
    scrollAnim: new Animated.Value(6000),
    tweetElements: [],
    tweetQueue: [],
    t: [],
    count: 0,
    displayNewTweet: true,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('did update', this.state);
    // if(prevState.tweets !== this.state.tweets) {
    //   console.log(`add tweets ${this.props.position}`, this.state.tweets);
    //   this.addTweets(this.state.tweets);
    // }

    if(this.state.displayNewTweet && this.state.tweetQueue.length) {
      console.log('pop for display');
      this.popTweetForDisplay();
      this.setState({
        displayNewTweet: false,
      });
      this.tweetTimer();
    }
  }
  
  popTweetForDisplay() {
    if(this.state.tweetQueue.length) {
      const tweetQueue = this.state.tweetQueue;
      const tweet = tweetQueue.pop();
      const t = this.state.t;
      if(tweet)
        t.push(tweet);
      this.setState({
        tweetQueue: tweetQueue,
        t: t,
      });
    }
  }

  fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 3000
    }).start();
  };

  scroll = () => {
    Animated.timing(this.state.scrollAnim, {
      toValue: 1000,
      duration: 10000
    }).start();
  }

  addTweet(tweet) {
    const arr = this.state.tweetQueue;
    arr.unshift(tweet);
    this.setState({
      tweetQueue: arr,
    });
    // console.log(this.state.tweetQueue);
  }

  addTweets(arr) {
    this.setState({
      tweetQueue: this.state.tweetQueue.concat(arr),
    });
    // console.log(this.state.tweetQueue);
  }

  componentDidMount() {
    // create a play to play video

    // if(this.props.tweets && this.props.tweets.length) {
    //   console.log('add initial tweets', this.props.tweets);
    //   this.setState({tweetQueue: this.props.tweets});
    // }

    this.setState({ tweets: feed[this.props.position+'Tweets'] });
    // this.setState({
    //   timer: setInterval(() => {
    //     // this.addTweetTest();
    //   }, 10000),
    // });

    // setInterval(() => {
    //   // console.log('current prop', this.props);
    // }, 5000);
    feed.onTweet(this.props.position, (tweet) => {
      this.addTweet(tweet);
      console.log('tweet added');
    })

    feed.onTweets(this.props.position, (tweets) => {
      this.addTweets(tweets);
      console.log('tweets added');
    })
  }

  tweetTimer() {
    setTimeout(() => {
      this.setState({displayNewTweet: true});
    }, 10000);
  }

  // async getTweets() {
  //   try {
  //     const response = await axios.get(`https://api.twitter.com/labs/2/tweets/search?expansions=attachments.media_keys&tweet.fields=attachments,entities&media.fields=url,width,height&query=babymetal_fanart has:images`,
  //       {
  //         headers: {
  //           'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAMkyHAEAAAAAYCG9RFNZk%2F4%2FmCS%2FF2GPgqfu09s%3DHFROtX6WfQ2v5Rg6siEwp6igXa45nxOfI7oNzIkdwZsUjecEkU'
  //         }
  //       });


  //   } catch (err) {
  //     console.log(err);
  //   }

  // }

  render() {

    // const tel = this.state.tweetElements;

    // console.log('tel', this.state.t);

    let tweet;
    
    if(this.state.t && this.state.t.length) {
      tweet = this.state.t.map((val, key) => {
        // console.log('t', val);
        return (<Tweet style={[{
          // width: '100%'
        }]} position={this.props.position} key={val.id} tweet={val} />);
      }, this);
    }

    return (
      <View style={styles.panel}>
        <View style={[styles.tweetRow, {
          justifyContent: this.props.position === 'left' ? 'flex-end' : 'flex-start'
        }]}>
          {tweet}
        </View>
        {/* <View style={[styles.tweetRow, {
          justifyContent: this.props.position === 'left' ? 'flex-end' : 'flex-start'
        }]}>
          {tweet}
        </View>
        <View style={[styles.tweetRow, {
          justifyContent: this.props.position === 'left' ? 'flex-end' : 'flex-start'
        }]}>
          {tweet}
        </View> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 8000,
    height: 1440,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    justifyContent: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#cc0000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  tweetPanel: {
    // Fill the entire surface
    width: 8000,
    height: '50%',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tweetBox: {
    padding: 20,
    backgroundColor: '#0000cc',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  tweetRow: {
    flexDirection: 'row',
    // backgroundColor: '#ccccff',
    // width: 8000,
    // flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    // justifyContent: 'center',
    // alignItems: 'flex-end'
  }
});

module.exports = TweetWall;