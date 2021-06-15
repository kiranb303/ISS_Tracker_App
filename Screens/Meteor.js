import * as React from 'react';
import{Text, View, StyleSheet,Platform, StatusBar, SafeAreaView, FlatList, ImageBackground, Image, Dimensions} from 'react-native';
import axios from "axios";

export default class Meteor extends React.Component{
    constructor(){
        super();
        this.state = {
            meteors: {},
        };
    }

    getMeteors=()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=YaOtvuxv7HT3Nt0twYmGNLjfA40GhpcsP3EeerXh").then(
            response =>{
                this.setState({meteors: response.data.near_earth_objects});
            }
        ).catch(error =>{
            Alert.alert(error.message);
        });
    }

    renderItem = ({item})=>{
        let meteor = item;
        let bgimg,speed,size;
        if(meteor.threat_score>=30){
            bgimg = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed1.gif");
            size = 100;
        }else if(meteor.threat_score>=75){
            bgimg = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed2.gif");
            size = 150;
        }else{
            bgimg = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 200;
        }
        if(size === 100){
        return(
            <View>
                <ImageBackground source = {bgimg} style = {styles.bgImg}>
                    <View style = {styles.speedView}>
                        <Image source = {speed} style = {{width: size, height: size, alignSelf:"center"}}/>
                        <View>
                            <Text style = {[styles.mttext,{marginTop:400, marginLeft: 50}]}>{item.name}</Text>
                            <Text style = {[styles.detailtext, {marginTop:10, marginLeft: 50}]}>Closest to Earth: {item.close_approach_data[0].close_approach_date_full}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Minimum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Maximum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Velocity(KMPH): {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Missing Earth By(KM): {item.close_approach_data[0].miss_distance.kilometers}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }else {
        return(
        <View>
                <ImageBackground source = {bgimg} style = {styles.bgImg}>
                    <View style = {styles.speedView}>
                        <Image source = {speed} style = {{width: size, height: size, alignSelf:"center"}}/>
                        <View>
                            <Text style = {[styles.mttext,{marginTop:300, marginLeft: 50}]}>{item.name}</Text>
                            <Text style = {[styles.detailtext, {marginTop:10, marginLeft: 50}]}>Closest to Earth: {item.close_approach_data[0].close_approach_date_full}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Minimum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Maximum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                            <Text style = {[styles.detailtext, {marginTop:5, marginLeft: 50}]}>Velocity(KMPH): {item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
                            <Text style = {[styles.detailtext, {marginTop:1, marginLeft: 50}]}>Missing Earth By(KM): {item.close_approach_data[0].miss_distance.kilometers}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            );
    }
    }

    componentDidMount(){
        this.getMeteors();
    }

    keyExtractor = (item, index)=>index.toString();

    render(){
            if(Object.keys(this.state.meteors).length===0){
                return(
                <View style = {{flex: 1, justifyContent: "center", alignItems:"center", backgroundColor:"black"}}>
                    <Text>Loading...</Text>
                </View>
                )
            }else{
                let meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
                    return this.state.meteors[meteor_date]
                });
// meteor_arr contains the info of one day, then we concatinate the information of all 7 days in this line
                let meteors=[].concat.apply([],meteor_arr);
                meteors.forEach(function(element) {
                    let d = (element.estimated_diameter.kilometers.estimated_diameter_min+
                             element.estimated_diameter.kilometers.estimated_diameter_max)/2;
                    let threatScore = (d/element.close_approach_data[0].miss_distance.kilometers)*1000000000;
                    element.threat_score=threatScore;
                });
                meteors.sort(function (a, b){
                    return(b.threat_score-a.threat_score);
                });
                meteors = meteors.slice(0,5);
                return(
                    <View style = {styles.container}>
                        <SafeAreaView style = {styles.safeview} />
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {meteors}
                        renderItem = {this.renderItem}
                        horizontal = {true}/>
                    </View>
                );
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    speedView: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    mttext: {
        fontSize: 20,
        marginBottom:10,
        fontWeight:"bold",
        color: "white",
    },
    detailtext: {
        color:"white",
    }
  });