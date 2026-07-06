import { Toaster } from "react-hot-toast";

import AuthProvider from "./contexts/AuthContext.jsx";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-left" />
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
