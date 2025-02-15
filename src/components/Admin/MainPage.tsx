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
import Metadata from "@/components/Generic/Metadata";
import Content from "@/components/Generic/Content";
import Button from "@/components/Generic/Button";

export default function MainPage(props: {
    goToPage: (page: string) => void
}) {
    return <Main>
        <Metadata title={'Main Page'} description={'This is the main page of the admin panel'}/>

        <Content>
            <br/>
            <h1 className={'mt-8 mb-4 font-bold text-2xl'}>Welcome to the admin panel, mldchan!</h1>
            <p>Here you can manage blog posts.</p>
            <Button onClick={() => props.goToPage('blogManager')}>Manage blog posts</Button>
            <Button onClick={() => props.goToPage('pollManager')}>Manage polls</Button>
            <Button onClick={() => props.goToPage('guestbookManager')}>Manage guestbook</Button>
        </Content>
    </Main>
}