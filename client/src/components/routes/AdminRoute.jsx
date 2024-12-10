import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import instance from "../../axios";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await instance.get(`auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <div>Spinner</div>;
};

export default AdminRoute;
