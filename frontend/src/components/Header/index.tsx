import React from "react";
import {Menubar} from "primereact/menubar";
import {jwtDecode} from "jwt-decode";
import {Avatar} from "primereact/avatar";

export default function ({isAuth}: { isAuth: false | string }) {

    const end = () => {

        if (isAuth) {

            const {user} = jwtDecode(isAuth);

            return (
                <div style={{display: 'flex', alignItems: 'center', gap: 2}}>
                    {user.given_name} {user.family_name}
                    <Avatar image={user.picture} shape="circle"/>
                </div>
            );
        }
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/',
            visible: isAuth
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            url: '/logout',
            visible: isAuth,
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            url: '/login',
            visible: !isAuth,
        }
    ];
    return (<div className="card">
        <Menubar model={items} end={end}/>
    </div>);
}
