import { auth, createUser, signIn } from "fbase";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create newAccount
        data = await createUser(auth, email, password);
      } else {
        // log in
        data = await signIn(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name="email"
          type="email" 
          placeholder="Email" 
          required 
          value={email}
          onChange={onChange}
        />
        <input 
          name="password"
          type="password" 
          placeholder="Password" 
          required 
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sing In" : "Creat Account"}
      </span>
    </div>
  );
}

export default Auth;