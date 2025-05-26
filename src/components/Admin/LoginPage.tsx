/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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

import {useState} from "react";
import Main from "@/components/Generic/Main";
import Metadata from "@/components/Generic/Metadata";
import Content from "@/components/Generic/Content";
import Button from "@/components/Generic/Button";
import Offset from "@/components/Generic/Offset";

export default function LoginPage(props: {
    passwordEntered: (pass: string) => void,
    error: string
}) {
    const [password, setPassword] = useState('');

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        props.passwordEntered(password);
    }

    return <Main>
        <Metadata title={'Login to Admin'} description={'Log into the administration of Lunya\'s website.'}/>
        <Content>
            <br/>

            <h1 className={'text-center mt-16 mb-4 font-bold text-4xl'}>Lunya administration</h1>

            <form onSubmit={submitForm}>
                <label htmlFor={'key'}>Password</label>
                <br/>
                <input type={'password'} value={password} onChange={x => setPassword(x.currentTarget.value)}
                       className={'bg-[#222] p-1 px-2 w-full rounded-lg'}/>
                <Offset amt={2}/>
                <Button type={"submit"}>Login</Button>
            </form>

            <Offset amt={2}/>
            {props.error && <p className={'text-red-500'}>{props.error}</p>}
        </Content>
    </Main>

}