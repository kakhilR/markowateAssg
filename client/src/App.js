import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import UserTable from './pages/UserTable';


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/users' element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;