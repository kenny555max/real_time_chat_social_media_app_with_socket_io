import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
      return null;
  }
};

const AuthVerify = () => {
    let location = useLocation();
    let navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) {
        const decodedJwt = parseJwt(user?.token);

        if (decodedJwt?.exp * 1000 < Date.now()) {
            localStorage.clear('profile');

            navigate('/');
        }
    }
  }, [location, navigate]);

  return ;
};

export default AuthVerify;