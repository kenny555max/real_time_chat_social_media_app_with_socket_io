import { lazy } from "react";

const Components = {
    SignUp: lazy(() => import('./container/SignUp/SignUp')),
    Login: lazy(() => import('./container/Login/Login')),
    Home: lazy(() => import('./container/Home/Home')),
    Profile: lazy(() => import('./container/Profile/Profile')),
    AuthVerify: lazy(() => import('./components/AuthVerify/AuthVerify')),
    ChatBox: lazy(() => import('./container/ChatBox'))
}

export default Components;