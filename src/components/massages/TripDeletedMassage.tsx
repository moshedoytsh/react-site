import '../../styles.css'
import { useMassages } from './MassagesContext';

const TripDeletedMassage = () => {
  const { setMassage } = useMassages()

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage success-massage'>
        <h3>Trip Deleted</h3>
        <p>The trip successfully deleted.</p>
        <div>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default TripDeletedMassage;