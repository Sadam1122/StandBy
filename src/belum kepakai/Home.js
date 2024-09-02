import React, { useState } from 'react';
import './IncubatorStandardization.css';
import { FaCloudUploadAlt, FaThermometer, FaTemperatureHigh, FaHeartbeat, FaUserPlus, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Import icon components

function IncubatorStandardization() {
  const [image, setImage] = useState(null);
  const [sensorValues, setSensorValues] = useState({
    oksigen: '',
    skinTemperature: '',
    airTemperature: '',
    heartRate: ''
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleProcessImage = () => {
    // Proses gambar setelah diunggah
    console.log('Proses gambar...');
  };

  const handleSensorChange = (e, sensor) => {
    const { value } = e.target;
    setSensorValues(prevState => ({
      ...prevState,
      [sensor]: value
    }));
  };

  return (
    <div className="container">
      <div className="top-bar">
        <div className="left-icons">
          {/* Tombol Logout */}
          <button className="icon-button">
            <FaSignOutAlt />
          </button>
          {/* Tombol Tambah Pengguna */}
          <button className="icon-button">
            <FaUserPlus />
          </button>
          {/* Tombol Pengaturan */}
          <button className="icon-button">
            <FaCog />
          </button>
          {/* Tombol Profil */}
          <button className="icon-button">
            <FaUserCircle />
          </button>
        </div>
      </div>

      <h1>Incubator Standardization</h1>

      <div className="input-section">
        <div className="input-label">Masukkan informasi atau isi pertanyaan yang ada dengan benar</div>
        <div className="input-label">Pastikan tidak ada kesalahan dalam tahap memasukkan informasi</div>
      </div>

      <div className="sensor-section">
        <h2>Masukkan Nilai Dari Sensor di Bawah</h2>
        <div className="sensor-grid">
          {/* Daftar sensor */}
          <div className="sensor-item">
            <FaThermometer className="sensor-icon-left" />
            <input
              type="number"
              value={sensorValues.oksigen}
              onChange={(e) => handleSensorChange(e, 'oksigen')}
              placeholder="Oksigen"
            />
            <span className="sensor-unit">%</span>
          </div>
          <div className="sensor-item">
            <FaTemperatureHigh className="sensor-icon-left" />
            <input
              type="number"
              value={sensorValues.skinTemperature}
              onChange={(e) => handleSensorChange(e, 'skinTemperature')}
              placeholder="Skin Temperature"
            />
            <span className="sensor-unit">°C</span>
          </div>
          <div className="sensor-item">
            <FaTemperatureHigh className="sensor-icon-left" />
            <input
              type="number"
              value={sensorValues.airTemperature}
              onChange={(e) => handleSensorChange(e, 'airTemperature')}
              placeholder="Air Temperature"
            />
            <span className="sensor-unit">°C</span>
          </div>
          <div className="sensor-item">
            <FaHeartbeat className="sensor-icon-left" />
            <input
              type="number"
              value={sensorValues.heartRate}
              onChange={(e) => handleSensorChange(e, 'heartRate')}
              placeholder="Heart Rate"
            />
            <span className="sensor-unit">Bpm</span>
          </div>
        </div>
        <button className="reset-button">Reset</button>
      </div>

      <div className="image-section">
        <div className="drag-drop-container">
          <div className="drag-drop-box" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="upload-icon">
              <FaCloudUploadAlt />
            </div>
            {!image && <div className="drop-area">Drag & Drop gambar di sini</div>}
          </div>
          {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
        </div>
        <button className="process-button" onClick={handleProcessImage}>Proses Gambar</button>
        <div className="sensor-item">Hasil gambar sudah lolos uji verifikasi komponen</div>
      </div>

      <div className="question-section">
        <h2>Apakah tipe Inkubator yang anda ingin buat?</h2>
        {/* Opsi tipe inkubator */}
      </div>

      <div className="component-section">
        <h2>Masukkan komponen alat inkubator bayi!</h2>
        {/* Daftar komponen */}
      </div>

      <div className="description-section">
        <h2>Masukkan deskripsi alat!</h2>
        {/* Deskripsi alat dan opsi sensor */}
      </div>
    </div>
  );
}

export default IncubatorStandardization;