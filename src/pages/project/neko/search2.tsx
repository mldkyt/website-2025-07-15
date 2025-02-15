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
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import {ChangeEvent, JSX, useRef, useState} from "react";
import Offset from "@/components/Generic/Offset";
import Link from "next/link";
import {motion} from "motion/react";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";

function highlightText(text: string, query: string) {
    const words = query.toLowerCase().split(' ');
    let highlightedText: (string | JSX.Element)[] = [text];

    words.forEach(word => {
        highlightedText = highlightedText.flatMap(part => {
            if (typeof part === 'string') {
                const parts = part.toLowerCase().split(word);
                if (parts.length === 1) return [part];

                const result: (string | JSX.Element)[] = [];
                let lastIndex = 0;
                parts.forEach((subPart, index) => {
                    if (index > 0) {
                        result.push(<span
                            className={'text-pink-400'}>{text.slice(lastIndex, lastIndex + word.length)}</span>);
                        lastIndex += word.length;
                    }
                    result.push(<span
                        className={'text-gray-400'}>{text.slice(lastIndex, lastIndex + subPart.length)}</span>);
                    lastIndex += subPart.length;
                });
                return result;
            }
            return [part];
        });
    });

    return <>{highlightedText}</>;
}

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/neko/search2'});

    const date = new Date();

    let month = (date.getUTCMonth() + 1).toString();
    if (month.length === 1) month = `0${month}`;

    return {
        props: {
            visits,
            year: date.getUTCFullYear(),
            month,
            cloudflareSiteToken: process.env['CLOUDFLARE_SITE_TOKEN']!
        }
    }
}

export default function NekoSearchV2(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<{ name: string, desc: string, url: string }[]>([]);
    const [time, setTime] = useState('0ms');
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currSearch = useRef<any | null>(null);

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        if (currSearch.current) {
            clearTimeout(currSearch.current);
            currSearch.current = null;
        }

        setQuery(event.target.value);
        setHasSearched(true);
        setSearching(true);
        setError(null);

        if (event.target.value.trim().length === 0) {
            setResults([]);
            setTime('0ms');
            setSearching(false);
            return;
        }

        fetch('/api/nekoweb/search?q=' + event.target.value).then(x => {
            x.json().then(x => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setResults(x.hits.map((y: any) => {
                    return {name: y.title, desc: y.body, url: y.url}
                }))
                setTime(x.time.toString() + 'ms');
                setSearching(false);
            }).catch(x => {
                setError(x.toString());
                setSearching(false);
            })
        }).catch(x => {
            setError(x.toString());
            setSearching(false);
        });
    }

    return <Main>
        <Header highlight={'projects'}/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>Neko Search</Heading>
            <p><strong>{`The website index was last updated ${props.year}/${props.month}/01`}</strong>. This gets
                reindexed every month, but note the date here is static.</p>
            <p className="pt-2">This version is powered by self-hosted Meilisearch on https://mldchan.dev/. No data is
                collected, apart
                from error logs.</p>

            <Heading level={2}>Search</Heading>
            <input type={'text'} onChange={change} className={'bg-[#333] p-1 rounded-lg w-full'}/>


            {error ? <p className={'text-red-500'}>{error}</p> : null}
            {time !== '0ms' ? <p>Search took {time}{searching && '...'}</p> : (searching && '...')}
            <Heading level={2}>Results</Heading>
            {(results.length === 0 && hasSearched && !searching) ?
                <p className={'font-bold text-xl'}>No results found. Search for something else?</p> : null}
            {results.map((x, i) => {
                return <div key={i} className={'m-1 bg-[#222] p-2 rounded-lg my-4 drop-shadow-md'}>
                    <motion.h1 whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} className={'w-max'}>
                        <Link href={x.url}
                              className={'text-pink-400 hover:text-pink-200 text-xl font-bold'}>{x.name}</Link>
                    </motion.h1>
                    <p className={'text-sm'}>{highlightText(x.desc, query)}</p>
                </div>
            })}
            <Offset amt={3}/>
            <Footer visits={props.visits} route={'/project/neko/search2'}
                    cloudflareSiteToken={props.cloudflareSiteToken}/>
        </Content>
    </Main>

}
