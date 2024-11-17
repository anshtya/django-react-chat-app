import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { ChatContextProvider } from "./context/ChatContext"
import ChatRoom from "./pages/ChatRoom"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ChatContextProvider user={user}>
                <ChatRoom />
              </ChatContextProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
