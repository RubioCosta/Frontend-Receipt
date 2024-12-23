import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Register } from './pages/Register';
import { ViewRegisters } from './pages/ViewRegisters';
import { GenerateReceipt } from './pages/GenerateReceipt'
import { CheckPayment } from './pages/CheckPayment/CheckPayment';
import { Receipt } from './pages/Receipt';
import { Edit } from './pages/Edit/Edit';

// Components
import { LateralMenu } from './components/LateralMenu';

// Context
import { AuthContext } from './context/AuthContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { authUser } = useContext(AuthContext)

  console.log(authUser)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route 
          path="/dashboard" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<Dashboard />} 
            /> :
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/register" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<Register />} 
            /> :
            <Navigate to="/" />
          }
        />
        <Route 
          path="/edit" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<Edit />} 
            /> :
            <Navigate to="/" />
          }
        />
        <Route 
          path="/view" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<ViewRegisters isOpen={isSidebarOpen} />} 
            /> :
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/check-payment" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<CheckPayment isOpen={isSidebarOpen} />} 
            /> :
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/generate-receipt" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<GenerateReceipt />} 
            /> :
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/generate" 
          element={
            authUser ?
            <LateralMenu 
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen} 
              children={<Receipt />} 
            /> :
            <Navigate to="/" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;