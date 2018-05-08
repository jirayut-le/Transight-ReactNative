import React from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Header, Title, Body } from 'native-base';


class Detail extends React.Component {

    static navigationOptions =
    {
        title: 'Informations',
    };

    constructor(props){
        super(props)

        this.state = {
            data:[],
            stationList: []
        }

    }

    componentDidMount(){
        this.setState({
            data: this.props.navigation.state.params.placeData,
            stationList: this.props.navigation.state.params.stationListData
        })
    }

    render(){
        return(
            <Container>
                <View>
                    <Text>{this.state.data.name}</Text>
                    <Text note>{this.state.data.station}</Text>
                    <Text>{this.state.data.des}</Text>
                </View>
            </Container>
        )
    }

}

export default Detail;