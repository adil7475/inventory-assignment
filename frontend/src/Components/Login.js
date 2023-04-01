import React, {useState} from "react";
import axios from "axios";
import Auth from "../Services/Auth"
import { useNavigate } from "react-router-dom";
import config from "../config";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          `${config.API_BASE_URL}/login`,
          {'email': email, 'password': password}
      )
      Auth.setToken(response.data.data.access_token)

      const userResponse = await axios.get(
          `${config.API_BASE_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${Auth.getToken()}`
            }
          }
      )
      Auth.setUser(userResponse.data.data)

      navigate('/products')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="login login-dark">
      <form onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="form-group mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
