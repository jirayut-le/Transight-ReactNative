import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import styles from '../styles/HomeStyle';

class Home extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Button bordered dark 
                    onPress={()=> this.props.switchScreen("list")}>
                    <Text>Get Start</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default Home;