import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useMassages } from './MassagesContext';

const ServerErrorMassage = () => {
  const { setDisplay } = useCurrentDisplay();
  const { setMassage } = useMassages();

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage unauthorized-massage'>
        <h3>Server Error</h3>
        <p>The server response with error. Please contact the services manager</p>
        <div>
          <button onClick={close}>Close</button>
          <button onClick={() => {
            close();
            setDisplay('home');
          }}>Home</button>
        </div>
      </div>
    </div>
  )
}

export default ServerErrorMassage;