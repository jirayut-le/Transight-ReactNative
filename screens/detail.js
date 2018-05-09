import React from 'react';
import { View, Image, Picker} from 'react-native';
import { Container, Text, Header, Title, Body, Button } from 'native-base';
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
            selected: ''
        }

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
            {/* <Image source={{uri: this.state.data.img}} style={{height:300, width: null}}/> */}
                <View style={styles.content}>
                    <Text style={styles.title}>{this.state.data.name}</Text>
                    <Text style={styles.tag}>BTS {this.state.data.station} station</Text>
                    <Text>{this.state.data.des}</Text>
                    <Text>Please select depart station</Text>
                    <Picker
                        mode="dropdown"
                        selectedValue={this.state.selected}
                        onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}>
                        {this.loadStationList()}
                    </Picker>
                    <Button dark>
                        <Text>Calcualte Price and Time</Text>
                    </Button>
                </View>
            </Container>
        )
    }

}

export default Detail;