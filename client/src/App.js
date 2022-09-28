import { useEffect, useState } from 'react';
import { disconnectSocket, initiateSocketConnection, fetchInitialData, onMessageHandler, onMessagesHandler } from './helpers/sockets';
import './App.css';

const calculateAlertColor = (alert) => {
  if (alert === 'On Floor') return 'critical';

  if (alert === 'High Risk') return 'warning';

  return 'default';
};

const App = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    initiateSocketConnection();

    fetchInitialData();

    onMessagesHandler(setMessages);

    onMessageHandler(setMessages);

    return () => {
      disconnectSocket();
    }
  }, []);

  return (
    <div className='wrapper'>
      <div className='header'>
        <h1>Alpha Ward Overview</h1>
      </div>
      <div className='alert-wrapper'>
        ALERTS({messages.filter(message => message.alert).length})
        <div className='alerts'>
          {messages.filter(message => message.alert).map(({ _id, room, alert, alertTime }) =>
            <div key={_id} className={` alert ${calculateAlertColor(alert)}`}>
              <p>
                {`
                ${room}
                ${alert}  
                ${alertTime}
              `}
              </p>
            </div>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Room</th>
            <th>Alert</th>
            <th>Alert Time</th>
            <th>Zone</th>
            <th>Muted</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(({ _id, room, alert, alertTime, zone, muted }) =>
            <tr key={_id} className={calculateAlertColor(alert)}>
              <td>{room}</td>
              <td>{alert}</td>
              <td>{alertTime}</td>
              <td>{zone}</td>
              <td>{muted}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
