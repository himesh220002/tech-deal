import { AuthProvider } from "./context/AuthContext";
import { LikedProvider } from "./context/LikedContext";
import  AppContent from "./AppContent"

export default function App() {
  return (
    <AuthProvider>
      <LikedProvider>
        <AppContent />
      </LikedProvider>
    </AuthProvider>
  );
}
