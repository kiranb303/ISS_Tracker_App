import * as React from 'react';
import{Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ImageBackground, Image} from 'react-native';

export default class Home extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView  style = {styles.safeview}/>
                    <ImageBackground source = {require("../assets/bg_image.png")} style = {styles.bgImg}>
                        <Text style = {styles.tittle}>ISS Tracker App</Text>

                        <TouchableOpacity
                         style = {styles.navbutton}
                         onPress = {()=>this.props.navigation.navigate("ISS_Location")}>
                            <Text style = {styles.options}>ISS Location</Text>
                            <Text style = {styles.knowmore}>{"Know More--->"}</Text>
                            <Text style = {styles.digit}>1</Text>
                            <Image source = {require("../assets/iss_icon.png")} style = {styles.logo}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity 
                         style = {styles.navbutton}
                         onPress = {()=>this.props.navigation.navigate("Meteor")}>
                            <Text style = {styles.options}>Meteors</Text>
                            <Text style = {styles.knowmore}>{"Know More--->"}</Text>
                            <Text style = {styles.digit}>2</Text>
                            <Image source = {require("../assets/meteor_icon.png")} style = {styles.logo}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity
                         style = {styles.navbutton}
                         onPress = {()=>this.props.navigation.navigate("Update")}>
                            <Text style = {styles.options}>Updates</Text>
                            <Text style = {styles.knowmore}>{"Know More--->"}</Text>
                            <Text style = {styles.digit}>3</Text>
                            <Image source = {require("../assets/rocket_icon.png")} style = {styles.logo}></Image>
                        </TouchableOpacity>
                    </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      
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
    }
  });
  