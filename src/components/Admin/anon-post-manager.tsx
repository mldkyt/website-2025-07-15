import React, { useState } from 'react';

import Main from '../Generic/main';
import Metadata from '../Generic/metadata';
import Heading from '../Generic/heading';
import Content from '../Generic/content';
import Button from '../Generic/button';

function AnonMessage(props: { id: number; message: string; cw?: string; remove: () => void }) {
    const [openRespondDialog, setOpenRespondDialog] = useState(false);
    const [openBanDialog, setOpenBanDialog] = useState(false);

    const [responseText, setResponseText] = useState('');
    const [banDialogText, setBanDialogText] = useState('');

    const [error, setError] = useState('');

    const submitResponse = () => {
        fetch('/api/admin/anonmessage/respond', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('adminToken') || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                reply: responseText,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'ok') {
                    setOpenRespondDialog(false);
                    props.remove();
                } else {
                    setError(`Error: ${data.error}`);
                }
            })
            .catch((err) => {
                setError(`Error: ${err}`);
            });
    };

    const discard = () => {
        fetch('/api/admin/anonmessage/discard', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('adminToken') || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'ok') {
                    setOpenRespondDialog(false);
                    props.remove();
                } else {
                    setError(`Error: ${data.error}`);
                }
            })
            .catch((err) => {
                setError(`Error: ${err}`);
            });
    };
    const discardBan = () => {
        fetch('/api/admin/anonmessage/discardban', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('adminToken') || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.id,
                reason: banDialogText,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'ok') {
                    setOpenRespondDialog(false);
                    props.remove();
                } else {
                    setError(`Error: ${data.error}`);
                }
            })
            .catch((err) => {
                setError(`Error: ${err}`);
            });
    };

    if (props.cw !== undefined) {
        return (
            <>
                <div className="border-2 border-white rounded-lg p-2 px-4">
                    <details>
                        <summary>{`CW: ${props.cw}`}</summary>
                        <p>{props.message}</p>
                        <Button onClick={() => setOpenRespondDialog(true)}>Respond</Button>
                        <Button onClick={discard}>Discard</Button>
                        <Button onClick={() => setOpenBanDialog(true)}>Ban</Button>
                        {openRespondDialog && (
                            <>
                                <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} className={'bg-[#333] rounded-lg p-1 px-2 w-full'} name="message"></textarea>
                                <Button onClick={() => setOpenRespondDialog(false)}>Close</Button>
                                <Button onClick={submitResponse}>Send</Button>
                            </>
                        )}
                        {error && <p className="text-red-500">{error}</p>}
                    </details>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="border-2 border-white rounded-lg p-2 px-4">
                <p>{props.message}</p>
                <Button onClick={() => setOpenRespondDialog(true)}>Respond</Button>
                <Button onClick={discard}>Discard</Button>
                <Button onClick={() => setOpenBanDialog(true)}>Ban</Button>

                {openRespondDialog && (
                    <>
                        <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} className={'bg-[#333] rounded-lg p-1 px-2 w-full'} name="message"></textarea>
                        <Button onClick={() => setOpenRespondDialog(false)}>Close</Button>
                        <Button onClick={submitResponse}>Send</Button>
                    </>
                )}

                {openBanDialog && (
                    <>
                        <br />
                        <label htmlFor="reason">Reason</label>
                        <br />
                        <input className={'bg-[#333] rounded-lg p-1 px-2 w-full'} type="text" name="reason" id="reason" value={banDialogText} onChange={(x) => setBanDialogText(x.currentTarget.value)} />
                        <br />
                        <Button onClick={() => setOpenBanDialog(false)}>Close</Button>
                        <Button onClick={discardBan}>Ban</Button>
                    </>
                )}

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </>
    );
}

export default function AnonMessageManager() {
    const [messages, setMessages] = React.useState<{ id: number; message: string; cw?: string }[]>([]);

    const hasRan = React.useRef(false);

    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (hasRan.current) {
            return;
        }
        hasRan.current = true;
        fetch('/api/admin/anonmessage/get', {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('adminToken') || '',
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setMessages(res);
            })
            .catch((err) => {
                setError(`Error: ${err}`);
            });
    });

    return (
        <>
            <Metadata title="Anonymous Message Manager" description="Manage anonymous messages" />
            <Main>
                <Content>
                    <Heading level={1}>Anonymous Messages Manager</Heading>
                    {messages.map((x) => {
                        const remove = () => {
                            setMessages(messages.filter((y) => y.id !== x.id));
                        };

                        return <AnonMessage {...x} key={x.id} remove={remove} />;
                    })}
                    {error && <p className="text-red-500">{error}</p>}
                </Content>
            </Main>
        </>
    );
}
