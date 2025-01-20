import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Home';
import Login from '../pages/Login';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
