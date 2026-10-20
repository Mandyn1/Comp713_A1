import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import {useEffect, useState} from "react";
import { useLocalSearchParams } from "expo-router"


export default function Booking() {
  //== PARAMS PARSED ==
  const { showingID } = useLocalSearchParams<{ showingID: string }>();

  //== USE EFFECT AND STATE EFFECT ==
  //all the movies from the get req stored in Movie[] arr
  

  //useeffect to get showings
  useEffect(() => {
    //get the showings
  }, [])


  //== FUNCTIONS ==
  //function to get movie details based on showing ID
  async function getBookingInfo(showingID: string) {
    try {
        const response = await fetch (
            `http://192.168.0.208:5000/api/showings/booking/${showingID}`,
            {
             headers: {
              "app-type": "mobile"
            }
            }
        )
      //response json
      const data = await response.json();

      console.log(data.showingData);
      console.log(data.seatingData);

    } catch(error){
      console.log("Error fetching showings", error);
    }
  }
  
  getBookingInfo(showingID);
  //== RETURN DISPLAY HERE ==
  return (
    <ScrollView>
        <Text>Hello</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  movieName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },

  movieDetails: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    textAlign: "center"
  }
});
