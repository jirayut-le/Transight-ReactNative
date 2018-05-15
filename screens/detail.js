import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Container, Text, Button, Picker, Icon, Content} from 'native-base';
import MapView from 'react-native-maps';
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
            time: '0'
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
        });
    }

    componentDidMount(){
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
            <Container>
                <Content>
                <MapView
                style={styles.map}
                region={{
                    latitude: 13.736717,
                    longitude: 100.523186,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}>
                </MapView>
                <Button dark>
                    <Text>
                    Get Direction
                    </Text>
                </Button>
                </Content>
            </Container> 
            </ScrollView>
            </View>
        )
    }
}

export default Detail;