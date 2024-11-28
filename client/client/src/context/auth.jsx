import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";

// Zustand store
const useAuthStore = create((set) => ({
  auth: {
    user: null,
    token: "",
  },
  setAuth: (newAuth) =>
    set((state) => ({ auth: { ...state.auth, ...newAuth } })),
  initializeAuth: () => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      set(() => ({
        auth: {
          user: parseData.user,
          token: parseData.token,
        },
      }));
    }
  },
}));


//custom hook
const useAuth = () => {
  const { auth, setAuth, initializeAuth } = useAuthStore();
  useEffect(() => {
    initializeAuth();
  }, []);
  return { auth, setAuth };
};

export { useAuth };
