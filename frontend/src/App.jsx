import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import Leads from "./pages/Leads";
import WidgetChat from "./pages/WidgetChat";
import UrlTraining from "./pages/UrlTraining";
import Handoff from "./pages/Handoff";
import Plans from "./pages/Plans";
import Team from "./pages/Team";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/widget-chat"
        element={<WidgetChat />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <Leads />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/url-training"
        element={
          <ProtectedRoute>
            <UrlTraining />
          </ProtectedRoute>
        }
      />

      <Route
        path="/handoff"
        element={
          <ProtectedRoute>
            <Handoff />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;