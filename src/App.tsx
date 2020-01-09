import React from 'react';
import './App.css';
import { Robot } from './robot';
import RoboContainer from './component/RoboContainer';

const robo = new Robot();

const App: React.FC = () => {
  const robo = new Robot();
  return (
    <div className="App" >
       <RoboContainer robo={robo} />
    </div>
  );
}

export default App;
