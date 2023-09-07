import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
  useEffect,
  useRef,
} from "react";

type AuthorizationStatusType = {
  loggedIn: false,
} | {
  loggedIn: true,
  key: string
  email: string
}

type ContextValue = {
  authorizationStatus: AuthorizationStatusType;
  setAuthorization: Dispatch<SetStateAction<AuthorizationStatusType>>;
};

const AuthorizationContext = createContext<null | ContextValue>(null);
const { Provider } = AuthorizationContext;

type AuthorizationProviderProps = {
  children: ReactNode;
};

export const AuthorizationProvider: FC<AuthorizationProviderProps> = ({ children }) => {
  
  const [authorizationStatus, setAuthorization] = useState<AuthorizationStatusType>({ loggedIn: false });

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { loggedIn, key, email } = JSON.parse(auth);
      setAuthorization({loggedIn, key, email});
    }
  }, []);

  const firstTimeRef = useRef(true);
  useEffect(() => {
    if (firstTimeRef.current) {
      firstTimeRef.current = false;
      return;
    }
    localStorage.setItem('auth', JSON.stringify(authorizationStatus));
  }, [authorizationStatus]);

  return <Provider value={{ authorizationStatus, setAuthorization }}>{children}</Provider>;
};

export const useAuthorization = () => {
  const context = useContext(AuthorizationContext);
  if (!context) throw new Error("useAuthorization must be used within a AuthorizationProvider");
  return context;
};

export default AuthorizationProvider;
