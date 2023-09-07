import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
} from "react";

type Massages = 'unauthorized' | 'success' | 'trip-deleted' | 'trip-updated'
                | 'logged-in' | 'registered' | 'server-error'
                | 'switch-user-dialog' | 'already-logged-in' | null

type ContextValue = {
  massage: Massages;
  setMassage: Dispatch<SetStateAction<Massages>>;
};

const MassagesContext = createContext<null | ContextValue>(null);
const { Provider } = MassagesContext;

type MassagesProviderProps = {
  children: ReactNode;
};

export const MassagesProvider: FC<MassagesProviderProps> = ({ children }) => {
  const [massage, setMassage] = useState<Massages>(null);

  return <Provider value={{ massage, setMassage }}>{children}</Provider>;
};

export const useMassages = () => {
  const context = useContext(MassagesContext);
  if (!context) throw new Error("useMassages must be used within a MassagesProvider");
  return context;
};

export default MassagesProvider;
