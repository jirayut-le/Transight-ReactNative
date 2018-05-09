import React from 'react';
import { View, Image, Picker } from 'react-native';
import { Container, Button, Text, Header, Body, Title, Content, List, ListItem, Card, CardItem, Item, Icon, Input, Right, Left} from 'native-base';
import styles from '../styles/ListPlaceStyle';
import Detail from './Detail';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';

class ListPlace extends React.Component {

    static navigationOptions = {
        title: 'Transight'
    };

    constructor(props){
        super(props);

        this.pickerValueHolder = ''

        this.state = {
            data: [],
            tempData: [],
            text: '',
            stationList: [],
            pricetime: []
        };

        this.itemsRef = this.getRef().child('places');
        this.stationRef = this.getRef().child('station');
        this.pricetimeRef = this.getRef().child('priceandtime');
    }

    getRef(){
       return firebase.database().ref();
    }

    componentDidMount(){
        this.getItems(this.itemsRef, this.stationRef, this.pricetimeRef);
    }

    getItems(itemsRef, stationRef, pricetimeRef){
        itemsRef.on('value', (data) => {
                let items = [];
                data.forEach((child) => {
                    items.push({
                        name : child.val().placeName,
                        station : child.val().stationName,
                        des : child.val().description,
                        img : child.val().imgSrc,
                        _key: child.key
                    });
                });
    
                console.log(items);
                this.setState({
                    data: items,
                    tempData: items
                });
        });

        stationRef.on('value', (data) => {
            let items2 = [];
            data.forEach((child) => {
                items2.push({
                    value : child.val().stationName,
                });
            });

            console.log(items2);
            this.setState({
                stationList: items2
            });
        });

        pricetimeRef.on('value', (data) => {
            let item3 = [];
            data.forEach((child) => {
                item3.push({
                    arrive : child.val().arrive,
                    depart : child.val().depart,
                    price : child.val().price,
                    time : child.val().time
                });
            });
            console.log(item3);
            this.setState({
                pricetime : item3
            });
        });
    }

    filterSearch(text){
        const newData = this.state.tempData.filter(function(item) {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1

        })
        this.setState({
            data: newData,
            text: text
        })
    }

    getPlaceCard(item) {
        return (
            <Card>
                <CardItem header>
                    <Body>
                        <Text>{`${item.name}`}</Text>
                        <Text note>BTS {`${item.station}`} Station</Text>
                    </Body>
                </CardItem>
                <CardItem cardBody>
                    {/* <Image source={{uri: item.img}} style={{height: 200, width: null, flex: 1}}/> */}
                </CardItem>
            </Card>
          
        );
    }

    getStationList(){
        return this.state.stationList;
    }

    getPicker(){
        return(
            <Picker
                selectedValue={this.state.pickerValueHolder}
                onValueChange={(itemValue, itemIndex) => this.setState({pickerValueHolder: itemValue})} >
                { this.state.stationList.map((item, key)=>(
                <Picker.Item label={item.value} value={item.value} key={key} />)
                )}
                
            </Picker>
        )
    }

    OpenSecondActivity (rowData) {
       this.props.navigation.navigate('Second', { placeData: rowData, stationListData : this.state.stationList, pricetimeData: this.state.pricetime });
    }

    render() {
        return(
        <Container>
            <View style={styles.content}>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" 
                    onChangeText={(text) => this.filterSearch(text)}
                    value={this.state.text}/>
                </Item>
            </View>

            <Content>
                <List 
                    dataArray={this.state.data}
                    renderRow={(item) =>
                    <ListItem onPress={this.OpenSecondActivity.bind(this, item)}>
                        {this.getPlaceCard(item)}
                    </ListItem>
                    }
                    keyExtractor = {item => item._key}
                    />
            </Content>

        </Container>
        )
    }
}

// export default ListPlace;

export default Project = StackNavigator(
    {
      First: { screen: ListPlace },
      
      Second: { screen: Detail }
    });