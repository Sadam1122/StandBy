import React, { useState, useEffect } from 'react';
import './stylehome.css';
import './Dropdown.css';
import Dropdown from './Dropdown';
import { db } from '../features/firebase'; // Periksa jalur ini
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom'; // Import Link from React Router
import logo from './ATUR.png'; 
import './Risk.css';


// function IncubatorStandardization() {
//   const [sensorData, setSensorData] = useState({
//     DS18B20: { temperature: 'Data tidak tersedia' }, 
//     DHT22: { temperature: 'Data tidak tersedia', 
//     humidity: 'Data tidak tersedia' }, 
//     fan_status: 'Off' 
//   });
//   const [fanStatus, setFanStatus] = useState('On'); // Status kipas default

//   useEffect(() => {
//     const dbRef = ref(db, 'sensor_data/');
//     const handleData = (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setSensorData(data);
//         setFanStatus(data.fan_status || 'Off'); // Status kipas default jika tidak ada data
//       } else {
//         // Data default tetap ditampilkan jika data tidak terbaca
//         setSensorData({
//           DS18B20: { temperature: '5°C' }, // Data default
//           DHT22: { temperature: '5°C', humidity: 'Data tidak tersedia' }, // Data default
//           fan_status: 'Off' // Status kipas default
//         });
//         setFanStatus('Off'); // Status kipas default
//       }
//     };

//     const unsubscribe = onValue(dbRef, handleData, {
//       onlyOnce: false, // Untuk mendapatkan data secara real-time
//     });

//     return () => {
//       unsubscribe(); // Cleanup listener on unmount
//     };
//   }, []);

function IncubatorStandardization() {
  const [sensorData, setSensorData] = useState({
    DS18B20: { temperature: 'Data tidak tersedia' },
    DHT22: { temperature: 'Data  tidak tersedia', humidity: 'Data tidak tersedia' } // Set default temperature 5°C
  });
  const [fanStatus, setFanStatus] = useState('Off');
 


  useEffect(() => {
    const dbRef = ref(db, 'sensor_data/');
    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
        setFanStatus(data.fan_status || 'Data tidak tersedia');
      } else {
        setSensorData({
          DS18B20: { temperature: 'Data tidak tersedia' },
          DHT22: { temperature: 'Data tidak tersedia', humidity: 'Data tidak tersedia' },
          fan_status: 'Data tidak tersedia'
        });
        setFanStatus('Data tidak tersedia');
      }
    };

    onValue(dbRef, handleData, {
      onlyOnce: false, // Untuk mendapatkan data secara real-time
    });

  

    return () => {
      // Menambahkan pembersihan jika perlu
    };
  }, []);
  return (
    <div className="container">
      <div className="top-bar">
        <div className="icon">
          <img src={logo} alt="ATUR Logo" />
        </div>
        <div className="navigation">
          <ul>
            <li>Home</li>
            <li>About</li>
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
              {sensorData ? (
                <>
                  <div className="sensor-item" key="DS18B20">
                    <div className="sensor-icon">DS18B20</div>
                    <div className="sensor-value">{sensorData.DS18B20.temperature}°C</div>
                  </div>
                  <div className="sensor-item" key="DHT22-temp">
                    <div className="sensor-icon">DHT22 Temperature</div>
                    <div className="sensor-value">{sensorData.DHT22.temperature} °C</div>
                  </div>
                  <div className="sensor-item" key="DHT22-humid">
                    <div className="sensor-icon">DHT22 Humidity</div>
                    <div className="sensor-value">{sensorData.DHT22.humidity} %</div>
                  </div>
                </>
              ) : (
                <p>Loading data...</p>
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
    
      <div className="right-column">
    
        <div className="App">
          <Dropdown title="Ruang Lingkup, tujuan dan standar terkait" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Acuan normatif" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Istiah dan definisi" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Persyaratan umum" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Persyaratan umum untuk pengujian peralatan elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Klasifikasi peralatan elektromedik dan sistem elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Identifikasi peralatan, elektromedik, penandaan dan dokumen" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Proteksi terhadap bahaya listrik dari peralatan elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Proteksi terhadap bahaya mekanis dari peralatan elektromedik dan sistem ektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Proteksi terhadap bahaya radiasi yang tidak diinginkan dan radiasi yang berlebihan" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Proteksi terhadap temperatur yang berlebihan dan bahaya lain" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Akurasi pengontrol dan instrumen dan proteksi terhadap keluaran yang berpotensi bahaya" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Situasi yang berpotensi bahaya dan kondisi kegagalan" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Sistem elektromedik terprogram/programmable electrical medical system(PEMS)" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Konstruksi peralatan elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Sistem elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
          <Dropdown title="Kompatibilitas elektromagnetik peralatan elektromedik dan sistem elektromedik" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
        </div>
      </div>

      {/* Macam macam const kcaw */}
      <IncubatorStandardizations/>
    </div>
  );
}

const IncubatorStandardizations = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      
      <div className="print-section">
      <RiskManagementTable />
      <AdditionalTable />
      <KondisiTable />
      <KondisiTablee />
      <KondisiTableee />
      <LaranganTable />
      <BocorTable />
      <BocorsTable/>
      <UjiTable/>
      <KetahananTable/>
      <BerlebihanTable/>
      <BelitanTable/>
      <button onClick={handlePrint}>Cetak Halaman</button>
      <div className="copyright">
        <p>&copy; 2024 ATUR Baby Incubator. All rights reserved. Created By: YBBA</p>
      </div>
      </div>
      
    </div>
  );
};

const RiskManagementTable = () => {
  const tableData = [
    { clause: '3.1', title: 'Proses manajemen risiko' },
    { clause: '3.2', title: 'Tanggung jawab manajemen' },
    { clause: '3.3', title: 'Kualifikasi personil' },
    { clause: '3.4', title: 'Rencana manajemen risiko' },
    { clause: '3.5', title: 'Berkas manajemen risiko' },
    { clause: '4.1', title: 'Proses analisa risiko' },
    { clause: '4.2', title: 'Maksud penggunaan dan identifikasi karakteristik terkait dengan keamanan alat kesehatan' },
    { clause: '4.3', title: 'Identifikasi bahaya' },
    { clause: '4.4', title: 'Estimasi risiko untuk setiap yang membahayakan' },
    { clause: '5', title: 'Evaluasi risiko' },
    { clause: '6', title: 'Kendali risiko' },
    { clause: '7', title: 'Evaluasi keberterimaan seluruh residu risiko' },
    { clause: '8', title: 'Laporan manajemen risiko' }
  ];

  const [formData, setFormData] = useState(
    tableData.map(() => ({
      docRef: '',
      decision: '',
      ada: false,
      tidakAda: false,
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const handleCheckboxChange = (index, field) => {
    const newData = [...formData];
    newData[index][field] = !newData[index][field];

    // Ensure that only one checkbox is selected at a time
    if (field === 'ada') {
      newData[index]['tidakAda'] = false;
    } else if (field === 'tidakAda') {
      newData[index]['ada'] = false;
    }

    setFormData(newData);
  };
 


  
  return (
   <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>1. Tabel : Hasil manajemen risiko : Persyaratan umum manajemen risiko</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Klausul</th>
            <th rowSpan="2">Judul Klausul</th>
            <th rowSpan="2">Dok Ref FMR (Dok No./hal)</th>
            <th colSpan="2">Ada/ tidak ada dalam file manajemen risiko</th>
            <th rowSpan="2">Keputusan</th>
          </tr>
          <tr>
            <th>Ada</th>
            <th>Tidak ada</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.clause}</td>
              <td>{row.title}</td>
              <td>
                <textarea
                      value={formData[index].docRef}
                      onChange={(e) => handleInputChange(index, 'docRef', e.target.value)}
                      // placeholder="Masukkan Keputusan"
                      rows="1" // Sesuaikan jumlah baris awal
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} // Menyediakan lebar penuh dan memperbolehkan resizing vertikal
                       />
              </td>
              

              
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={formData[index].ada}
                  onChange={() => handleCheckboxChange(index, 'ada')}
                />
              </td>
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={formData[index].tidakAda}
                  onChange={() => handleCheckboxChange(index, 'tidakAda')}
                />
              </td>
              <td>
                <textarea
                      value={formData[index].decision}
                      onChange={(e) => handleInputChange(index, 'decision', e.target.value)}
                      // placeholder="Masukkan Keputusan"
                      rows="1" // Sesuaikan jumlah baris awal
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none'}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  
  
  );
};
const AdditionalTable = () => {
  const [tableData, setTableData] = useState([
    { daftar: '', referensi: '', catatan: '' },
  ]);

  const handleInputChange = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { daftar: '', referensi: '', catatan: '' }]);
  };

  const handleDeleteRow = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="right-column">
    <div className="additional-table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>2. Tabel : Kinerja Penting</h4>
      <table>
        <thead>
          <tr>
            <th>Daftar fungsi kinerja penting</th>
            <th>Referensi nomor dokumen produsen</th>
            <th>Catatan</th>
            <th>Aksi</th> 
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>
                <textarea
                      value={row.daftar}
                      onChange={(e) => handleInputChange(index, 'daftar', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.referensi}
                      onChange={(e) => handleInputChange(index, 'referensi', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.catatan}
                      onChange={(e) => handleInputChange(index, 'catatan', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)}  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}>Hapus</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Tambah Baris</button>
      <div className="info">
        <strong>Informasi tambahan:</strong> Kinerja esensial adalah kinerja yang tidak ada atau penurunannya akan menghasilkan resiko yang tidak dapat diterima.
      </div>
    </div>
  </div>
  );
};

const KondisiTable = () => {
  const [formData, setFormData] = useState(
    Array(6).fill({
      daya: '',
      arus: '',
      power: '',
    })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index] = { ...newData[index], [field]: value };
    setFormData(newData);
  };
  

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>3.1. Tabel : Input daya</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Kondisi operasi dan Daya pengenal (W,A,VA)</th>
            <th colSpan="3">Terukur</th>
            <th rowSpan="3">Hasil</th>
            <th rowSpan="3">Catatan</th>
          </tr>
          <tr>
            <th>Daya (W/VA)</th>
            <th>Arus (A)</th>
            <th>Power faktor (cos π)</th>
          </tr>
        </thead>
        <tbody>
        {formData.map((row, index) => (
            <tr key={index}>
               {index === 0 && (
                <td rowSpan={6} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
               <td>
                <textarea
                      value={row.daya}
                      onChange={(e) => handleInputChange(index, 'daya', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.arus}
                      onChange={(e) => handleInputChange(index, 'arus', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.power}
                      onChange={(e) => handleInputChange(index, 'power', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              {index === 0 && (
                <td rowSpan={6}>
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
              {index === 0 && (
                <td rowSpan={7}>
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
            </tr>
          ))}
       <tr>
            <td>Rata-rata</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.daya || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.arus || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.power || 0), 0) / formData.length).toFixed(2)}</td>
            <td>
              {formData.every(row => (!row.daya && !row.arus && !row.power) || (parseFloat(row.daya) === 0 && parseFloat(row.arus) === 0 && parseFloat(row.power) === 0))? '' : ((formData.reduce((sum, row) => sum + parseFloat(row.daya || 0) + parseFloat(row.arus || 0) + parseFloat(row.power || 0), 0) / (formData.length * 3)).toFixed(2)
            )}
            </td>
            </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};
const KondisiTablee = () => {
  const [formData, setFormData] = useState(
    Array(6).fill({
      daya: '',
      arus: '',
      power: '',
    })
  );



const handleInputChange = (index, field, value) => {
  const newData = [...formData];
  newData[index] = { ...newData[index], [field]: value };
  setFormData(newData);
};


  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>3.2. Tabel : Input daya</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Kondisi operasi dan Daya pengenal (W,A,VA)</th>
            <th colSpan="3">Terukur</th>
            <th rowSpan="3">Hasil</th>
            <th rowSpan="3">Catatan</th>
          </tr>
          <tr>
            <th>Daya (W/VA)</th>
            <th>Arus (A)</th>
            <th>Power faktor (cos π)</th>
          </tr>
        </thead>
        <tbody>
        {formData.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={6} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
         
              <td>
                <textarea
                      value={row.daya}
                      onChange={(e) => handleInputChange(index, 'daya', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.arus}
                      onChange={(e) => handleInputChange(index, 'arus', e.target.value)}
                      // placeholder="Masukkan arus"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.power}
                      onChange={(e) => handleInputChange(index, 'power', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              {index === 0 && (
                <td rowSpan={6} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
              {index === 0 && (
                <td rowSpan={7} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
            </tr>
          ))}
       <tr>
            <td>Rata-rata</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.daya || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.arus || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.power || 0), 0) / formData.length).toFixed(2)}</td>
            <td>
              {formData.every(row => (!row.daya && !row.arus && !row.power) || (parseFloat(row.daya) === 0 && parseFloat(row.arus) === 0 && parseFloat(row.power) === 0))? '' : ((formData.reduce((sum, row) => sum + parseFloat(row.daya || 0) + parseFloat(row.arus || 0) + parseFloat(row.power || 0), 0) / (formData.length * 3)).toFixed(2)
            )}
            </td>
            </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};


const KondisiTableee = () => {
  const [formData, setFormData] = useState(
    Array(6).fill({
      daya: '',
      arus: '',
      power: '',
    })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index] = { ...newData[index], [field]: value };
    setFormData(newData);
  };
  

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>3.3. Tabel : Input daya</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Kondisi operasi dan Daya pengenal (W,A,VA)</th>
            <th colSpan="3">Terukur</th>
            <th rowSpan="3">Hasil</th>
            <th rowSpan="3">Catatan</th>
          </tr>
          <tr>
            <th>Daya (W/VA)</th>
            <th>Arus (A)</th>
            <th>Power faktor (cos π)</th>
          </tr>
        </thead>
        <tbody>
        {formData.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={6} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
               <td>
                <textarea
                      value={row.daya}
                      onChange={(e) => handleInputChange(index, 'daya', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.arus}
                      onChange={(e) => handleInputChange(index, 'arus', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.power}
                      onChange={(e) => handleInputChange(index, 'power', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              {index === 0 && (
                <td rowSpan={6} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
              {index === 0 && (
                <td rowSpan={7} >
                  <textarea
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none', height: '100%' }}
                    />
                </td>
                )}
            </tr>
          ))}
       <tr>
            <td>Rata-rata</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.daya || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.arus || 0), 0) / formData.length).toFixed(2)}</td>
            <td>{(formData.reduce((sum, row) => sum + parseFloat(row.arus || 0), 0) / formData.length).toFixed(2)}</td>
            <td>
              {formData.every(row => (!row.daya && !row.arus && !row.power) || (parseFloat(row.daya) === 0 && parseFloat(row.arus) === 0 && parseFloat(row.power) === 0))? '' : ((formData.reduce((sum, row) => sum + parseFloat(row.daya || 0) + parseFloat(row.arus || 0) + parseFloat(row.power || 0), 0) / (formData.length * 3)).toFixed(2)
            )}
            </td>

      </tr>
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};


const LaranganTable = () => {
  const [formData, setFormData] = useState(
    Array(6).fill({
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      i: '',
    })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index] = { ...newData[index], [field]: value };
    setFormData(newData);
  };
  

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>4. Tabel : Larangan</h4>
      <table>
        
        <tbody>
        {formData.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={6}>
                  <input
                    type="text"
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                  />
                </td>
              )}
              <td>
                <input
                  type="text"
                  value={row.a}
                  onChange={(e) => handleInputChange(index, 'a', e.target.value)}
                  // placeholder="Masukkan Daya"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.b}
                  onChange={(e) => handleInputChange(index, 'b', e.target.value)}
                  // placeholder="Masukkan Arus"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.c}
                  onChange={(e) => handleInputChange(index, 'c', e.target.value)}
                  // placeholder="Masukkan Power"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
            </tr>
          ))}
          {formData.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={6}>
                  <input
                    type="text"
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                  />
                </td>
              )}
              <td>
                <input
                  type="text"
                  value={row.e}
                  onChange={(e) => handleInputChange(index, 'e', e.target.value)}
                  // placeholder="Masukkan Daya"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.f}
                  onChange={(e) => handleInputChange(index, 'f', e.target.value)}
                  // placeholder="Masukkan Arus"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.g}
                  onChange={(e) => handleInputChange(index, 'g', e.target.value)}
                  // placeholder="Masukkan Power"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
            </tr>
          ))}
          {formData.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={6}>
                  <input
                    type="text"
                    // placeholder="Masukkan Kondisi"
                    style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                  />
                </td>
              )}
              <td>
                <input
                  type="text"
                  value={row.h}
                  onChange={(e) => handleInputChange(index, 'h', e.target.value)}
                  // placeholder="Masukkan Daya"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.i}
                  onChange={(e) => handleInputChange(index, 'i', e.target.value)}
                  // placeholder="Masukkan Arus"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.d}
                  onChange={(e) => handleInputChange(index, 'd', e.target.value)}
                  // placeholder="Masukkan Power"
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
            </tr>
          ))}
      
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
  </div>
  );
};

const BocorTable = () => {
  const tableData = [
    { clause: 'Kebocoran pembumian', title: '5mA kondisi normal, 10mA kondisi kegagalan tunggal' },
    { clause: 'Arus sentuh', title: '100μA kondisi normal, 500μA kondisi kegagalan tunggal '},
    { clause: 'Arus bocor pasien', title: 'Tipe B atau BF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c), 100μA kondisi normal, 500μA kondisi kegagalan tunggal (a,c), Tipe CF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c atau a,c)' },
    { clause: 'Arus bocor pasien dengan tegangan luar pada bagian sinyal input/output', title: 'Tipe B atau BF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c), 100μA kondisi normal, 500μA kondisi kegagalan tunggal (a,c), Tipe CF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c atau a,c)' },
    { clause: 'Arus bocor pasien dengan tegangan luar pada bagian metal yang dapat diakses yang tidak dibumikan', title: 'Tipe B atau BF 500μA' },
    { clause: 'Arus pelengkap pasien', title: 'Tipe B atau BF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c), 100μA kondisi normal, 500μA kondisi kegagalan tunggal (a,c), Tipe CF 10μA kondisi normal, 50μA kondisi kegagalan tunggal(d,c atau a,c)' },
    { clause: 'Total arus bocor pasien dengan semua sampel dari tipe yang sama koneksi bersama', title: 'Tipe B atau BF 10μA kondisi normal, 100μA kondisi kegagalan tunggal(d,c), 500μA kondisi normal, 1000μA kondisi kegagalan tunggal (a,c), Tipe CF 50μA kondisi normal, 100μA kondisi kegagalan tunggal(d,c atau a,c)' }
  ];
  
  const [formData, setFormData] = useState(
    Array(6).fill({
      min: '',
      max: '',
    })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>5. Tabel : Arus Bocor</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Jenis arus bocor</th>
            <th colSpan="2">Kondisi pengujian 230V, 50Hz</th>
            <th rowSpan="3">Hasil</th>
          </tr>
          <tr>
            <th>1 (μA)</th>
            <th>Maks | (mA)</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.clause}</td>
              <td>
                <textarea
                      value={row.min}
                      onChange={(e) => handleInputChange(index, 'min', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>{row.title}</td>
              <td>
                <textarea
                      value={row.max}
                      onChange={(e) => handleInputChange(index, 'max', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
            </tr>
          ))}
       
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};



const BocorsTable = () => {
  const tableData = [
    { clause: 'Total arus bocor pasien dengan semua sampel dari tipe yang sama koneksi bersama dengan tegangan luar pada SIP/SOP', title: 'Tipe B atau BF 10μA kondisi normal, 100μA kondisi kegagalan tunggal(d,c), 500μA kondisi normal, 1000μA kondisi kegagalan tunggal (a,c), Tipe CF 50μA kondisi normal, 100μA kondisi kegagalan tunggal(d,c atau a,c)' },
    { clause: 'Total arus bocor pasien dengan semua sampel dari tipe yang sama koneksi bersama dengan tegangan luar pada tipe F', title: 'Tipe BF 5000μA, tipe CF 100μA'},
    { clause: 'Total arus bocor pasien dengan semua sampel dari tipe yang sama koneksi bersama dengan tegangan luar pada bagian metal yang dapat diakses yang tidak dibumikan', title: 'Tipe B & BF 1000μA' }
    ];
  
  const [formData, setFormData] = useState(
    Array(6).fill({
      min: '',
      max: '',
    })
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>6. Tabel : Arus Bocor</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="3">Jenis arus bocor</th>
            <th colSpan="2">Kondisi pengujian 230V, 50Hz</th>
            <th rowSpan="3">Hasil</th>
          </tr>
          
        </thead>
        <tbody>
        {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.clause}</td>
              <td>
                <textarea
                      value={row.min}
                      onChange={(e) => handleInputChange(index, 'min', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>{row.title}</td>
              <td>
                <textarea
                      value={row.max}
                      onChange={(e) => handleInputChange(index, 'max', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
            </tr>
          ))}
       
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};



const UjiTable = () => {
  const [formData, setFormData] = useState(
    Array(3).fill().map(() => ({
      isolasi: '',
      tipe: '',
      vpeak: '',
      vteg: '',
      uji: '',
      ada: false,
      tidakAda: false,
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

  const handleCheckboxChange = (index, field) => {
    const newData = [...formData];
    newData[index][field] = !newData[index][field];

    // Pastikan hanya satu checkbox yang dipilih pada satu waktu
    if (field === 'ada') {
      newData[index]['tidakAda'] = false;
    } else if (field === 'tidakAda') {
      newData[index]['ada'] = false;
    }

    setFormData(newData);
  };

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>7. Tabel : Uji kekuatan dielektrik</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Isolasi</th>
            <th rowSpan="2">Tipe</th>
            <th colSpan="2">Ref</th>
            <th rowSpan="2">AC</th>
            <th colSpan="2">Kerusak</th>
          </tr>
          <tr>
            <th>Ada</th>
            <th>Tidak ada</th>
            <th>Ya</th>
            <th>Tidak</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((row, index) => (
            <tr key={index}>
             <td>
                <textarea
                      value={row.isolasi}
                      onChange={(e) => handleInputChange(index, 'isolasi', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.tipe}
                      onChange={(e) => handleInputChange(index, 'tipe', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
             <td>
                <textarea
                      value={row.vpeak}
                      onChange={(e) => handleInputChange(index, 'vpeak', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.vteg}
                      onChange={(e) => handleInputChange(index, 'vteg', e.target.value)}
                      // placeholder="Masukkan daftar"
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.uji}
                      onChange={(e) => handleInputChange(index, 'uji', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={row.ada}
                  onChange={() => handleCheckboxChange(index, 'ada')}
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={row.tidakAda}
                  onChange={() => handleCheckboxChange(index, 'tidakAda')}
                  style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};



const KetahananTable = () => {
  const [formData, setFormData] = useState(
    Array(3).fill().map(() => ({
      isolasi: '',
      tipe: '',
      vpeak: '',
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };



  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>8. Tabel : Ketahanan terhadap avatar</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Isolasi</th>
            <th rowSpan="2">Tipe</th>
            <th rowSpan="2">AC</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((row, index) => (
            <tr key={index}>
               <td>
                <textarea
                      value={row.isolasi}
                      onChange={(e) => handleInputChange(index, 'isolasi', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.tipe}
                      onChange={(e) => handleInputChange(index, 'tipe', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.vpeak}
                      onChange={(e) => handleInputChange(index, 'vpeak', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};


const BerlebihanTable = () => {
  const [formData, setFormData] = useState(
    Array(3).fill().map(() => ({
      isolasi: '',
      tipe: '',
      vpeak: '',
      vteg: '',
      uji: '',
      ada: false,
      tidakAda: false,
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };

 

  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>9. Tabel : Suhu berlebih</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Lokasi termokopel</th>
            <th rowSpan="2">Max suhu yang diizinkan dari tabel </th>
            <th colSpan="2">Max suhu yang tertukar</th>
            <th rowSpan="2">Catatan</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formData.map((row, index) => (
            <tr key={index}>
               <td>
                <textarea
                      value={row.isolasi}
                      onChange={(e) => handleInputChange(index, 'isolasi', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.tipe}
                      onChange={(e) => handleInputChange(index, 'tipe', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.vpeak}
                      onChange={(e) => handleInputChange(index, 'vpeak', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.vteg}
                      onChange={(e) => handleInputChange(index, 'vteg', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.uji}
                      onChange={(e) => handleInputChange(index, 'uji', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>
    </div>
  );
};




const BelitanTable = () => {
  const [formData, setFormData] = useState(
    Array(4).fill().map(() => ({
      Suhu:'',
      L1:'',
      R1:'',
      L2:'',
      R2:'',
      T1:'',
      Tmax:'',
      Class:'',

    }))
  );

  const handleInputChange = (index, field, value) => {
    const newData = [...formData];
    newData[index][field] = value;
    setFormData(newData);
  };



  return (
    <div className="right-column">
    <div className="table-container">
    <img src={logo} alt="ATUR Logo" className="logo" />
      <span className="filename"></span>
      <h4>10. Tabel : Suhu Belitan</h4>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">Suhu T Lilitan</th>
            <th rowSpan="2">L1 (C)</th>
            <th rowSpan="2">R1 (Ω)</th>
            <th rowSpan="2">L2 (C)</th>
            <th rowSpan="2">R2 (Ω)</th>
            <th rowSpan="2">T (C)</th>
            <th rowSpan="2">T max yang diizinkan (C)</th>
            <th rowSpan="2">Class insulasi</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((row, index) => (
            <tr key={index}>
              <td>
                <textarea
                      value={row.Suhu}
                      onChange={(e) => handleInputChange(index, 'Suhu', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.L1}
                      onChange={(e) => handleInputChange(index, 'L1', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.R1}
                      onChange={(e) => handleInputChange(index, 'R1', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.L2}
                      onChange={(e) => handleInputChange(index, 'L2', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.R2}
                      onChange={(e) => handleInputChange(index, 'R2', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              <td>
                <textarea
                      value={row.T1}
                      onChange={(e) => handleInputChange(index, 'T1', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td> <td>
                <textarea
                      value={row.Tmax}
                      onChange={(e) => handleInputChange(index, 'Tmax', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td> <td>
                <textarea
                      value={row.class}
                      onChange={(e) => handleInputChange(index, 'class', e.target.value)}
                      rows="1"
                      style={{ width: '100%', resize: 'vertical', border: 'none', outline: 'none' }} />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="info">
        <strong>Informasi tambahan:</strong> Dokumen ref harus berkaitan dengan kebijakan/ prosedur dokumen dan dokumen yang berisi output perangkat tertentu.
      </div>
    </div>


    </div>
   
  );
};











export default IncubatorStandardization;

