import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
} from "react";

type displayType = "home" | "new-trip-form" | "trip-detail" | "trips"
  | "update-trip-form" | "user-login" | "user-registration" | null;

type ContextValue = {
  display: displayType;
  setDisplay: Dispatch<SetStateAction<displayType>>;
};

const CurrentDisplayContext = createContext<null | ContextValue>(null);
const { Provider } = CurrentDisplayContext;

type CurrentDisplayProviderProps = {
  children: ReactNode;
};

export const CurrentDisplayProvider: FC<CurrentDisplayProviderProps> = ({ children }) => {
  const [display, setDisplay] = useState<displayType>('home');

  return <Provider value={{ display, setDisplay }}>{children}</Provider>;
};

export const useCurrentDisplay = () => {
  const context = useContext(CurrentDisplayContext);
  if (!context) throw new Error("useCurrentDisplay must be used within a CurrentDisplayProvider");
  return context;
};

export default CurrentDisplayProvider;
