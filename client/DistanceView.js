import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import { Constants, Location, Permissions } from "expo";

import { distanceUpdateInterval } from "./config";

import Question from "./Question";

export default class DistanceView extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Sträcka",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("./distance.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  state = {
    latitude: 0,
    longitude: 0,
    altitude: 0
  };

  async componentWillMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    Location.watchPositionAsync(
      { enableHighAccuracy: true, distanceInterval: distanceUpdateInterval },
      this.positionUpdate
    );
  }

  REMOVEINPROD_increaseDistance = () => {
    const { setDistance, distance } = this.props.screenProps;

    setDistance(distance + 10);
  };

  measure = (lat1, lon1, lat2, lon2) => {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
  };

  positionUpdate = ({
    coords: { latitude, longitude, altitude },
    timestamp
  }) => {
    this.setState(state => {
      if (state.latitude === 0) {
        return {
          latitude,
          longitude,
          altitude
        };
      }

      const latDiff = state.latitude - latitude;
      const lonDiff = state.longitude - longitude;
      const altDiff = state.altitude - altitude;

      const distance = this.measure(
        state.latitude,
        state.longitude,
        latitude,
        longitude
      );

      this.props.screenProps.setDistance(
        Math.round(this.props.screenProps.distance + distance)
      );
      return {
        latitude,
        longitude,
        altitude
      };
    });
  };

  render() {
    const { distance } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.REMOVEINPROD_increaseDistance}>
          <Text style={styles.distanceDisplay}>{distance}m</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
