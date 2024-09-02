import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { FaLock, FaUserAlt } from 'react-icons/fa'; 
import logo from '../gambar/standby.png'; 
import koran from '../gambar/koran.png';
import '../Style/Risk.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/home");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="section-container">
      <div className="left-div">
        <div className="left-div-content">   
          <img src={logo} alt="StandBy Logo" />
          <h1>Selamat Datang Di StandBy</h1>
          <p>Artificial Intelligence Task Automation and Regulation</p>
          <p>Mendata hasil inkubator serta uji kelayakan sesuai standarisasi</p>
          <img src={koran} alt="koran" />
        </div>
      </div>
      
      <div className="right-div">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8">
                <form onSubmit={Auth} className="container">
                  {isError && <p className="error-message">{message}</p>}
                  <h2 className="form-heading">Masuk</h2>
                  <div className='mb-3'>
                    <label htmlFor='email'>Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaUserAlt /></span>
                      <input
                        type='email'
                        placeholder='Masukan Email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control rounded-0'
                      />
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password'>Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input
                        type='password'
                        placeholder='Masukan kata Sandi'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control rounded-0'
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="button is-success is-fullwidth submit-button"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;