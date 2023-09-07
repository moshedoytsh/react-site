import React from "react";
import { useCurrentDisplay } from "../routes/CurrentDisplayContext";
import TripCard from "./TripCard";
import { useTrips } from "./providers/TripsContext";
import { useAuthorization } from "../authorization/AuthorizationContext";
import { useMassages } from "../components/massages/MassagesContext";

type TripsProps = {
  setTrip: React.Dispatch<React.SetStateAction<string>>
  setEditTrip: React.Dispatch<React.SetStateAction<string>>
}

const Trips = ({ setTrip, setEditTrip }: TripsProps) => {
  const { setDisplay } = useCurrentDisplay();
  const { trips } = useTrips();
  const { authorizationStatus } = useAuthorization()
  const { setMassage } = useMassages();

  return (
    <div className="trips-page">
      <h1 className="trips-headline">Trips</h1>
      {trips ? <div className="all-trips">{trips.map((trip) => <TripCard {...trip} key={trip.id} setTrip={setTrip} setEditTrip={setEditTrip}></TripCard>)}</div>
      : <h2>Couldn't Get Trips Information</h2>}
      <button onClick={() => setDisplay('home')}>Home</button>
      <button onClick={() => {
        if (!authorizationStatus.loggedIn) return setMassage('unauthorized');
        setDisplay('new-trip-form');
      }}>New Trip</button>
    </div>
  )
}

export default Trips;