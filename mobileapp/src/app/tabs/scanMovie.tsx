
import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Link, router } from "expo-router";
import { API, headers } from "../../constraints";


interface BriefShowingInfo {
    showingName: string,
    showingDate: string
}

export default function Scan() {
    //create variables for requesting camera permissions
    const [permission, requestPermission] = useCameraPermissions();

    //set the scanned data in the useState to store variables and other variables
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [showInfo, setShowInfo] = useState<BriefShowingInfo | null>(null);

    //check if permission, if not granted, prompt user
    if (!permission) {
        return <Text>Checking camera permission...</Text>;
    }

    if (!permission.granted) {
        return (
            //create a view to prompt user to allow for camera
            <View style={styles.container}>
                <Text>We need camera permission to scan QR codes.</Text>
                <Button
                    title="Allow camera"
                    onPress={requestPermission}
                />
            </View>
        );
    }

    async function checkShowingCode(showingID: string){
        try {
            //use a get req to see if the showing ID is valid
            const res = await fetch(
                `${API}/showings/booking/${showingID}`, {headers}
            );
            
            //if request is not valid, means invalid showingID
            if (!res.ok)  {
                //
                <Text>Invalid Movie Code!</Text>
            }
            //get the data to set the showing info
            const data = await res.json();
            setShowInfo({
                showingName: data.showingData.name,
                showingDate: data.showingData.showingDate
            });

            //now store the showing ID
            setScannedData(showingID); //this is kinda scuffed with useState but it works
        } catch (e){
            <Text>Something went wrong!</Text>
            
        }
    }

    async function goToBooking(showingID: string) {
        try{
            //go to the bookings page for the specfic showing
            router.push({
                pathname: "/booking",
                params: { showingID: showingID }
            })
        } catch(e) {
            console.log(e);
        }

    }

    //perform scanning function
    return (
        //create the camera view inside a view contianer
        <View style={styles.container}>
            <CameraView
                //define the cameras propertoes, needs back camera, and to scan barcode
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={
                    scannedData ? undefined : ({ data }) => {
                        setScannedData(data); //store the data in the userState

                    }
                }
            />
        {scannedData && (
            <Button
                title="Book the"
                onPress={() => goToBooking(scannedData)}
            />
        )}
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    result: {
        padding: 20,
        gap: 10,
    },
});
