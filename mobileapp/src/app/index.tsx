import { Text, View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import {useEffect, useState} from "react";
import { Link } from "expo-router"

//movie type
interface Showing {
  id: number,
  showingDate: string,
  movie: string,
  movieID: number
}

export default function Index() {
  //== USE EFFECT AND STATE EFFECT ==
  //all the movies from the get req stored in Movie[] arr
  const [showings, setShowings] = useState<Showing[]>([])

  //useeffect to get showings
  useEffect(() => {
    //get the showings
    getShowingsList()
  }, [])


  //== FUNCTIONS ==
  //function to get the current showings list
  async function getShowingsList() {
    //get showlist, perform basic header for security (minimal)
    try {
      const response = await fetch (
        "http://192.168.0.208:5000/api/showings/list",
        {
          headers: {
            "app-type": "mobile"
          }
        }
      )
      //response json
      const data = await response.json();

      //now set the movies to the user state
      const allMovies = await Promise.all(
        data.map(async (movie: any) => {
          //return the data
          return {
              id: movie.id,
              showingDate: movie.showingDate,
              movie: movie.movie,
              movieID: movie.movieID
          };
        })
      )

      //now set the state variable
      setShowings(allMovies);
      console.log(data);
    } catch(error){
      console.log("Error fetching showings", error);
    }
  }
  
  
  
  //== RETURN DISPLAY HERE ==
  return (
    <ScrollView>
      {showings.map((showing) => (
        //display basic text for now
        <View key={showing.id} style={{ alignItems: "center"}}>
          <Text style={styles.movieName}>Movie name: {showing.movie}</Text>
          <Text style={styles.movieDetails}>Movie showing date: {showing.showingDate} </Text>
          <Text style={styles.movieDetails}>Movie ID debug: {showing.movieID}</Text>
        </View>
      ))}
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
