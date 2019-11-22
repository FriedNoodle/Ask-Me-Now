import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight, Alert, Modal } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab, Button, Icon } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import { db, storage } from '../config/db';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob;



let imageRef = db.ref('/gallery');


export default class AdminGallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      images : [],
      available: true,
      modalVisible: false,
      eventID: this.props.eventID,
      url:null,
      imageType:null
    }

    this.pickImage = this.pickImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  componentDidMount(){
    let query = imageRef.child(this.state.eventID);
    query.on('value', (snapshot)=>{
      let data = snapshot.val();
      if(data){
        let firebaseData = Object.values(data);
        this.setState({images: firebaseData});
      }
      else{
        this.setState({
          available:false
        })
      }
    })
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible})
  }

  pickImage (){
    ImagePicker.openPicker({
      cropping:true
    }).then(image=>{
        this.setState({
            url : image.path,
            imageType : image.mime
        }),

        this.uploadImage();
    }).catch((error)=>{
        console.log(error)
        })
    }


    uploadImage () {
    
        return new Promise((resolve,reject)=> {
            let uploadBlob = null;
            const appendIDToImage = new Date().getTime();
            const imageRef = storage.ref('/gallery').child(`${appendIDToImage}`);
        
            fs.readFile(this.state.url, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${this.state.imageType};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: this.state.imageType })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
                console.log(url)
                db.ref('/gallery').child(this.state.eventID).push({
                    url:url
                })
                })
            .catch((error) => {
                reject(error)
            })      
        })
    }
  render() {

    return (
      <Container>
        
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => 
            this.setModalVisible(!this.state.modalVisible)}>
          
            <ImageViewer saveToLocalByLongPress={false} imageUrls={this.state.images}></ImageViewer>
          </Modal>

        <Content padder>
        <FlatGrid
        itemDimension={130}
        items={this.state.images}
        style={styles.gridView}
   
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            
            <TouchableHighlight onPress={()=>{
              this.setModalVisible(true)
            }}><Image style={{width:153,height:148}}
            source={{uri:item.url}}></Image></TouchableHighlight>
            
          </View>
          
        )}
      />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.pickImage}>

            <Icon name="camera" />

            <Text style={{color:'white'}}>Upload Image</Text>

            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    
    
    height: 150,
    borderWidth:1,
    borderRadius:5,

  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
});