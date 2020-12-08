import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import Form from './features/form/Form';
import Map from './features/map/Map';
import {
  selectGeometry,
  selectLoading,
} from './features/form/formSlice';
import Loader from './components/Loader';

function App() {
  const geometry = useSelector(selectGeometry);
  const loading = useSelector(selectLoading);
  if (loading) {
    return (
      <div style={{ maxWidth: '360px', margin: 'auto' }}>
        <Loader />
      </div>
    );
  }
  return (
    <div className="App">
      <Form />
      {geometry && geometry.length > 0 && <Map geometry={geometry} />}
    </div>
  );
}

export default App;
