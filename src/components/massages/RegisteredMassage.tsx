import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useMassages } from './MassagesContext';

const RegisteredMassage = () => {
  const { setMassage } = useMassages()
  const { setDisplay } = useCurrentDisplay();

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage success-massage'>
        <h3>Success</h3>
        <p>The user successfully added.</p>
        <div>
          <button onClick={() => {
            close();
            setDisplay('user-login');
          }}>Home</button>
          <button onClick={() => {
            close();
            setDisplay('trips');
          }}>Login</button>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default RegisteredMassage;