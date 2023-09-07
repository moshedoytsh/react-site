import { FormEvent, useEffect, useState } from "react";
import { useCurrentDisplay } from "../routes/CurrentDisplayContext";
import { useAuthorization } from "./AuthorizationContext";
import { useMassages } from "../components/massages/MassagesContext";

const emptyUser = {
  email: '',
  password: ''
}

const UserLogin = () => {
  const { setDisplay } = useCurrentDisplay();
  const [user, setUser] = useState(emptyUser);
  const { authorizationStatus, setAuthorization } = useAuthorization();
  const { setMassage } = useMassages();

  useEffect(() => {
    if (authorizationStatus.loggedIn) {
      setMassage('switch-user-dialog');
    }
  }, []);

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authorizationStatus.loggedIn &&
      authorizationStatus.email === user.email) return setMassage('already-logged-in');
    
    fetch('http://127.0.0.1:3000/api/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => (res.status === 200) ? res : Promise.reject( new Error("server error")))
    .then(res => res.json())
    .then(res => {
      setAuthorization({
        key: res.responseObj.token,
        email: res.responseObj.user.email
        ,loggedIn: true 
      });
    })
    .then(() => setMassage('logged-in'))
    .catch(() => setMassage('server-error'));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>
          Email:
          <input
          type="email"
          value={user.email}
          required
          onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </label>
        <label>
          Password:
          <input
          type="password"
          value={user.password}
          required
          onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setDisplay('home')}>Home</button>
    </div>
  )
}

export default UserLogin;
