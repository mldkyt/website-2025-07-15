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

import React from "react";

import {useEffect, useState} from "react";
import LoginPage from "@/components/Admin/LoginPage";
import MainPage from "@/components/Admin/MainPage";
import BlogManager from "@/components/Admin/BlogManager";
import {PollManager} from "@/components/Admin/PollManager";
import GuestbookManager from "@/components/Admin/GuestbookManager";
import CountryBlocklist from "@/components/Admin/CountryBlocklist";
import Button from "@/components/Generic/Button";
import KeywordBlocklist from "@/components/Admin/KeywordBlocklist";
import AnonMessageManager from "@/components/Admin/AnonPostManager";

export type Pages = 'login' | 'main' | 'blogManager' | 'pollManager' | 'guestbookManager' | 'countryBlocks' | 'keywordBlocks' |
'anonPostManager';

async function verifyToken(key: string): Promise<boolean> {
    return await new Promise(resolve => {
        fetch('/api/admin/auth/verify', {
            method: 'POST',
            headers: {
                'Authorization': key
            }
        }).then(res => {
            if (res.ok) {
                localStorage.setItem('adminToken', key);
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(() => {
            resolve(false);
        });
    })
}

export default function Admin() {

    const [page, setPage] = useState<Pages>('login');
    const [loginError, setLoginError] = useState<string>('');

    const verifyAuth = (pass: string) => {
        // TODO: Implement authentication
        verifyToken(pass).then(res => {
            if (res) setPage('main');
            else setLoginError('Invalid password');
        })
    }

    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            verifyToken(localStorage.getItem('adminToken') as string).then(res => {
                if (res) setPage('main');
                else localStorage.removeItem('adminToken');
            });
        }
    }, [setPage]);

    if (page == 'login') {
        return <LoginPage error={loginError} passwordEntered={verifyAuth}/>;
    }

    if (page == "main") {
        return <MainPage goToPage={(x) => setPage(x as Pages)}/>;
    }

    return <>
        <Button onClick={() => setPage('main')}>&lt; Back</Button>

        {page == 'blogManager' && <BlogManager/>}
        {page == 'pollManager' && <PollManager/>}
        {page == 'guestbookManager' && <GuestbookManager/>}
        {page == 'countryBlocks' && <CountryBlocklist/>}
        {page == 'keywordBlocks' && <KeywordBlocklist/>}
        {page == 'anonPostManager' && <AnonMessageManager />}
    </>

}