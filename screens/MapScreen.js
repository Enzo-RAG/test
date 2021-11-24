import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import {Button, ListItem, Input, Overlay} from 'react-native-elements';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MapScreen(props) {

  const [ lat, setLat] = useState(48.866667) 
  const [lon, setLon] = useState(2.333333) 
  const [addpoi , setADDPOI] = useState(false)
  const [pointlist2 , setPoint2] = useState([])
  const [firstName, setFirstName] = useState("");
  const [pointlist , setPoint] = useState([])
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible)
  setPoint(([...pointlist, {point: pointlist2, nom: firstName}]))}
  


  const changeetat = (() => {
    if(addpoi === true){
      
    setADDPOI(false)
  }else if(addpoi === false){
    setADDPOI(true)
    
  }})

  const addpoint =((e) =>{
    if(addpoi === true){
     setPoint2(e.nativeEvent)
      setADDPOI(false)
      setVisible(!visible)
    }
  })
  
  console.log(addpoi)
  console.log(pointlist)
  console.log("test")
  console.log(pointlist.longitude)
  console.log("jesuis la ")
  

  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({distanceInterval: 2}, (location) => { setLat(location.coords.latitude), setLon(location.coords.longitude); });
       }
    }
   
    askPermissions();
   }, []);
   
   
  console.log(lat)
  return (
    
    <View style={{flex : 1}}>
     <View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
        <Input 
 onChangeText={(val) => setFirstName(val)}
 value={firstName}
/>
<Button onPress={()=> console.log(firstName) }>ok</Button>
</View>
        
      </Overlay>
      </View>
         
        
     
      <MapView style={{flex : 1}} 
      mapType="satellite" // Modifier le type d’affichage

      showsTraffic={true} // Afficher les informations du trafic
      onPress={ e => addpoint(e) }
      
      zoomEnabled={true} 
 initialRegion={{
   latitude: lat,  // pour centrer la carte
   longitude: lon,
   latitudeDelta: 0.0922,  // le rayon à afficher à partir du centre
   longitudeDelta: 0.0421,
}} >
        
     <Marker 
    
    coordinate={{latitude: lat , longitude: lon}} 
   title="Hello" 
    description="I am here"
    draggable  // Rendre le marqueur drag & dropable
    opacity={0.5}
    pinColor="red"  // Modifier l'opacité 
    />          
                  
    {pointlist.map((point,i) => (
     <View key={i}    >
        
    <Marker 
    
    coordinate={{latitude: point.point.coordinate.latitude , longitude: point.point.coordinate.longitude}} 
   title={point.nom} 
    description="I am here"
    draggable  // Rendre le marqueur drag & dropable
    opacity={0.5}
    pinColor="blue"  // Modifier l'opacité 
    />
    
    </View>
    ))}
     </MapView>
    <Button 
    onPress={() => {changeetat()}}
    icon={
        <Icon
        name="envelope-o"
        size={20}
        color="#ffffff"
        />
    } 
    title="ajout d'un POI"
    buttonStyle={{backgroundColor: "#eb4d4b"}}
    type="solid"
    />
     
                

              
    </View>
  );
}








// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function MapScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Map screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
