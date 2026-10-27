import { useState, useRef } from "react"; // CHANGED: added useRef
import { View, Text, StyleSheet, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Link, router } from "expo-router"; // (Link is unused, safe to delete)
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

    //error message to show on screen
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // busy flag to stop scanner constantly scanning
    const busy = useRef(false);

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
        //check scanner status
        if (busy.current) return;
        busy.current = true;

        try {
            //first check if Qr code is number, saves having to fetch some codes
            if (!/^\d+$/.test(showingID.trim())) {
                setErrorMessage("Invalid Movie Code!");
                return;
            }

            //use a get req to see if the showing ID is valid
            const res = await fetch(
                `${API}/showings/${showingID}`, {headers}
            );
            //if request is not valid, means invalid showingID
            if (!res.ok)  {
                //set error message and exit func
                setErrorMessage("Invalid Movie Code!");
                return;
            }
            //get the data to set the showing info
            const data = await res.json();
            setShowInfo({
                showingName: data.showingData.name,
                showingDate: data.showingData.showingDate
            });

            //now store the showing ID
            setScannedData(showingID); //this is kinda scuffed with useState but it works
            setErrorMessage(null); //clear error messages
        } catch (e){
            console.log(e);
            //also set error message to display
            setErrorMessage("Something went wrong!");
        } finally {
            busy.current = false; // CHANGED: allow the next check
        }
    }

    //reset all user states, so user can scan again with new values
    function scanAgain() {
        setScannedData(null);
        setShowInfo(null);
        setErrorMessage(null);
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
                //scan the data, check for error message
                onBarcodeScanned={
                    scannedData || errorMessage ? undefined : ({ data }) => {
                        checkShowingCode(data); //validate the code and fetch the showing info
                    }
                }
            />

            {/*show the error message to user, then give a option to scan again*/}
            <View style={styles.result}>
                {errorMessage && <Text>{errorMessage}</Text>}

                {showInfo && (
                    <>
                        <Text>{showInfo.showingName}</Text>
                        <Text>{showInfo.showingDate}</Text>
                    </>
                )}

                {(scannedData || errorMessage) && (
                    <Button title="Scan again" onPress={scanAgain} />
                )}
            </View>

            {scannedData && (
                <Button
                    // show the booking name
                    title={`Book ${showInfo?.showingName ?? "showing"}`}
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
