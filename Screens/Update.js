import * as React from 'react';
import{Text, View, StyleSheet,Platform, StatusBar, SafeAreaView, FlatList, ImageBackground, Image, Dimensions, Alert, Linking, TouchableOpacity} from 'react-native';
import axios from "axios";

export default class Update extends React.Component{
    constructor(){
        super();
        this.state = {articles: [], reports: [], blogs: [],}
    }

    getArticles=()=>{
        axios.get('https://spaceflightnewsapi.net/api/v2/articles').then(
            response=>{
                this.setState({articles: response.data});
                this.getReports();
            }
        ).catch(error=>{
            Alert.alert(error.message);
        })
    }

    getReports=()=>{
        axios.get('https://spaceflightnewsapi.net/api/v2/reports').then(
            response=>{
                this.setState({reports: response.data});
                this.getBlogs();
            }
        ).catch(error=>{
            Alert.alert(error.message);
        })
    }

    getBlogs=()=>{
        axios.get('https://spaceflightnewsapi.net/api/v2/blogs').then(
            response=>{
                this.setState({blogs: response.data});
            }
        ).catch(error=>{
            Alert.alert(error.message);
        })
    }

    componentDidMount(){
        this.getArticles();
    }

    keyExtractor = (item, index) => index.toString();

    addFlag = (arr, value)=>{
        for(var i = 0; i<arr.length; i++){
            console.log(arr[i]);
            arr[i].type = value;
        }

        return arr;
    }

    renderItem = ({item})=>{
        let url;
        if(item.type === "Report"){
            url = require('../assets/iss_icon.png');
        }else {
            url = require('../assets/meteor.png');
        }
 
        if(item.type==='Article'){
            console.log(item.featured_image);
            return(
                <TouchableOpacity 
                style = {styles.articleContainer}
                onPress = {()=>{Linking.openURL(item.url).catch(err=>console.error("Couldn't Load Page", err))}}>
                    <Text style = {styles.mttext}>
                        {item.title}
                    </Text>
                    <View style = {{justifyContent:"center", alignItems:"center", margin: 20}}>
                        <Image source = {{"uri": item.featured_image}} style = {{width:50, height: 50}}></Image>
                    </View>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity 
                style = {styles.articleContainer}
                onPress = {()=>{Linking.openURL(item.url).catch(err=>console.error("Couldn't Load Page", err))}}>
                    <Text style = {styles.mttext}>
                        {item.title}
                    </Text>
                    <View style = {{justifyContent:"center", alignItems:"center", margin: 20}}>
                        <Image source = {url} style = {{width:50, height: 50}}></Image>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    render(){
        let articles = this.addFlag(this.state.articles, "Article");
        let reports = this.addFlag(this.state.reports, "Reports");
        let blogs = this.addFlag(this.state.blogs, "Blogs");

        let events = articles.concat(reports).concat(blogs);
        events = events.sort(function (a, b){
            return new Date(b.published_date) - new Date(a.published_date);
        })
        if(events.length===0){
            return(
                <View style = {{flex: 1, justifyContent:"center", alignItems: "center"}}>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }else{
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.safeview}/>
                    <ImageBackground style = {styles.bgImg} source = {require("../assets/bg_updates.jpg")}>
                        <View style = {{flex: 0.15, justifyContent:"center", alignItems: "center"}}>
                            <Text style = {styles.tittle}>Updates</Text>
                        </View>
                        <View style = {styles.flatcontainer}>
                            <FlatList
                            keyExtractor = {this.keyExtractor} 
                            data = {events}
                            renderItem = {this.renderItem}
                            />
                        </View>
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
        color: "black",
    },
    detailtext: {
        color:"white",
    },
    flatcontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
    },
    articleContainer:{
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.9)'
    }
  });