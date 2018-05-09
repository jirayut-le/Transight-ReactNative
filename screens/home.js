import React from 'react';
import { View, Image} from 'react-native';
import { Button, Text } from 'native-base';
import styles from '../styles/HomeStyle';

var logo = require('../assets/icon.png');

class Home extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={logo}/>
                    <Button bordered dark style={styles.btn}
                    onPress={()=> this.props.switchScreen("list")}>
                    <Text>Get Start</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default Home;