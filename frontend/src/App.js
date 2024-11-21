import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"
import ChatRooms from "./pages/ChatRooms"
import "bootstrap/dist/css/bootstrap.min.css"
import Room from "./pages/Room"

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ChatContextProvider user={user}>
              <ProtectedRoute>
                <ChatRooms />
              </ProtectedRoute>
            </ChatContextProvider>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ChatContextProvider user={user}>
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            </ChatContextProvider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
