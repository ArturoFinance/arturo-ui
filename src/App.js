import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import './App.css';

const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./pages/Home/Home'));
const Exchange = lazy(() => import('./pages/Exchange'));

const App = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<Loader />}>
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/exchange' element={<Exchange />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
