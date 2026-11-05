import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DashboardLayout from './common/layout/DashboardLayout';
import Products from './components/web/products/Products';
import Users from './components/web/users/Users';
import Dashboard from './components/web/dashboard/Dashboard';
import Login from './components/web/login/Login';

function App() {

  return (
    <>
       <Routes>
      <Route path="/" element={<Login />} />

      <Route  element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </>
    //  <Routes>
    //   <Route path="/" element={<DashboardLayout />}>
    //     <Route
    //       index
    //       element={<h1 className="text-3xl font-bold">Welcome to Dashboard</h1>}
    //     />
    //   </Route>
    // </Routes>
  )
}

export default App
