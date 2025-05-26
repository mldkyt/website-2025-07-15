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

import { Header } from "@/components/Generic/Header";
import Metadata from "@/components/Generic/Metadata";
import Offset from "@/components/Generic/Offset";
import Heading from "@/components/Generic/Heading";
import Content from "@/components/Generic/Content";
import Main from "@/components/Generic/Main";
import Footer from "@/components/Generic/Footer";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getVisits } from "@/backend/visitsCounter";
import Button from "@/components/Generic/Button";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const visits = await getVisits({ route: "/contact" });

    let privacyWarning = false;

    const gpcHeader = ctx.req.headers["sec-gpc"];

    if (gpcHeader === "1") {
        privacyWarning = true;
    }

    const dntHeader = ctx.req.headers["dnt"];

    if (dntHeader === "1") {
        privacyWarning = true;
    }

    return {
        props: {
            visits,
            privacyWarning,
        },
    };
}

export default function AnonymousMessages(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [cw, setCw] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState("");

    const send = () => {
        fetch("/api/anonmessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: cw.length > 0 ? JSON.stringify({
                message: message,
                cw: cw,
            }) : JSON.stringify({
                message: message
            }),
        })
            .then((x) => {
                if (x.ok) {
                    setSuccess(true);
                    setCw("");
                    setMessage("");
                } else {
                    x.json()
                        .then((y) => {
                            setError(y.error);
                        })
                        .catch((e) => {
                            setError(`Error: ${x.statusText}: ${e}`);
                        });
                }
            })
            .catch((e) => {
                setError(`Error: ${e}`);
            });
    };

    return (
        <Main>
            <Header highlight={"contact"} />
            <Metadata title={"Sent an Anonymous Message to Lunya"} description={"This page allows you to send a silly message anonymously to lunya :3"} />
            <Content>
                <Heading level={1}>send an anonymous message to Lunya</Heading>

                <p>send anonymous messages to me 🥺</p>

                {props.privacyWarning && (
                    <div className="bg-yellow-800 p-2 m-1 rounded-lg drop-shadow-lg">
                        <h2>
                            <strong>warning: </strong> you are running a browser with Do Not Track on. this will store your IP address when submitted.
                        </h2>
                    </div>
                )}

                <label htmlFor="cw">content warning</label>
                <br />
                <input value={cw} onChange={(e) => setCw(e.target.value)} className={"bg-[#333] rounded-lg p-1 px-2 w-full"} type="text" name="cw" id="cw"></input>
                <br />
                <label htmlFor="message">message</label>
                <br />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={"bg-[#333] rounded-lg p-1 px-2 w-full"} name="message"></textarea>
                <div className="mt-2"><Button fullWidth onClick={send}>send it to me 🥺</Button></div>

                {success && <p className="text-green-500">sent! thank you sis~</p>}
                {error && <p className="text-red-500">ewwow: {error}</p>}

                <br />

                <p>typically it might take me up to a day to respond. poke me to respond faster uwu :3</p>

                <p className="pt-2">i am also going to consider allowing filling out an optional notification form, so i can notify only you when your post gets answered :3</p>

                <Offset amt={3} />
                <Footer visits={props.visits} route={"/contact"} />
            </Content>
        </Main>
    );
}
