import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">

      <div className="fadeout-shield"></div>

      <header>
        <Header />
      </header>


      <main className='content'>
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
