import React from 'react';
import { Typography } from '@material-ui/core';
import Course from './Screens/Course/Course';
import './App.css';
function App() {
  return (
    <div className="App">
      <Typography variant="body1" gutterBottom style={{ color:'white', textAlign: "center", padding: '10px 0 10px 0', fontWeight: 500, fontSize:24 }}>We hope you are enjoing your free preview!</Typography>
      <Course />
    </div>
  );
}

export default App;