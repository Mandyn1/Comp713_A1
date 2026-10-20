import { Text, View, ScrollView, Pressable, Alert, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocalSearchParams, router } from "expo-router";
import { API, headers } from "../constraints";

interface Seat {
    id: number,
    seatRow: string,
    seatNumber: string,
    available: boolean
}

interface BookingData {
    showingData: {id: number, name: string, showingDate: string, movieID: number},
    seatingData: {array: Seat[][], rowCount: number, colCount: number}
}
export default function Booking() {
  //== PARAMS PARSED ==
  const { showingID } = useLocalSearchParams<{ showingID: string }>();

  //== USE EFFECT AND STATE EFFECT ==
  //store the booking data from the api resp
  const [booking, setBooking] = useState<BookingData | null>(null)
  //session serotage version for app to store tickets for this user
  const [myTickets, setMyTickets] = useState<Record<number, number>>({});

  //callback load func, since useffect depends getting these variables
  const load = useCallback(async () => {
    try {
        //get the response and check if it returns, then set the booking info
        const res = await fetch(
            `${API}/showings/booking/${showingID}`, {headers}
        );

        //check servers response, if algood, set the booking from json resp
        if (!res.ok) throw new Error('HTTP ${res.status');
        setBooking(await res.json());

    } catch (e) {
        console.log("load failed", e);
    }
  }, [showingID]);

  //load useeffect once then poll every 10 seconds, just like web UI
  useEffect(() => {
    //load then create timer and then clear on return, rec
    load();
    const timer = setInterval(load, 10000);
    return () => clearInterval(timer);
  }, [load]);

  //useeffect to get showings
  useEffect(() => {
    //get the showings
  }, [])


  //== FUNCTIONS ==
  //function to reserve, when user presses on seat
  async function reserve(seatID: number) {
    //set the reservation
    const res = await fetch(
        `${API}/tickets/reserve/${seatID}-in=${showingID}`, { headers }
    );

    //check if reservation worked, if so fetch ticket id from response
    if (!res.ok) {
        Alert.alert("Seat is already taken!"); 
        return load(); //reload
    }

    const { message: ticketID } = await res.json(); //get the ticket ID from server
    setMyTickets(prev => ({ ...prev, [seatID]: ticketID})); //weird ts stuff to add, not overwrite existing, idk how this works lol
    load(); 
  }

  //function to remove a booking if user unselects it on 
  async function release(seatID: number) {
    //release the seat from server
    await fetch(
        `${API}/tickets/release/${myTickets[seatID]}`, { headers }
    );
    setMyTickets(prev => { const { [seatID]: _, ...rest } = prev; return rest; });
    load();
  }

  //display a small text noting of loading (from API call)
  if (!booking) return <Text>Loading...</Text>

  //== RETURN DISPLAY HERE ==
  return (
    //create a scroll view, contianing the booking array
    <ScrollView contentContainerStyle={{ 
      padding: 16, 
      gap: 8,
      flexGrow: 1,
      alignItems: "center", //get in centre 1
      justifyContent: "center" //gen in center 2
      }}>
      
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{booking.showingData.name}</Text>
      <Text>{booking.showingData.showingDate}</Text>
      <Text>press a seat to reserve</Text>

      {booking.seatingData.array.map((row, r) => (
        //layout the arr
        <View key={r} style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <Text style={{ width: 20 }}>{row[0].seatRow}</Text>
          {row.map(seat => {
            //set your seat, check if the one taken is yours to color correctly, and for selcetion opts
            const mine = myTickets[seat.id] !== undefined;
            const taken = !seat.available && !mine;

            //return each seat to build arr, if taken, set to disabled
            return (
              <Pressable key={seat.id} disabled={taken}
                onPress={() => (mine ? release(seat.id) : reserve(seat.id))}
                style={[
                    styles.seatIcon, 
                    {backgroundColor: mine ? "blue" : taken ? "#bbb" : "green"} //change background color based on status
                ]}>
                <Text style={{ color: "white" }}>Seat {seat.seatNumber}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}

      <View style={{alignItems: "center"}}>
      <Text style={{textAlign: "center"}}>Note: make sure seat is correct, once confirmed, cannot undo booking</Text>
      <Link href={{pathname: "/tabs"}}
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
        }}>
      <Text style={{textAlign: "center", fontSize: 17, fontWeight: "bold"}}>Confirm Booking or Exit</Text>
      </Link>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  seatIcon: {
    width: 60, 
    height: 60, 
    borderRadius: 6, 
    alignItems: "center", 
    justifyContent: "center",
  }
});
