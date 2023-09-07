import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useAuthorization } from '../../authorization/AuthorizationContext';
import { useMassages } from './MassagesContext';

const SwitchUserDialog = () => {
  const { setDisplay } = useCurrentDisplay();
  const { setMassage } = useMassages();
  const { authorizationStatus } = useAuthorization();
  if (!authorizationStatus.loggedIn) return <></>

  const close = () => {
    setDisplay('home');
    setMassage(null);
  };

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage unauthorized-massage'>
        <h3>Switch Account?</h3>
        <p>You'r already logged in as "{authorizationStatus.email}"<br/>
        Do you want to log in as another user?</p>
        <div>
          <button onClick={()=> setMassage(null)}>Switch Account</button>
          <button onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default SwitchUserDialog;