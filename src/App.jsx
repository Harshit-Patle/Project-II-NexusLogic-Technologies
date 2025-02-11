import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components_temp/Header';
import Footer from './components_temp/Footer';
import Dashboard from './Pages/Dashboard';
import ProjectDetails from "./Pages/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;