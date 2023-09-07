import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
  useEffect,
} from "react";
import { getAllTrips } from "../services/tripsAPIServis";

interface TripInterface {
  id: string,
  name: string,
  destination: string,
  startDate: string,
  endDate: string,
  image: string
}

type TripsType = TripInterface[];

type ContextValue = {
  trips: TripsType | null;
  setTrips: Dispatch<SetStateAction<TripsType | null>>;
  reloadTrips: () => void;
};

const TripsContext = createContext<null | ContextValue>(null);
const { Provider } = TripsContext;

type TripsProviderProps = {
  children: ReactNode;
};

export const TripsProvider: FC<TripsProviderProps> = ({ children }) => {
  
  const [trips, setTrips] = useState<TripsType | null>(null);

  const [flipFlop, setFlipFlop] = useState(false);

  const reloadTrips = () => setFlipFlop(prev => !prev);
  
  useEffect(() => {
    getAllTrips()
    .then(trips => setTrips(trips))
    .catch((err) => alert(err))
    // .catch(err => console.error(err));
  }, [flipFlop]);

  return <Provider value={{ trips, setTrips, reloadTrips }}>{children}</Provider>;
};

export const useTrips = () => {
  const context = useContext(TripsContext);
  if (!context) throw new Error("useTrips must be used within a TripsProvider");
  return context;
};

export default TripsProvider;
