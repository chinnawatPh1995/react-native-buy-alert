import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import MapView, { ProviderPropType, Marker, AnimatedRegion } from 'react-native-maps';
import {connect} from 'react-redux';
import {promoChanged} from '../../actions';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }
    };
}

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        let initialRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
      }
        this.setState({region: initialRegion});
        this.setState({coordinate: initialRegion});
      }, 
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000},
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({region: lastRegion});
      this.setState({coordinate: lastRegion});
    });
  }

  onSubmitLatLong= () => {
    const {latitude, longitude} = this.state.region;
    this.props.promoChanged({prop: 'lat', value: latitude});
    this.props.promoChanged({prop: 'long', value: longitude});

    Actions.promotionForm({reload : true});
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
              <MapView.Marker
                key={this.state.region}
                coordinate={this.state.region}
              />
        </MapView>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => Actions.promotionForm({reload : true})}
              style={[styles.bubble, styles.button]}
            >
                <Icon name="arrow-left" size={20}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onSubmitLatLong()}
              style={[styles.bubble, styles.button]}
            >
              <Text>ตกลง</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 100,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
const mapStateToProps = (state) =>{
  const { lat, long } = state.promoForm;
  return{ lat, long};
}
export default connect(mapStateToProps,{promoChanged})(MapMarker);