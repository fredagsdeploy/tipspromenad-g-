import React from "react";
import { StyleSheet, Image, View } from "react-native";
// import { Location, Permissions, Audio } from "expo";
import { Motion, spring } from "react-motion";

import _ from "lodash";

import TPText from "./TPText";
import { withRouter } from "react-router";

const SOUNDS = [
  { name: "plopp", src: require("./res/plopp.mp3") },
  { name: "nyfraga", src: require("./res/nyfraga.mp3") },
  { name: "fart", src: require("./res/fart.mp3") }
];

class DistanceView extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Sträcka",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("./res/distance.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  state = {
    latitude: 0,
    longitude: 0,
    altitude: 0,
    error: null
  };

  playRandomSound = () => {
    const sound = _.sample(SOUNDS.map(s => s.name));
    this[sound].play(); // set position 0
  };

  REMOVEINPROD_increaseDistance = () => {
    const { setDistance, distance } = this.props.screenProps;

    setDistance(distance + 10);
  };

  measure = (lat1, lon1, lat2, lon2) => {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  };

  componentWillMount() {
    navigator.geolocation.watchPosition(
      this.positionUpdate,
      this.positionError,
      {
        enableHighAccuracy: true
      }
    );
    console.log("registered position");
  }

  positionUpdate = ({ coords: { latitude, longitude } }) => {
    console.log("position update", latitude, longitude);
    this.setState(state => {
      if (state.latitude === 0) {
        return {
          latitude,
          longitude
        };
      }
      const { distance } = this.props.screenProps;

      const newDistance = this.measure(
        state.latitude,
        state.longitude,
        latitude,
        longitude
      );

      this.props.screenProps.setDistance(Math.round(distance + newDistance));
      return {
        latitude,
        longitude
      };
    });
  };

  positionError = error => {
    this.setState({
      error
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.screenProps.unlockCount !== this.props.screenProps.unlockCount
    ) {
      this.playRandomSound();
      const res = window.confirm(
        "Ny fråga, va!\nDu har en ny fråga att svara på, änna"
      );

      setTimeout(() => {
        if (res) {
          this.props.history.push("/");
        }
      }, 5000);
    }
  }

  render() {
    const { distance } = this.props.screenProps;
    const { error } = this.state;

    return (
      <View style={styles.container}>
        <Motion defaultStyle={{ value: 0 }} style={{ value: spring(distance) }}>
          {({ value }) => (
            <TPText style={styles.distanceDisplay}>{Math.ceil(value)}m</TPText>
          )}
        </Motion>
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {SOUNDS.map(({ name, src }) => (
          <audio src={src} key={name} ref={ref => (this[name] = ref)} />
        ))}
        <button onClick={this.playRandomSound}>playRandomSound</button>
      </View>
    );
  }
}

export default withRouter(DistanceView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 26,
    height: 26
  },
  distanceDisplay: {
    fontSize: 48
  }
});
