import { AuthProvider } from "./context/AuthContext";
import { RequestProvider } from "./components/ToastContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <RequestProvider>
        <AppRoutes />
      </RequestProvider>
    </AuthProvider>
  );
}

export default App;