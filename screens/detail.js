import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Container, Text, Button, Picker, Icon, Content} from 'native-base';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from '../styles/DetailStyle';

class Detail extends React.Component {

    static navigationOptions =
    {
        title: 'Informations',
    };

    constructor(props){
        super(props)

        this.state = {
            data:[],
            stationList: [],
            pricetime: [],
            selected: '',
            price: '0',
            time: '0',
            lat: 0,
            long: 0,
            currentLat: 0,
            currentLong: 0,
            regionlat : 0,
            regionlong: 0,
            regiondeltaLat: 1,
            regiondeltaLong: 1
        }

    }

    calculate(itemValue){
        this.setState({selected: itemValue}, function(){
            this.state.pricetime.forEach(element => {
                if(element.depart == this.state.selected && element.arrive == this.state.data.station){
                    this.setState({
                        price: element.price,
                        time: element.time
                    });
                }
            });

            this.state.stationList.forEach(element => {
                if(element.value == this.state.selected){
                    this.setState({
                        lat: element.lat,
                        long: element.long
                    });
                }
            })
        });
    }

    componentDidMount(){
        this.getCurrentLocation();
        // this.getRegion();
        this.setState({
            data: this.props.navigation.state.params.placeData,
            stationList: this.props.navigation.state.params.stationListData,
            pricetime: this.props.navigation.state.params.pricetimeData
        })
    }

    loadStationList(){
        return this.state.stationList.map(data => (
            <Picker.Item label={data.value} value={data.value} key={data.value} />
        ))
    }

    getCurrentLocation(){
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        currentLat: position.coords.latitude,
                        currentLong: position.coords.longitude
                    }, this.getRegion());
                }
            )
        } catch(e){
            console.log(e.message);
        }
    }

    getRegion(){
        var minX, maxX, minY, maxY;
        
        minX = Math.min(this.state.currentLat, this.state.data.lat);
        maxX = Math.max(this.state.currentLat, this.state.data.lat);
        minY = Math.min(this.state.currentLong, this.state.data.long);
        maxY = Math.max(this.state.currentLong, this.state.data.long);

        var midX = (minX + maxX) / 2;
        var midY = (minY + maxY) / 2;
        // var midPoint = [midX, midY];

        var deltaX = (maxX - minX);
        var deltaY = (maxY - minY);

        this.setState({
            regionlat: midX,
            regionlong: midY,
            regiondeltaLat: deltaX,
            regiondeltaLong: deltaY
        })
        
    }

    render(){
        return(
            <View style={{flex:1}}>
            <ScrollView>
            <Image source={{uri: this.state.data.img}} style={{height:250}}/>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.state.data.name}</Text>
                    <Text style={styles.tag}>BTS {this.state.data.station} station</Text>
                    <Text style={styles.des}>{this.state.data.des}</Text>
                    <View>
                        <Picker
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select your depart station"
                            placeholderStyle={{ color: "#444444" }}
                            placeholderIconColor="#111111"
                            style={styles.picker}
                            selectedValue={this.state.selected}
                            onValueChange={(itemValue, itemIndex) => this.calculate(itemValue)}>
                            {this.loadStationList()}
                        </Picker>
                    </View>
                </View>
                <View style={styles.center}>
                    <Text style={styles.fromto}>From {this.state.selected} station to {this.state.data.station} station</Text>
                </View>
                <View style={styles.pricetime}>
                    <View style={styles.center}>
                        <Text>Price</Text>
                        <Text note>(Baht)</Text>
                        <Text style={styles.largeFont}>{this.state.price}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text>Estimate time</Text>
                        <Text note>(Minute)</Text>
                        <Text style={styles.largeFont}>{this.state.time}</Text>
                    </View>
                </View>
                    
            </View>
            <View>
                <Content>
                <MapView
                showsUserLocation
                style={styles.map}
                region={{
                    latitude: this.state.data.lat,
                    longitude: this.state.data.long,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02
                    // latitudeDelta: this.state.regiondeltaLat,
                    // longitudeDelta: this.state.regiondeltaLong
                }
                    
                }>
                <MapView.Marker coordinate={{latitude: this.state.data.lat, longitude: this.state.data.long}}/>
                {/* <MapView.Marker coordinate={{latitude: this.state.lat, longitude: this.state.long}}/> */}
                <MapViewDirections
                    origin={{latitude: this.state.currentLat, longitude: this.state.currentLong}}
                    destination={{latitude: this.state.data.lat, longitude: this.state.data.long}}
                    apikey={'API_KEY'}
                    strokeWidth={5}
                    strokeColor="#4169e1"/>
                </MapView>
                <Button dark>
                    <Text>
                    Get Direction
                    </Text>
                </Button>
                </Content>
            </View> 
            </ScrollView>
            </View>
        )
    }
}

export default Detail;