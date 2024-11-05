import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./components/navigation";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";

export default function App() {
  const checkUserAuth = useUserStore((state) => state.checkUserAuth);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const isAuth = await checkUserAuth();
    if (!isAuth) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}
