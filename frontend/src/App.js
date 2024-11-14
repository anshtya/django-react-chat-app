import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import ChatRoom from "./pages/ChatRoom";
import "bootstrap/dist/css/bootstrap.min.css"

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <button class="logout-btn" onClick={handleLogout}>
      Log Out
    </button>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <ChatRoom />
          // </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App;
