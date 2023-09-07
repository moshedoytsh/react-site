import AlreadyLoggedIn from "./AlreadyLoggedIn";
import LoggedInMassage from "./LoggedInMassage";
import { useMassages } from "./MassagesContext";
import RegisteredMassage from "./RegisteredMassage";
import ServerErrorMassage from "./ServerErrorMassage";
import SwitchUserDialog from "./SwitchUserDialog";
import TripDeletedMassage from "./TripDeletedMassage";
import TripUpdatedMassage from "./TripUpdatedMassage";
import UnauthorizedMassage from "./UnauthorizedMassage";

const Massages = () => {
  const { massage } = useMassages()

  return (
    <>
    {massage === 'unauthorized' && <UnauthorizedMassage/>}
    {massage === 'trip-deleted' && <TripDeletedMassage/>}
    {massage === 'trip-updated' && <TripUpdatedMassage/>}
    {massage === 'logged-in' && <LoggedInMassage/>}
    {massage === 'registered' && <RegisteredMassage/>}
    {massage === 'server-error' && <ServerErrorMassage/>}
    {massage === 'switch-user-dialog' && <SwitchUserDialog/>}
    {massage === 'already-logged-in' && <AlreadyLoggedIn/>}
    </>
  )
}

export default Massages;