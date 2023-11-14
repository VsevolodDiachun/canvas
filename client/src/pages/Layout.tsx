/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import style from "../styles/app.module.scss";
import Toolbar from "../components/Toolbar";
import SettingBar from "../components/SettingBar";
import Canvas from "../components/Canvas";
import {useLocation, useNavigate} from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.length !== 13) {
            if (!location.state?.isNavigating) {
                navigate(`/f${(+new Date()).toString(16)}`, { state: { isNavigating: true } });
            }
        }
    }, [])

    return (
        <div className={style.app}>
            <Toolbar />
            <SettingBar />
            <Canvas/>
        </div>
    )
};

export default Layout;