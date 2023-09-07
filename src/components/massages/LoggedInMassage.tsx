import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useAuthorization } from '../../authorization/AuthorizationContext';
import { useMassages } from './MassagesContext';

const LoggedInMassage = () => {
  const { setMassage } = useMassages();
  const { setDisplay } = useCurrentDisplay();
  const { authorizationStatus } = useAuthorization();
  if (!authorizationStatus.loggedIn) return <></>
  const close = () => {
    setMassage(null);
    setDisplay('home');
  }

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage success-massage'>
        <h3>Success</h3>
        <p>You'r now logged in as "{authorizationStatus.email}"</p>
        <div>
          <button onClick={() => {
            setMassage(null);
            setDisplay('trips');
          }}>All Trips</button>
          <button onClick={close}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default LoggedInMassage;