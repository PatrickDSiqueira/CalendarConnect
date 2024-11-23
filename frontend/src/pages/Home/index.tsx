import React, {useEffect} from "react";
import axios from "axios";
import {Message} from "primereact/message";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

export default function ({token}: { token: string }) {

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(false);
    const [events, setEvents] = React.useState<[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                setEvents(response.data.data);

            } catch (err) {
                setError(true);
                setErrorMessage(err.response ? err.response.statusText : err.message);
            }
        };

        fetchEvents();
    }, [token]);

    const header = (<img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png"/>);

    const footer = (link: string) => (<Button label="Acessar Evento" link onClick={() => window.open(link)}/>);

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {error && <Message severity="error" text={errorMessage}/>}

            <div className="card flex justify-content-center" style={{
                background: 'var(--surface-card)',
                border: 'var(--card-border)',
                padding: '2rem',
                borderRadius: '10px',
                marginBottom: '1rem', display: 'flex', justifyContent: 'center'
            }}>
                {
                    events.map((item: any, index: number) => {

                        return (
                            <Card title={item.summary} subTitle={item.summary} footer={footer(item.link)}
                                  header={header}
                                  key={index}
                                  className="md:w-25rem">
                                <p className="m-0">End date: {item.end}</p>
                                <p className="m-0">End start: {item.start}</p>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}