import React from 'react';
import { View, Image } from 'react-native';
import { Container, Button, Text, Header, Body, Title, Content, List, ListItem, Card, CardItem, Item, Icon, Input, Right, Left} from 'native-base';
import styles from '../styles/HomeStyle';
import * as firebase from 'firebase';

class ListPlace extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
        };

        this.itemsRef = this.getRef().child('places');
    }

    getRef(){
       return firebase.database().ref();
    }

    componentDidMount(){
        this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
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
        })
    }


    render() {
        return(
        <Container>
            <Header>
                <Body>
                    <Title>Transight</Title>
                </Body>
            </Header>

            <Content>
                <List 
                    dataArray={this.state.data}
                    renderRow={(item) =>
                    <ListItem>
                        <Card>
                            <CardItem header>
                                <Body>
                                    <Text>{`${item.name}`}</Text>
                                    <Text note>{`${item.station}`}</Text>
                                </Body>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{uri: item.img}} style={{height: 200, width: null, flex: 1}}/>
                            </CardItem>
                        </Card>
                    </ListItem>
                    }>
                </List>
            </Content>

        </Container>
        )
    }
}

export default ListPlace;