import React,{Component} from "react";
import {View, Text, TouchableOpacity,StyleSheet} from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";


const styles = StyleSheet.create({
     text: { color: "#ffff", fontSize: 15 },
     button: { width: "43%", height: 55, justifyContent: "center", alignItems: "center", backgroundColor: "#F48D20", borderRadius: 15 }
})


export default class Screen1 extends Component{
   constructor(props){
    super(props);    
    
    this.state={
        notState: "normal",
        cameraPermission: null,
        scan: false,
        data: "",
    };
    

   }
   getCameraPermissions = async notState => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState ({ cameraPermission: status === "granted",
                    notState: notState,
                    scan: false });
        
} ;

BarCodeScanned = async ({type, data})=>{
    this.setState({data: data,
                    notState: "normal",
                    scan: true
                });
};


   
    render(){
        const{notState, cameraPermission, scan, data} = this.state;

       if(notState === "scanner"){
            return(
                <BarCodeScanner onBarCodeScanned={scan ? undefined: this.BarCodeScanned} style ={StyleSheet.absoluteFillObject}>

            
                </BarCodeScanner>
            )

            
       }

        return (
            <View style = {{backgroundColor: "#00ffff" }}>
      <Text>
    { cameraPermission ? data: "permissão da camera"  }
      </Text>

        <TouchableOpacity style = {styles.button} onPress={()=> this.getCameraPermissions("scanner")}>
            
            <Text style = {styles.text}>
            Digitalizar QR code
            </Text>

        </TouchableOpacity>
            </View>
        )

    }

}