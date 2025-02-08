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
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import postgres from "postgres";
import Main from "@/components/Generic/Main";
import Content from "@/components/Generic/Content";
import {Header} from "@/components/Generic/Header";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import {useRef, useState} from "react";
import Button from "@/components/Generic/Button";
import Metadata from "@/components/Generic/Metadata";
import Turnstile from "react-turnstile";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const {handle} = ctx.params as { handle: string };
    if (!handle) {
        return {
            notFound: true
        }
    }

    const sql = postgres({});
    const dbPolls = await sql`select *
                              from polls
                              where handle = ${handle}`;
    if (dbPolls.length === 0) {
        await sql.end();
        return {
            notFound: true
        }
    }

    const dbOptions = await sql`select id,
                                       option,
                                       (select count(*) from pollvotes where optionid = pollOptions.id) as votes
                                from pollOptions
                                where pollId = (select id from polls where handle = ${handle})`;

    return {
        props: {
            handle,
            title: dbPolls[0].title,
            options: dbOptions.map((option: any) => {
                return {
                    id: option.id as number,
                    option: option.option as string,
                    votes: Number(option.votes) as number
                }
            }),
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function Poll(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [userVote, setUserVote] = useState<number>(0);

    let total = 0;
    props.options.forEach((option: { option: string, votes: number }) => {
        total += option.votes;
    });
    if (userVote) {
        total += 1;
    }

    const [checkedOption, setCheckedOption] = useState(0);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const cfTurnstileToken = useRef<string>("");

    const vote = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const option = formData.get('option');

        if (!option || option === '0') {
            setError('Please select an option');
            return;
        }

        setSuccess(false);
        setError('');

        fetch('/api/poll/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                handle: props.handle,
                optionId: checkedOption,
                cfToken: cfTurnstileToken.current
            })
        }).then(res => res.json()).then(data => {
            if (data.status === "ok") {
                setSuccess(true);
                setUserVote(Number(option));
            } else {
                setError(`Error: ${data.error}`);
            }
        }).catch(err => {
            setError(`Error: ${err}`);
        })
    }

    return (
        <Main>
            <Metadata title={`Poll: ${props.title}`} description={`Vote on mldchan's poll "${props.title}".`}/>
            <Header/>

            <Content>
                <Offset amt={4}/>
                <Heading level={1}>{`Poll: ${props.title}`}</Heading>
                <p>Here's what existing people voted:</p>
                <ul className={'text-left'}>
                    {props.options.map((option: { id: number, option: string, votes: number }, index: number) => {
                        const percentage = (
                            (
                                option.votes +
                                (userVote === option.id ? 1 : 0)
                            ) / total
                        ) * 100;

                        return <li key={index}>
                            <strong>{option.option}</strong>{` - ${option.votes + (userVote === option.id ? 1 : 0)} votes${!isNaN(percentage) ? ` - ${percentage.toFixed(2)}%` : ''}`}
                        </li>
                    })}
                </ul>

                <form onSubmit={vote}>
                    <Heading level={2}>Vote on this poll</Heading>

                    <input type={'radio'} name={'option'} value={0} defaultChecked onClick={() => setCheckedOption(0)}
                           className={'accent-pink-400 hover:accent-pink-200'}/>
                    <label className={'ml-2'}>Please select an option</label>
                    {props.options.map((option: { id: number, option: string }, index: number) => {
                        const setOption = () => {
                            setCheckedOption(option.id);
                        }

                        return <div key={index}>
                            <input type={'radio'} name={'option'} value={option.id} onClick={setOption}
                                   className={'accent-pink-400 hover:accent-pink-200'}/>
                            <label className={'ml-2'}>{option.option}</label>
                        </div>
                    })}

                    <br/>

                    <Turnstile sitekey={props.cloudflareSiteToken} onVerify={x => cfTurnstileToken.current = x}/>

                    <Button type={'submit'}>Submit</Button>
                </form>

                {error.length > 0 && <p className={'text-red-600'}>{`Error: ${error}`}</p>}
                {success && <p className={'text-green-600'}>Successfully voted!</p>}
            </Content>
        </Main>
    )
}