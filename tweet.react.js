import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  VrButton,
  Image
} from 'react-360';

import { Html5Entities } from 'html-entities'; 
import utf8 from 'utf8';


const axios = require('axios').default;

export default class Tweet extends React.Component {

  // state = {};

  constructor(props = {}) {
    super(props);

    // console.log('props', this.props);

    this.state = {
      width: this.props.width || 8000,
      // text: this.props.text || '',
      // images: this.props.images || [],
      tweet: this.props.tweet,
    };

    this.state = Object.assign(this.state, {
      fadeAnim: new Animated.Value(0),
      // scrollAnim: new Animated.Value(this.state.width),
      scrollAnim: new Animated.Value(0),
    });

    // this.scroll();
  }

  scroll = () => {
    Animated.timing(this.state.scrollAnim, {
      toValue: this.state.width,
      duration: 70000
    }).start();
  }

  // resetValues = () => {
  //   this.setState({
  //     fadeAnim: new Animated.Value(0),
  //     scrollAnim: new Animated.Value(this.state.width),
  //   });
  // }

  componentDidMount() {
    // create a play to play video

    // this.setState({ tweets: null });

    // this.resetValues();    
    // console.log('tweet state', this.state);

    // console.log(this.state);

    this.scroll();
  }

  render() {
    const entities = new Html5Entities();

    // console.log('left', this.state.scrollAnim);
    const screenName = this.state.tweet.userScreenName;
    // const author = this.state.tweet ? this.state.tweet.author : {};
    const text = this.state.tweet ? this.state.tweet.text : '';
    let images;

    if(this.state.tweet && this.state.tweet.images && this.state.tweet.images.length) {
      images = this.state.tweet.images.map((img, idx) => {
        // console.log(img);
        const height = 720;
        const width = img.width * height / img.height;
        return (<Image key={idx} style={{width: width, height: height}} source={{uri: img.url}} />);
      });
    }

    return (
      // <View style={[styles.tweetPanel]}>
        <Animated.View
          style={[
            styles.tweetBox,
            {
              [this.props.position === 'left' ? 'right' : 'left' ]: this.state.scrollAnim, // Bind opacity to animated value
              // height: 150,
            }
          ]}
        >
          <View>
            <Text>
              {screenName}
              {/* {author.name} ({author.username}) */}
            </Text>
            {/* <Text style={styles.greeting}>
              {entities.decode(text)}
            </Text>   */}
          </View>
          <View style={{flexWrap: 'wrap'}}>{images}</View>
          
        </Animated.View>
      // </View>
    );
  }
};

const styles = StyleSheet.create({
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
    // backgroundColor: 'rgba(#0000cc, 0.0)',
    // borderColor: '#639dda',
    // borderWidth: 2,
  },
  greeting: {
    // fontFamily: 'Arial Unicode MS',
    fontSize: 44,
    fontFamily: 'Noto Sans JP',
  },
  image: {

  },
  tweetBox: {
    padding: 20,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.0)',
    // borderColor: '#639dda',
    // borderWidth: 2,
    maxWidth: 800,
    position: 'absolute',
  },
});

module.exports = Tweet;