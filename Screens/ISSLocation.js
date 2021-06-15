import axios from 'axios';
import * as React from 'react';
import{Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ImageBackground,Alert, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import ISS_Info from './ISS_Info';

export default class ISS_Location extends React.Component{
    constructor(){
        super();
        this.state = {
            location : {},
        }
    }
    getISSlocation = async () =>{
        axios.get("https://api.wheretheiss.at/v1/satellites/25544").then(
            response =>{
                this.setState({location: response.data});
            }
        ).catch(error =>{
            Alert.alert(error.message);
        });
    }

    componentDidMount(){
        this.getISSlocation();
    }
    render(){
        if(Object.keys(this.state.location).length===0){
            return(
            <View style = {{flex: 1, justifyContent: "center", alignItems:"center", backgroundColor:"black"}}>
                <Text>Loading...</Text>
            </View>
            )
        }else{
            return(
                <View style = {{flex: 1, justifyContent: "center", alignItems:"center", backgroundColor:"black"}}>
                    <SafeAreaView style = {styles.safeview}/>
                        <ImageBackground source = {require("../assets/iss_bg.jpg")} style = {styles.bgImg}>
                            <View style = {styles.titleBar}>
                                <Text style = {styles.tittle}>ISS Location Screen</Text>
                            </View>
                            <View style = {styles.mapContainer}>
                                <MapView
                                style = {styles.map}
                                region = {{
                                        latitude: this.state.location.latitude,
                                        longitude: this.state.location.longitude,
                                        longitudeDelta: 100,
                                        latitudeDelta: 100,
                                }}>
                                    <Marker 
                                    coordinate = {{
                                        latitude: this.state.location.latitude,
                                        longitude: this.state.location.longitude
                                    }}>
                                        <Image source = {require("../assets/iss_icon.png")} style = {{width: 50, height: 50}}></Image>
                                    </Marker>
                                </MapView>
                            </View>
                            <ISS_Info />
                        </ImageBackground>
                </View>
            )
        }
}
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
    },
    titleBar: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center",
    },
    tittle: {
        justifyContent:"center",
        alignSelf:"center",
        color:"white",
        fontSize: 35,
    },
    options: {
        marginTop:75,
        paddingLeft: 30,
        fontSize: 25,
        fontWeight:"bold"
    },
    safeview: {
        marginTop: Platform.OS==="android"? StatusBar.currentHeight : 0,
    },
    navbutton: {
        flex: 0.25,
        marginLeft:50,
        marginRight: 50,
        marginTop: 40,
        borderRadius: 25,
        backgroundColor: 'white',
        width: 300
    },
    bgImg: {
        flex: 1.25,
        resizeMode: 'cover',
    },
    knowmore: {
        paddingLeft: 25,
        color: 'red',
        fontSize: 12,
    },
    digit: {
        position: 'absolute',
        color: 'rgba(180,180,180,155)',
        fontSize: 150,
        right: 10,
        bottom: -45,
    },
    logo: {
        position:"absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right:20,
        top: -70,
    },
    mapContainer: {
        flex: 0.6,
    },
    map: {
        width: "100%",
        height: "100%"
    }
  });