import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        marginBottom: 5
    },
    tag : {
        color: "#999999",
        fontWeight: "800",
        marginBottom: 15
    },
    content: {
        margin: 20
    },
    des : {
        color: "#222222",
        fontWeight: "300",
        marginBottom: 20
    },
    picker: {
        width: 330,
        backgroundColor: '#efefef'
    },

    pricetime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
    },

    center: {
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 40
    },

    largeFont: {
        fontSize: 30
    },

    fromto: {
        fontSize: 15,
        fontWeight: "700"
    },
    map: {
        height: 350
    }

});