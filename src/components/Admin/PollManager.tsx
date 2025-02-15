/*
 *     mldchan's Personal Website
 *     Copyright (C) 2024  エムエルディー
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


import React from "react";

import Main from "@/components/Generic/Main";
import Content from "@/components/Generic/Content";
import Metadata from "@/components/Generic/Metadata";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/Generic/Button";

type PollData = {
    title: string,
    handle: string,
    options: { option: string, votes: number }[]
};

function CreatePoll(props: {
    pollCreate: (title: string, handle: string, options: string[]) => void
}) {

    const [title, setTitle] = useState('');
    const [handle, setHandle] = useState('');
    const [options, setOptions] = useState<string[]>(['']);

    const create = () => {
        props.pollCreate(title, handle, options);
    }

    const addEmptyOption = () => {
        setOptions([...options, '']);
    }

    const removeEmptyOption = () => {
        if (options.length > 1 && options[options.length - 1] === '') {
            setOptions(options.slice(0, options.length - 1));
        }
    }

    return <>
        <div className={'border-2 border-white p-1 px-2 rounded-lg'}>
            <p>
                {`/poll/`}
                <input type={'text'} value={handle} onChange={x => setHandle(x.currentTarget.value)}
                       className={'bg-[#222] p-1 px-2 rounded-lg text-white'}/>
            </p>
            <h1>
                <input type={'text'} value={title} onChange={x => setTitle(x.currentTarget.value)}
                       className={'bg-[#222] w-full p-1 px-2 rounded-lg drop-shadow-md font-bold text-white text-2xl'}
                       placeholder={'Title of the poll'}/>
            </h1>
            <ul className={'ml-8'}>
                {options.map((x, i) => {
                    const change = (v: string) => {
                        setOptions(options.map((x, j) => i === j ? v : x));
                    }

                    return <div key={i}>
                        <input type={'text'} placeholder={`Option ${i + 1}`} value={x}
                               onChange={x => change(x.currentTarget.value)}
                               className={'w-1/2 bg-[#222] rounded-lg p-1 px-2 mt-1'}/>
                    </div>
                })}
            </ul>
            <Button onClick={addEmptyOption}>Add option</Button>
            <Button onClick={removeEmptyOption}>Remove option</Button>
            <br/>
            <Button onClick={create}>Create poll</Button>
        </div>

    </>
}

function Poll(props: {
    title: string,
    handle: string,
    options: { option: string, votes: number }[],
    onDelete: () => void,
}) {
    const [delError, setDelError] = useState<string>('');

    const del = () => {
        fetch('/api/admin/polls/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            },
            body: JSON.stringify({
                handle: props.handle
            })
        }).then(res => {
            if (res.ok) {
                props.onDelete();
            }
        }).catch(x => {
            setDelError(x);
        })
    }

    return <div className={'border-2 border-white p-1 px-2 rounded-lg'}>
        <p>{`/poll/${props.handle}`}</p>
        <h1 className={'text-2xl font-bold'}>{props.title}</h1>
        <ul className={'ml-8'}>
            {props.options.map((x,i) => <li key={i}><strong>{x.option}</strong>{` - ${x.votes} votes`}</li>)}
        </ul>
        <Button onClick={del}>Delete poll</Button>
        {delError === '' || <p className={'text-red-600'}>{`Error: ${delError}`}</p>}
    </div>
}

export function PollManager() {

    const [polls, setPolls] = useState<PollData[]>([]);
    const [create, setCreate] = useState(false);

    const [error, setError] = useState('');

    const hasLoaded = useRef(false);

    useEffect(() => {
        if (!hasLoaded.current) {
            hasLoaded.current = true;

            setError('');

            fetch('/api/admin/polls/get', {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('adminToken') || ''
                }
            }).then(x => {
                if (x.ok) {
                    x.json().then((data: { polls: PollData[] }) => {
                        setPolls(data.polls);
                    }).catch(x => {
                        setError(`Failed to parse JSON: ${x}`);
                    });
                }
            }).catch(x => {
                setError(`Failed to fetch: ${x}`);
            });
        }
    }, []);

    const createPoll = (title: string, handle: string, options: string[]) => {
        fetch('/api/admin/polls/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            },
            body: JSON.stringify({
                title: title,
                handle: handle,
                options: options
            })
        }).then(x => {
            if (x.ok) {
                setCreate(false);
                setPolls([{
                    title: title,
                    handle: handle,
                    options: options.map(x => ({option: x, votes: 0}))
                }, ...polls]);
            }
        }).catch(x => {
            setError(`Failed to fetch: ${x}`);
        })
    }

    return <Main>
        <Metadata title={'Poll Manager'} description={'Poll Manager on mldchan\'s admin panel'}/>
        <Content>
            <br/>
            <h1 className={'mt-8 mb-4 text-2xl font-bold'}>Manage polls</h1>
            {create && <CreatePoll pollCreate={createPoll}/>}
            {create || <Button onClick={() => setCreate(true)}>Create a poll</Button>}
            {error && <p className={'text-red-500'}>{error}</p>}
            <br/>
            {polls.map((x, i) => {
                const del = () => {
                    setPolls(polls.filter(y => y !== x));
                }

                return <>
                    <Poll key={i} title={x.title} handle={x.handle} options={x.options} onDelete={del}/>
                    <br/>
                </>
            })}
        </Content>
    </Main>
}
