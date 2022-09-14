import { useEffect } from 'react';
import { disconnectSocket, initiateSocketConnection, onMessageHandler } from './helpers/sockets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {

  useEffect(() => {

    initiateSocketConnection();

    onMessageHandler();

    return () => {
      disconnectSocket();
    }
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </div>
  );
}

export default App;
