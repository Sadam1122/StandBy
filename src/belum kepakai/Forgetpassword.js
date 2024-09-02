import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './ForgetpasswordValidation';
import axios from 'axios';
import { MdEmail } from "react-icons/md";

function Forgetpassword() {
    const [values, setValues] = useState({
        email: '',
    });
    const navigate = useNavigate(); // Mendeklarasikan variabel navigate
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        
        if (!validationErrors.email) {
            axios.post('http://localhost:8081/forgetpassword', { email: values.email })
                .then(res => {
                    console.log(res.data); 
                    navigate('/success'); 
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="left-pane" style={{ backgroundColor: 'darkred', flex: '1', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={require('./ATUR (2) 1.png')} alt="ATUR Logo" style={{ maxWidth: '30vw', maxHeight: '30vh' }} />
                <h1 style={{ color: 'white', textAlign: 'center', fontSize: '3vw' }}>SELAMAT DATANG DI ATUR</h1>
                <p style={{ color: 'white', textAlign: 'center', fontSize: '2vw' }}>Artificial Intelligence Task Automation and Regulation</p>
                <p style={{ color: 'white', textAlign: 'center', fontSize: '1.5vw' }}>mendata hasil inkubator serta  uji kelayakan sesuai standarisasi</p>
                <img src={require('./koran.png')} alt="koran" style={{ maxWidth: '40vw', maxHeight: '40vh' }} />
            </div>
            <div className="right-pane" style={{ backgroundColor: 'white', flex: '1' }}>
                <div className='bg-white p-3 rounded w-100'>
                    <form onSubmit={handleSubmit}>
                        <h2>Lupa Kata Sandi</h2>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text"><MdEmail /></span>
                                <input type='text' placeholder='Masukan Email' name='email'
                                    onChange={handleInput} className='form-control rounded-0' />
                            </div>
                            {errors.email && <span className='text-danger'> {errors.email}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Atur Ulang Kata Sandi</strong></button>
                        <p>Ingat kata sandi Anda?</p>
                        <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Masuk</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgetpassword;
