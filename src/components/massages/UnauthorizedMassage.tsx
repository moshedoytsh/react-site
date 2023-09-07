import '../../styles.css'
import { useCurrentDisplay } from '../../routes/CurrentDisplayContext';
import { useMassages } from './MassagesContext';

const UnauthorizedMassage = () => {
  const { setDisplay } = useCurrentDisplay();
  const { setMassage } = useMassages()

  const close = () => setMassage(null);

  return (
    <div className='popup' onClick={(ev) => {
      if (ev.target === ev.currentTarget) close();
    }}>
      <div className='massage unauthorized-massage'>
        <h3>Log In First</h3>
        <p>You must be logged in for this operation.</p>
        <div>
          <button onClick={close}>Cancel</button>
          <button onClick={() => {
            setDisplay('user-login')
            setMassage(null)
          }}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedMassage;