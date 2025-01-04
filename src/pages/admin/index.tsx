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

import {useEffect, useState} from "react";
import LoginPage from "@/components/Admin/LoginPage";
import MainPage from "@/components/Admin/MainPage";
import BlogManager from "@/components/Admin/BlogManager";

type Pages = 'login' | 'main' | 'blogManager';

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

    switch (page) {
        case "login":
            return <LoginPage passwordEntered={verifyAuth} error={loginError}/>;
        case "main":
            return <MainPage goToPage={(x) => setPage(x as Pages)}></MainPage>;
        case "blogManager":
            return <BlogManager></BlogManager>;
        default:
            throw new Error("Invalid page");
    }

}