import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Button, Picker, Icon} from 'native-base';
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
            <Container style={styles.container}>
            <Image source={{uri: this.state.data.img}} style={{height:250, width: null}}/>
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
                        <Text>From {this.state.selected} Station to {this.state.data.station} Station</Text>
                        <Text>Price : {this.state.price} Baht</Text>
                        <Text>Estimate time : {this.state.time} Minute</Text>
                    </View>
                </View>
            </Container>
        )
    }
}

export default Detail;