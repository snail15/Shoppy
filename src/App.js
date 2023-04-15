import './App.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
