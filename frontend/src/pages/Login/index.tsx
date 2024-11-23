import {Button} from "primereact/button";
import axios from "axios";
import React, {useState} from "react";

export default function () {

    const [loading, setLoading] = useState(false);

    const [authLink, setAuthLink] = useState('');

    const [error, setError] = useState('');

    axios.get(process.env.REACT_APP_BACKEND_URL + '/auth/google')
        .then(({data}) => {

            setAuthLink(data.data)
            setLoading(false);
        })
        .catch((error: Error) => {

            setError(error.message);
        })

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <a href={authLink}>
                <Button disabled={!!error} loading={loading} href={authLink}>Login with Google</Button>
            </a>
        </div>
    )
}