import { useEffect, useState } from 'react';
import { disconnectSocket, initiateSocketConnection, onMessageHandler } from './helpers/sockets';
import './App.css';

const calculateAlertColor = (alert) => {
  if (alert === 'On Floor') return 'critical';

  if (alert === 'High Risk') return 'warning';

  return 'default';
};

const App = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://localhost:8080/messages');

      const messages = await response.json();

      setMessages(messages);
    };

    fetchMessages();
  }, []);

  useEffect(() => {

    initiateSocketConnection();

    onMessageHandler(setMessages);

    return () => {
      disconnectSocket();
    }
  }, []);

  return (
    <div class='wrapper'>
      <div class='header'>
        <h1>Alpha Ward Overview</h1>
      </div>
      <div class='alert-wrapper'>
        ALERTS({messages.filter(message => message.alert).length})
        <div class='alerts'>
          {messages.filter(message => message.alert).map(({ room, alert, alertTime }) =>
            <div class={` alert ${calculateAlertColor(alert)}`}>
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
          {messages.map(({ room, alert, alertTime, zone, muted }) =>
            <tr key={room} class={calculateAlertColor(alert)}>
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
