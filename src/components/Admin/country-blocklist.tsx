/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024-2025  Lunya UwU :3
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

import React from 'react';
import { useEffect, useRef, useState } from 'react';

import Main from '@/components/Generic/main';
import Content from '@/components/Generic/content';
import Heading from '@/components/Generic/heading';
import Button from '@/components/Generic/button';

export default function CountryBlocklist() {
    const [blocked, setBlocked] = useState<{ code: string; reason: string }[]>([]);

    const hasLoaded = useRef(false);

    useEffect(() => {
        if (hasLoaded.current) {
            return;
        }
        hasLoaded.current = true;

        fetch('/api/admin/countryblocklist/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('adminToken') ?? '',
            },
        }).then((x) => {
            if (x.ok) {
                x.json().then((x) => {
                    setBlocked(x);
                });
            }
        });
    });

    const add = () => {
        const countryCode = prompt('Enter CountryCode');
        if (!countryCode) {
            return;
        }

        const reason = prompt('Enter Reason');
        if (!reason) {
            return;
        }

        fetch('/api/admin/countryblocklist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('adminToken') ?? '',
            },
            body: JSON.stringify({
                code: countryCode,
                reason,
            }),
        }).then((x) => {
            if (x.ok) {
                setBlocked([...blocked, { code: countryCode, reason }]);
            }
        });
    };

    const remove = (x: string) => {
        fetch('/api/admin/countryblocklist/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('adminToken') ?? '',
            },
            body: JSON.stringify({
                code: x,
            }),
        }).then((z) => {
            if (z.ok) {
                setBlocked(blocked.filter((y) => y.code !== x));
            }
        });
    };

    return (
        <Main>
            <Content>
                <Heading level={1}>Country Blocklist Manager</Heading>
                <p>Double click to remove entries.</p>
                <Heading level={2}>Blocked countries</Heading>
                <ul className={'list-disc ml-4'}>
                    {blocked.map((x, i) => {
                        return <li key={i} onDoubleClick={() => remove(x.code)}>{`${x.code}: ${x.reason}`}</li>;
                    })}
                </ul>
                <Heading level={2}>Controls</Heading>
                <Button onClick={add}>Add</Button>
            </Content>
        </Main>
    );
}
