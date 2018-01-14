import React, { Component, } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, ActivityIndicator, ListView, Text, View, StatusBar, Button, TextInput, CameraRoll, ScrollView, Slider, Vibration } from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import styles from './styles';
import { Constants, Camera, FileSystem, Permissions, takeSnapshotAsync } from 'expo';
import {uuid} from './App';

import { MICROSOFT_KEY } from './config'

const landmarkSize = 2;
const endpoint = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";
const key1 = "2b6eb38dbc4744db9b0b13cce8d36449";
const key2 = "26e20ee52db64acb82339b62cf926939";


const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
  };
  
const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
    
  };

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const Base64 = {
    btoa: (input = '')  => {
      let str = input;
      let output = '';
  
      for (let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || (map = '=', i % 1);
      output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
  
        charCode = str.charCodeAt(i += 3/4);
  
        if (charCode > 0xFF) {
          throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        
        block = block << 8 | charCode;
      }
      
      return output;
    },
  
    atob: (input) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let str = input
          .replace(/=+$/, '')
          .replace(/^data:image\/‌​(png|jpg);base64,/, '‌​');
        let output = '';
        // if (str.length % 4 == 1) {   throw new Error("'atob' failed: The string to be
        // decoded is not correctly encoded."); }
        for (let bc = 0, bs = 0, buffer, i = 0; buffer = str.charAt(i++); ~buffer && (bs = bc % 4
          ? bs * 64 + buffer
          : buffer, bc++ % 4)
          ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6))
          : 0) {
          buffer = chars.indexOf(buffer);
        }
        return output;
      },


    convertToByteArray : (input) => {
        var binary_string = Base64.atob(input);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes
      }
  };


export default class PersonGroup extends Component {

    
    // state = {
    //     hasCameraPermission: null,
    //     type: Camera.Constants.Type.back,
    //   };
    
    //   async componentWillMount() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({ hasCameraPermission: status === 'granted' });
    //   }
    
    //   render() {
    //     const { hasCameraPermission } = this.state;
    //     if (hasCameraPermission === null) {
    //       return <View />;
    //     } else if (hasCameraPermission === false) {
    //       return <Text>No access to camera</Text>;
    //     } else {
    //       return (
    //         <View style={{ flex: 1 }}>
    //           <Camera style={{ flex: 1 }} type={this.state.type}>
    //             <View
    //               style={{
    //                 flex: 1,
    //                 backgroundColor: 'transparent',
    //                 flexDirection: 'row',
    //               }}>
    //               <TouchableOpacity
    //                 style={{
    //                   flex: 0.1,
    //                   alignSelf: 'flex-end',
    //                   alignItems: 'center',
    //                 }}
    //                 onPress={() => {
    //                   this.setState({
    //                     type: this.state.type === Camera.Constants.Type.back
    //                       ? Camera.Constants.Type.front
    //                       : Camera.Constants.Type.back,
    //                   });
    //                 }}>
    //                 <Text
    //                   style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
    //                   {' '}Flip{' '}
    //                 </Text>
    //               </TouchableOpacity>
    //             </View>
    //           </Camera>
    //         </View>
    //       );
    //     }
    //   }

    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
        faces: [],
        permissionsGranted: false,
        personGroupName: uuid,
        personId: ''
    };
    
      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log("CREATE PROFILE")
        this.setState({ permissionsGranted: status === 'granted' });
      }
    
      getRatios = async () => {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
      };
    
      toggleView() {
        this.setState({
          showGallery: !this.state.showGallery,
        });
      }
    
      toggleFacing() {
        this.setState({
          type: this.state.type === 'back' ? 'front' : 'back',
        });
      }
    
      toggleFlash() {
        this.setState({
          flash: flashModeOrder[this.state.flash],
        });
      }
    
      setRatio(ratio) {
        this.setState({
          ratio,
        });
      }
    
      toggleWB() {
        this.setState({
          whiteBalance: wbOrder[this.state.whiteBalance],
        });
      }
    
      toggleFocus() {
        this.setState({
          autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
      }
    
      zoomOut() {
        this.setState({
          zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
      }
    
      zoomIn() {
        this.setState({
          zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
      }
    
      setFocusDepth(depth) {
        this.setState({
          depth,
        });
      }
    
      getMoviesFromApi = async function(photoData) {
        //   console.log(photoUri)
        //   console.log(photoName)
        try {
        // var photo = {
        //     uri: photoUri,
        //     type: 'image/jpeg',
        //     name: photoName,
        // };
        //  var data = new FormData();
        //  data.append('file ', photo);


        if (this.state.personId == '') {
          console.log(this.state.personGroupName)
          let responseGroupCreate = await fetch(
            'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/'+this.state.personGroupName, {
              method: 'PUT',
              headers: {
                'Ocp-Apim-Subscription-Key':MICROSOFT_KEY,
                //'Content-Type':'application/json'
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'name' : this.state.personGroupName
            })
          });
          try {
            let responseGroupCreateJson = await responseGroupCreate.json();
            console.log(responseGroupCreateJson);

          }
          catch (error) {
            console.log("this is error: " + error);
          }

          let responseCreate = await fetch(
            'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/'+this.state.personGroupName+'/persons/', {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key':MICROSOFT_KEY,
                    //'Content-Type':'application/json'
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name' : this.state.personGroupName
                })
                //body: Base64.convertToByteArray(photoData)
  
            });
  
          let responseJsonCreate = await responseCreate.json();
          this.state.personId = responseJsonCreate['personId']
          console.log("NEW PERSON ID CREATED: " + this.state.personId);
        }

        else {
          console.log("USING PERSON ID: " + this.state.personId);
        }
        
          

          let response = await fetch(
            'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/'+this.state.personGroupName+'/persons/'+this.state.personId+'/persistedFaces', {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key':MICROSOFT_KEY,
                    //'Content-Type':'application/json'
                    'Content-Type': 'application/octet-stream'
                },
                // body: JSON.stringify({
                //     'url' : "https://68.media.tumblr.com/tumblr_mda04pyFx71rvapjbo1_1280.jpg"
                // })
                body: Base64.convertToByteArray(photoData)

            });

          let responseJson = await response.json();
          console.log(responseJson);

        } catch (error) {
          console.log(error);
        }
      }


      takePicture = async function() {
        if (this.camera) {
          this.camera.takePictureAsync({quality: 1, base64:true}).then(data => {
            console.log(data.base64);
             CameraRoll.saveToCameraRoll(data.uri, 'photo').then(newURI => {
               Vibration.vibrate();
            //   var nameOfPhoto = data.uri.split('/')[data.uri.split('/').length-1];
            //   this.getMoviesFromApi(data.uri, nameOfPhoto);
             });
            this.getMoviesFromApi(data.base64);
            
        //     // console.log(data);
        //     // console.log(FileSystem.documentDirectory)
        //     FileSystem.moveAsync({
        //       from: data.uri,
        //       to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`,
        //     }).then(() => {
        //       this.setState({
        //         photoId: this.state.photoId + 1,
        //       });
        //       Vibration.vibrate();
        //     })
        //     .catch((e) => {
        //         console.log(e, 'ERROR');
        //       });
        //   })
        //   .catch((e) => {
        //     console.log(e, 'takePicture ERROR');
        //   });
            }); 
        };
    };

      _saveToCameraRollAsync = async () => {
        let result = await takeSnapshotAsync(this._container, {
          format: 'png',
          result: 'file',
        });
    
        let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
        this.setState({ cameraRollUri: saveResult });
      };
    
      onFacesDetected = ({ faces }) => this.setState({ faces });
      onFaceDetectionError = state => console.warn('Faces detection error:', state);
    
      renderFace({ bounds, faceID, rollAngle, yawAngle }) {
        return (
          <View
            key={faceID}
            transform={[
              { perspective: 600 },
              { rotateZ: `${rollAngle.toFixed(0)}deg` },
              { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]}
            style={[
              styles.face,
              {
                ...bounds.size,
                left: bounds.origin.x,
                top: bounds.origin.y,
              },
            ]}>
            <Text style={styles.faceText}>ID: {faceID}</Text>
            <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
            <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
          </View>
        );
      }
    
      renderLandmarksOfFace(face) {
        const renderLandmark = position =>
          position && (
            <View
              style={[
                styles.landmark,
                {
                  left: position.x - landmarkSize / 2,
                  top: position.y - landmarkSize / 2,
                },
              ]}
            />
          );
        return (
          <View key={`landmarks-${face.faceID}`}>
            {renderLandmark(face.leftEyePosition)}
            {renderLandmark(face.rightEyePosition)}
            {renderLandmark(face.leftEarPosition)}
            {renderLandmark(face.rightEarPosition)}
            {renderLandmark(face.leftCheekPosition)}
            {renderLandmark(face.rightCheekPosition)}
            {renderLandmark(face.leftMouthPosition)}
            {renderLandmark(face.mouthPosition)}
            {renderLandmark(face.rightMouthPosition)}
            {renderLandmark(face.noseBasePosition)}
            {renderLandmark(face.bottomMouthPosition)}
          </View>
        );
      }
    
      renderFaces() {
        return (
          <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderFace)}
          </View>
        );
      }
    
      renderLandmarks() {
        return (
          <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderLandmarksOfFace)}
          </View>
        );
      }
    
      renderNoPermissions() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Text style={{ color: 'white' }}>
              Camera permissions not granted - cannot open camera preview.
            </Text>
          </View>
        );
      }
    
      renderCamera() {
        return (
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            stylebb200ac6-10a0-40f2-8c6e-b39959f1110a={{
              flex: 1,
            }}
            type={this.state.type}
            flashMode={this.state.flash}
            autoFocus={this.state.autoFocus}
            zoom={this.state.zoom}
            whiteBalance={this.state.whiteBalance}
            ratio={this.state.ratio}
            onFacesDetected={this.onFacesDetected}
            onFaceDetectionError={this.onFaceDetectionError}
            focusDepth={this.state.depth}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: Constants.statusBarHeight / 2,
              }}>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                <Text style={styles.flipText}> FLIP </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
                <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.4,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginBottom: -5,
              }}>
              {this.state.autoFocus !== 'on' ? (
                <Slider
                  style={{ width: 150, marginTop: 15, marginRight: 15, alignSelf: 'flex-end' }}
                  onValueChange={this.setFocusDepth.bind(this)}
                  step={0.1}
                />
              ) : null}
            </View>
            <View
              style={{
                flex: 0.1,
                paddingBottom: 0,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                onPress={this.zoomIn.bind(this)}>
                <Text style={styles.flipText}> + </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                onPress={this.zoomOut.bind(this)}>
                <Text style={styles.flipText}> - </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                onPress={this.toggleFocus.bind(this)}>
                <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                onPress={this.takePicture.bind(this)}>
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, styles.galleryButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                onPress={this.toggleView.bind(this)}>
                <Text style={styles.flipText}> Gallery </Text>
              </TouchableOpacity>
            </View>
            {this.renderFaces()}
            {this.renderLandmarks()}
          </Camera>
        );
      }
    
      render() {
        const cameraScreenContent = this.state.permissionsGranted
          ? this.renderCamera()
          : this.renderNoPermissions();
        const content = cameraScreenContent;
        return <View style={styles.container}>{content}
        
        </View>;
      }
}
