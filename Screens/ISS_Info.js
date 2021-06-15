import * as React from 'react';
import{Text, View, StyleSheet, Alert} from 'react-native';

export default class ISS_Location extends React.Component{
    constructor(){
        super();
        this.state = {location: {} };
    }
     componentDidMount(){
        this.getISSlocation();
        try{
            setInterval(async()=>{
                this.getISSlocation();
            }, 5000);
        }catch(error){
            console.log(error);
        }
    }
    getISSlocation =()=>{
        axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(
            response=>{
                this.setState({location: response.data});
               // Alert.alert(this.state.location);
            }
        ).catch(error=>{
            Alert.alert(error.message);
        });
    }

   

    render(){
        if(Object.keys(this.state.location).length===0){
            return(
                <View style = {{flex: 1, justifyContent: "center", alignItems:"center", backgroundColor:"white"}}>
                    <Text>Loading...</Text>
                </View>
               )
            }
            else{
                <View style = {styles.infoContainer}>
                    <Text style = {styles.infoText}>
                        Latitude: {this.state.location.latitude}
                    </Text>
                    <Text style = {styles.infoText}>
                        Longitude: {this.state.location.longitude}
                    </Text>
                    <Text style = {styles.infoText}>
                        Altitude: {this.state.location.altitude}
                    </Text>
                    <Text style = {styles.infoText}>
                        Velocity: {this.state.location.velocity}
                    </Text>
                </View>
            }
        }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
    },
    infoText: {
        fontSize:15,
        color: 'black',
        fontWeight: 'bold',
    },
})
