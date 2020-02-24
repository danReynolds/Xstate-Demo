import React, { useCallback, useState } from 'react';
import { useMachine } from '@xstate/react';
import logo from './logo.svg';
import './App.css';
import DevHouseGuestManager from './machines/DevHouseGuestManager';

const DevHouseGuest = ({ name, state, onDemo }) => {
  return (
    <div>
      <span>{`${name}: ${state}`}</span>
      <button onClick={onDemo}>Demo</button>
    </div>
  )
}

const DevHouse = () => {
  const [current, send] = useMachine(DevHouseGuestManager);

  const [newGuestName, setNewGuestName] = useState(null);

  const handleChange = useCallback(event => setNewGuestName(event.target.value));
  const handleSubmit = useCallback(() => send('GUEST_ARRIVAL', { name: newGuestName }));

  const { guests, presenter } = current.context;

  return (
    <div>
      <h1>Welcome to Dev House!</h1>
      <p>{`Active state: ${current.value}, presenter: ${presenter}`}</p>
        <label>
          New Guest Name:
          <input type="text" value={newGuestName} onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      <ul>
        {
          Object.values(guests).map(guest => {
            const { value, context: { name } } = guest.state;
            return (
              <li>
                <DevHouseGuest name={name} state={value} onDemo={() => send('DEMO', { name })} />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <DevHouse />
    </div>
  );
}

export default App;
