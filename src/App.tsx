import { useState } from 'react';
import { useCurrentDisplay } from './routes/CurrentDisplayContext'
import Home from './pages/Home'
import NewTripForm from './trips/NewTripForm';
import PageNotFound from './pages/PageNotFound';
import TripDetail from './trips/TripDetail';
import Trips from './trips/Trips';
import TripsProvider from './trips/providers/TripsContext';
import UpdateTripForm from './trips/UpdateTripForm';
import UserLogin from './authorization/UserLogin';
import UserRegistration from './authorization/UserRegistration';
import AuthorizationProvider from './authorization/AuthorizationContext';
import MassagesProvider from './components/massages/MassagesContext';
import Massages from './components/massages/Massages';
import Header from './layout/Header';
import Footer from './layout/Footer';

function App() {
  const { display } = useCurrentDisplay();
  const [currentlyShownTrip, setCurrentlyShownTrip] = useState('');
  const [currentlyEditedTrip, setCurrentlyEditedTrip] = useState('');
  return (
    <>
    <AuthorizationProvider>
    <TripsProvider>
    <MassagesProvider>
      <Header/>
      <main>
      {display === "home" && <Home/>}
      {display === "trips" && <Trips setTrip={setCurrentlyShownTrip} setEditTrip={setCurrentlyEditedTrip}/>}
      {display === "user-login" && <UserLogin/>}
      {display === "user-registration" && <UserRegistration/>}
      {display === "trip-detail" && <TripDetail id={currentlyShownTrip}/>}
      {display === "update-trip-form" && <UpdateTripForm id={currentlyEditedTrip}/>}
      {display === "new-trip-form" && <NewTripForm/>}
      {display === null && <PageNotFound/>}
      </main>
      
      <Massages/>
      <Footer/>
    </MassagesProvider>
    </TripsProvider>
    </AuthorizationProvider>
    </>
  )
}

export default App
