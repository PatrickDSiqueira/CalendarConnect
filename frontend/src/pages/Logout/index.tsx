import {Button} from "primereact/button";
import React, {useState} from "react";

export default function () {
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);

        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        document.cookie = "calendar_connect=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        setLoading(false);
        window.location.href = '/login';
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button
                onClick={handleLogout}
                loading={loading}>
                Logout
            </Button>
        </div>
    );
}