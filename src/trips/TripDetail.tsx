import { useEffect, useState } from "react";
import { useCurrentDisplay } from "../routes/CurrentDisplayContext";
import '../styles.css'
import { useMassages } from "../components/massages/MassagesContext";

const emptyTrip = {
  id: 'unknown',
  name: 'unknown',
  destination: 'unknown',
  startDate: 'unknown',
  endDate: 'unknown',
  image: 'unknown',
  price: 'unknown',
  activities: ['unknown']
}

type TripDetailProps = {
  id: string
}

const TripDetail = ( { id }: TripDetailProps ) => {
  const { setDisplay } = useCurrentDisplay();
  const [trip, setTrip] = useState(emptyTrip);
  const { setMassage } = useMassages();

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/api/trips/${id}`)
    .then(res => res.json())
    .then(trip => setTrip(trip))
    .catch(() => setMassage('server-error'));
  })

  const { name, destination, startDate, endDate, image, price, activities } = trip;

  return (
    <div>
      <div className="trip-display">
        <h1>{name}</h1>
        <img src={image} alt="trip image" />
        <div>
          <span>Destination: {destination}</span>
          <br />
          <span>Start Date: {startDate}</span>
          <br />
          <span>End Date: {endDate}</span>
          <br />
          <span>Activities:</span>
          <ul>
            {activities.map((value, index) => <li key={index}>{value}</li>)}
          </ul>
          <br />
          <span>Price: {price}</span>
      </div>
      </div>
      <button onClick={() => setDisplay('home')}>Home</button>
      <button onClick={() => setDisplay('trips')}>All Trips</button>
    </div>
  )
}

export default TripDetail;