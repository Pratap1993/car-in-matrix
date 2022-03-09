import React from 'react';
import './App.css';
import { Car } from './car';
import CarContainer from './component/CarContainer';

const car = new Car();

const App: React.FC = () => {
  const car = new Car();
  return (
    <div className="App" >
       <CarContainer car={car} />
    </div>
  );
}

export default App;
