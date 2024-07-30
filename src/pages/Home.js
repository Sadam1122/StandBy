import React, { useState, useEffect } from 'react';
import './stylehome.css';
import { db } from "../features/firebase";
import { ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom'; // Import Link from React Router

function IncubatorStandardization() {
  const [sensorData, setSensorData] = useState(null);
  const [fanStatus, setFanStatus] = useState('');

  useEffect(() => {
    const dbRef = ref(db, 'sensor_data/');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
        // Set fan status based on data from Firebase
        if (data.fan_status) {
          setFanStatus(data.fan_status);
        }
      } else {
        // Handle case when sensor data is not available
        setSensorData({
          DS18B20: { temperature: 'Data tidak tersedia' },
          DHT22: { temperature: 'Data tidak tersedia', humidity: 'Data tidak tersedia' },
          fan_status: 'Data tidak tersedia'
        });
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <div className="icon">
        <img src={require('./ATUR.png')} alt="ATUR Logo" />
        </div>
        <div className="navigation">
          <ul>
            <li>Home</li>
            <li>About</li>
            {/* Ganti <li>Dashboard</li> dengan Link ke halaman dashboard */}
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </div>

      <div className="content">
        <div className="left-column">
          <h1>ATUR Incubator Baby Monitoring</h1>
          <div className="sensor-section">
            <h2>Data Sensor</h2>
            <div className="sensor-grid">
              {sensorData && (
                <>
                  <div className="sensor-item">
                    <div className="sensor-icon">DS18B20</div>
                    <div className="sensor-value">{sensorData.DS18B20.temperature}</div>
                  </div>
                  <div className="sensor-item">
                    <div className="sensor-icon">DHT22 Temperature</div>
                    <div className="sensor-value">{sensorData.DHT22.temperature} °C</div>
                  </div>
                  <div className="sensor-item">
                    <div className="sensor-icon">DHT22 Humidity</div>
                    <div className="sensor-value">{sensorData.DHT22.humidity} %</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="right-column">
          <div className="fan-status">
            <h2>Fan Status</h2>
            <div className={`fan-indicator ${fanStatus.toLowerCase()}`}>{fanStatus}</div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="copyright">
        <p>&copy; 2024 ATUR Baby Incubator. All rights reserved. Created By: DAM</p>
      </div>
    </div>
  );
}

export default IncubatorStandardization;
