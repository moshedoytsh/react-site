import { FormEvent, useState } from "react";
import { useCurrentDisplay } from "../routes/CurrentDisplayContext";
import { useAuthorization } from "../authorization/AuthorizationContext";
import { useTrips } from "./providers/TripsContext";
import { useMassages } from "../components/massages/MassagesContext";

const emptyTrip = {
  name: '',
  destination: '',
  startDate: '',
  endDate: '',
  image: '',
  description: '',
  price: '',
  activities: ['']
}

const NewTripForm = () => {
  const { setDisplay } = useCurrentDisplay();
  const [trip, setTrip] = useState(emptyTrip);
  const { authorizationStatus } = useAuthorization();
  const { reloadTrips } = useTrips();
  const { setMassage } = useMassages();

  const addTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authorizationStatus.loggedIn) return setMassage('unauthorized');

    fetch('http://127.0.0.1:3000/api/trips',
    {
      method: 'POST',
      headers: {
        authorization: authorizationStatus.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    .then(res => res.status === 201 ? res : Promise.reject( new Error("server error")))
    .then(res => res.json())
    .then(() => setTrip(emptyTrip))
    .then(() => setMassage('trip-updated'))
    .then(reloadTrips)
    .catch(() => setMassage('server-error'));
  };

  return (
    <div>
      <h1>New Trip</h1>
      <form onSubmit={addTrip}>
        <label>
          Title:
          <input
          type="text"
          value={trip.name}
          required
          onChange={(e) => setTrip({...trip, name: e.target.value})}
          />
        </label>
        <label>
          Destination:
          <input
          type="text"
          value={trip.destination}
          onChange={(e) => setTrip({...trip, destination: e.target.value})}
          />
        </label>
        <label>
          Start Date:
          <input
          type="date"
          value={trip.startDate}
          onChange={(e) => setTrip({...trip, startDate: e.target.value})}
          />
        </label>
        <label>
          End Date:
          <input
          type="date"
          value={trip.endDate}
          onChange={(e) => setTrip({...trip, endDate: e.target.value})}
          />
        </label>
        <label>
          Description:
          <input
          type="text"
          value={trip.description}
          onChange={(e) => setTrip({...trip, description: e.target.value})}
          />
        </label>
        <label>
          Price:
          <input
          type="number"
          value={trip.price}
          onChange={(e) => setTrip({...trip, price: e.target.value})}
          />
        </label>
        <label>
          Image URL:
          <input
          type="text"
          value={trip.image}
          onChange={(e) => setTrip({...trip, image: e.target.value})}
          />
        </label>
        <label>
          Activities (separated by comma and space bar):
          <input
          type="text"
          value={trip.activities.join(', ')}
          onChange={(e) => setTrip({...trip, activities: e.target.value.split(', ')})}
          />
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setDisplay('home')}>Home</button>
      <button onClick={() => setDisplay('trips')}>All Trips</button>

    </div>
  )
}

export default NewTripForm;
