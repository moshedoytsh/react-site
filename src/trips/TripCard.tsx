import '../styles.css'
import { useAuthorization } from '../authorization/AuthorizationContext';
import { useCurrentDisplay } from '../routes/CurrentDisplayContext'
import { useMassages } from '../components/massages/MassagesContext';
import { useTrips } from './providers/TripsContext';

interface TripCardProps {
  id: string,
  name: string,
  destination: string,
  startDate: string,
  endDate: string,
  image: string,
  setTrip: (id: string) => void;
  setEditTrip: (id: string) => void;
}

const TripCard = ({ id, name, destination, startDate, endDate, image, setTrip, setEditTrip }: TripCardProps) => {
  const { setDisplay } = useCurrentDisplay();
  const { authorizationStatus } = useAuthorization()
  const { reloadTrips } = useTrips();
  const { setMassage } = useMassages();

  const viewTrip = (id: string) => {
    setTrip(id);
    setDisplay('trip-detail');
  }

  const deleteTrip = (id: string) => {
    if (!authorizationStatus.loggedIn) return setMassage('unauthorized');
    fetch(`http://127.0.0.1:3000/api/trips/${id}`,
    {
      method: 'DELETE',
      headers: {
        authorization: authorizationStatus.key,
      }
    })
    .then(res => res.status === 200 ? res : Promise.reject( new Error("server error")))
    .then(res => res.json())
    .then(() => setMassage('trip-deleted'))
    .then(reloadTrips)
    .catch(() => setMassage('server-error'));
  }

  return (
    <div className='trip-card' onClick={() => viewTrip(id)}>
      <div className='trip-card-properties'>
        <img src={image} alt="trip image" className='trip-image'/>
        <hr className='trip-card-hr'/>
        <div className='trip-description'>
        <h3>{name}</h3>
        <p>
        <span>Destination: {destination}</span>
        <br />
        <span>Start Date: {startDate}</span>
        <br />
        <span>End Date: {endDate}</span>
        </p>
        </div>
      </div>
      <div className='trip-card-buttons'>
        <button onClick={(e) => {
          e.stopPropagation();
          deleteTrip(id);
        }}>Delete Trip</button>
        <button onClick={(e) => {
          e.stopPropagation();
          if (!authorizationStatus.loggedIn) return setMassage('unauthorized');
          setEditTrip(id);
          setDisplay('update-trip-form');
        }}>Edit Trip</button>
      </div>
    </div>
  )
}

export default TripCard;