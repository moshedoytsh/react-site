import { useAuthorization } from "../authorization/AuthorizationContext";
import { useCurrentDisplay } from "../routes/CurrentDisplayContext";
import { useMassages } from "../components/massages/MassagesContext";

const Home = () => {
  const { setDisplay } = useCurrentDisplay();
  const { authorizationStatus } = useAuthorization();
  const { setMassage } = useMassages()


  return (
    <div className="home-page">
      <h1 className="home-headline">Manage Trips data</h1>
      <div className="main-menu">
      <button onClick={() => setDisplay('trips')}>All Trips</button>
      <button onClick={() => {
        if (!authorizationStatus.loggedIn) return setMassage('unauthorized');
        setDisplay('user-registration')
      }}>Register</button>
      <button onClick={() => setDisplay('user-login')}>Login</button>
      </div>
    </div>
  )
}

export default Home;