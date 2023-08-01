import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Comapny from './Component/Company';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Comapny></Comapny>}></Route>
    </Routes>
    
    </BrowserRouter>
    <ToastContainer className="toast-position"
        position="top-right"></ToastContainer>
    </Provider>
  );
}

export default App;
