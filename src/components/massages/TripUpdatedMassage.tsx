import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useMassages } from './MassagesContext';

const TripUpdatedMassage = () => {
  const { setMassage } = useMassages()
  const { setDisplay } = useCurrentDisplay();

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage success-massage'>
        <h3>Trip Updated</h3>
        <p>The trip successfully updated.</p>
        <div>
          <button onClick={() => {
            close();
            setDisplay('trips');
          }}>All Trips</button>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default TripUpdatedMassage;