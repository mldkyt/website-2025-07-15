/*
 *     Lunya's Personal Website
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
import {useEffect, useState} from "react";
import Button from "@/components/Generic/Button";

type BlogPost = {
    id: number;
    handle: string,
    title: string,
    description: string,
    targetURL: string,
    views: number,
    created: string,
    updated: string
}

function NewBlogPost(props: {
    show: boolean,
    hide: () => void,
    hideAndRefresh: () => void
}) {

    const [handle, setHandle] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetURL, setTargetURL] = useState('');

    const [error, setError] = useState('');

    const create = () => {

        setError('');

        fetch('/api/admin/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            },
            body: JSON.stringify({
                handle,
                title,
                description,
                targetURL
            })
        }).then(res => res.json()).then(data => {
            if (data.status === "ok") {
                setHandle('');
                setTitle('');
                setDescription('');
                setTargetURL('');
                props.hideAndRefresh();
            } else {
                setError(data.error);
            }
        })

    }

    if (!props.show) return null;

    return <div className={'border-white border-2 p-2 rounded-lg mb-4'}>
        <span className={'text-sm text-gray-500'}>/blog/<input type={'text'}
                                                               className={'bg-[#222] p-1 px-2 rounded-lg'}
                                                               placeholder={'handle'} value={handle}
                                                               onChange={x => setHandle(x.currentTarget.value)}></input></span>
        <h1 className={'text-lg font-bold'}>
            <input type={'text'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'} placeholder={'Title'} value={title}
                   onChange={x => setTitle(x.currentTarget.value)}/>
        </h1>
        <p>
            <input type={'text'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'} placeholder={'A short description'}
                   value={description} onChange={x => setDescription(x.currentTarget.value)}/>
        </p>
        <p>
            <input type={'url'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'}
                   placeholder={'https://example.blog/my-handle'} value={targetURL}
                   onChange={x => setTargetURL(x.currentTarget.value)}/>
        </p>

        <Button onClick={create}>Create</Button>
        {' '}
        <Button onClick={props.hide}>Close</Button>
        {error && <p className={'text-red-500'}>{error}</p>}
    </div>
}

function BlogPost(props: BlogPost & {
    removeBlogPost: (id: number) => void
}) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [handle, setHandle] = useState(props.handle);
    const [targetURL, setTargetURL] = useState(props.targetURL);
    const [error, setError] = useState('');

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const save = () => {
        fetch('/api/admin/blog/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            },
            body: JSON.stringify({
                postID: props.id,
                newHandle: handle,
                newTitle: title,
                newDescription: description,
                newTargetURL: targetURL
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'ok') {
                setEditing(false);
            } else {
                setError(data.error);
            }
        })
    }

    if (editing) {
        return <div className={'border-white border-2 p-2 rounded-lg mb-4'}>
        <span className={'text-sm text-gray-500'}>/blog/<input type={'text'}
                                                               className={'bg-[#222] p-1 px-2 rounded-lg'}
                                                               placeholder={'handle'} value={handle}
                                                               onChange={x => setHandle(x.currentTarget.value)}></input></span>
            <h1 className={'text-lg font-bold'}>
                <input type={'text'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'} placeholder={'Title'} value={title}
                       onChange={x => setTitle(x.currentTarget.value)}/>
            </h1>
            <p>
                <input type={'text'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'} placeholder={'A short description'}
                       value={description} onChange={x => setDescription(x.currentTarget.value)}/>
            </p>
            <p>
                <input type={'url'} className={'bg-[#222] p-1 px-2 rounded-lg w-full'}
                       placeholder={'https://example.blog/my-handle'} value={targetURL}
                       onChange={x => setTargetURL(x.currentTarget.value)}/>
            </p>

            <Button onClick={save}>Save</Button>
            {' '}
            <Button onClick={() => setEditing(false)}>Close</Button>
            {' '}
            {deleteConfirm ? (
                <>
                    <span>Confirm delete?</span>
                    <Button onClick={() => props.removeBlogPost(props.id)}>Delete</Button>
                </>
            ) : (
                <>
                    <Button onClick={() => setDeleteConfirm(true)}>Delete</Button>
                </>
            )}
            {error && <p className={'text-red-500'}>{error}</p>}
        </div>
    }

    return <div className={'border-white border-2 p-2 rounded-lg mb-4'}>
        <span className={'text-sm text-gray-500'}>{`/blog/${handle}`}</span>
        <h1 className={'text-lg font-bold'}>{title}</h1>
        <p>{description}</p>
        <p className={'text-sm'}>{`${props.views} views`}</p>
        <Button onClick={() => setEditing(true)}>Edit</Button>
    </div>
}

export default function BlogManager() {

    const [showCreate, setShowCreate] = useState(false);

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        fetch('/api/admin/blog/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            }
        }).then(res => res.json()).then(data => {
            setBlogPosts(data.blogPosts);
        })
    }

    const newBlogCreated = () => {
        setShowCreate(false);
        refresh();
    }

    const deleteBlogPost = (id: number) => {
        fetch('/api/admin/blog/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('adminToken') || ''
            },
            body: JSON.stringify({
                postID: id
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'ok') {
                setBlogPosts(
                    blogPosts.filter(x => x.id !== id)
                )
            }
        })
    }

    return <Main>
        <Metadata title={'Blog Management'} description={'This is the blog management section of Lunya\'s website.'}/>
        <Content>
            <br/>
            <h1 className={'mt-8 mb-4 text-2xl font-bold'}>Blog Manager</h1>

            {showCreate || <Button onClick={() => setShowCreate(true)}>Create blog post</Button>}
            <NewBlogPost show={showCreate} hide={() => setShowCreate(false)} hideAndRefresh={newBlogCreated}/>
            {blogPosts.map(x => {
                return <BlogPost key={x.id} id={x.id} handle={x.handle} title={x.title} description={x.description}
                                 targetURL={x.targetURL}
                                 views={x.views} created={x.created} updated={x.updated}
                                 removeBlogPost={deleteBlogPost}/>
            })}
        </Content>
    </Main>
}