import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useAuthorization } from '../../authorization/AuthorizationContext';
import { useMassages } from './MassagesContext';

const AlreadyLoggedIn = () => {
  const { setDisplay } = useCurrentDisplay();
  const { setMassage } = useMassages();
  const { authorizationStatus } = useAuthorization();
  if (!authorizationStatus.loggedIn) return <></>

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage unauthorized-massage'>
        <h3>Already Logged In</h3>
        <p>You'r already logged in as "{authorizationStatus.email}"</p>
        <div>
          <button onClick={close}>Close</button>
          <button onClick={() => {
            setDisplay('home');
            setMassage(null);
          }}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default AlreadyLoggedIn;