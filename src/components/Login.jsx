import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { FaLock, FaUserAlt } from 'react-icons/fa'; 

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
    <section style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "darkred",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div style={{ textAlign: 'center' }}>   
          <img src={require('./ATUR (2) 1.png')} alt="ATUR Logo" style={{ maxWidth: '50vw', maxHeight: '40vh' }} />
          <h1 style={{ fontSize: '5vh', fontWeight: 'bold' }}>SELAMAT DATANG DI ATUR</h1>
          <p style={{ fontSize: '4vh' }}>Artificial Intelligence Task Automation and Regulation</p>
          <p style={{ fontSize: '3vh' }}>Mendata hasil inkubator serta uji kelayakan sesuai standarisasi</p>
          <img src={require('./koran.png')} alt="koran" style={{ maxWidth: '50vw', maxHeight: '50vh' }} />
        </div>
      </div>
      
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-8">
                <form onSubmit={Auth} className="container">
                  {isError && <p className="has-text-centered" style={{ color: 'red', marginBottom: '1rem' }}>{message}</p>}
                  <h2 style={{ marginBottom: '0.5rem', fontSize: '3rem', textAlign: 'center', fontWeight: 'bold', marginRight: '1rem' }}>Masuk</h2>
                  <div className='mb-3'>
                    <label htmlFor='email' style={{ fontSize: '2rem', fontWeight: 'bold' }}><strong>Email</strong></label>
                    <div className="input-group" style={{ flex: 1 }}>
                      <span className="input-group-text" style={{ marginRight: '0.5vh', fontSize: '2rem' }}><FaUserAlt /></span>
                      <input
                        type='email'
                        placeholder='Masukan Email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='form-control rounded-0'
                        style={{ fontSize: '2rem' }}
                      />
                    </div>
                  </div>
                  <div className='mb-3' style={{ width: '100%' }}>
                    <label htmlFor='password' style={{ fontSize: '2rem', fontWeight: 'bold' }}>Password</label>
                    <div className="input-group" style={{ flex: 1 }}>
                      <span className="input-group-text" style={{ marginRight: '0.5vh', fontSize: '2rem'  }}><FaLock /></span>
                      <input
                        type='password'
                        placeholder='Masukan kata Sandi'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control rounded-0'
                        style={{ fontSize: '2rem' }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                    style={{ fontSize: '1vw', marginTop: '1vh' }}
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