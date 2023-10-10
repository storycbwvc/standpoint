import React, { useState, useEffect } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './components/Dashboard';

function App() {
  
  const [detected, setDetected] = useState([]);

  return (
    <div style={{ height: "100vh" }} >
      <Dashboard></Dashboard>

    </div>
  );
}

export default App;
