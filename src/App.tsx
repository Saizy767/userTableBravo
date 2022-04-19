import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import RegistrationPage from './pages/RegistrationPage';
import TablePage from './pages/TablePage';

const App:FC = () =>  {
  let True = localStorage.getItem('activated') === 'True'
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound text='Sorry, this page not found'/>} />
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/registrate' element={<RegistrationPage/>}/>
        <Route path='/main' element={True ? <TablePage/> : <NotFound text='Please, login to open user table'/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
