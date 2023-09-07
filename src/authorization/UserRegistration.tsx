import { FormEvent, useState } from "react";
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
  const { authorizationStatus } = useAuthorization();
  const { setMassage } = useMassages();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!authorizationStatus.loggedIn) return setMassage('unauthorized');

    fetch('http://127.0.0.1:3000/api/auth/register',
    {
      method: 'POST',
      headers: {
        authorization: authorizationStatus.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.status === 201 ? res : Promise.reject( new Error("server error")))
    .then(res => res.json())
    .then(() => setMassage('registered'))
    .catch(() => setMassage('server-error'));
  };

  return (
    <div>
      <h1>Register New Manager</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </label>
        <label>
          New Password:
          <input
          type="password"
          value={user.password}
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
