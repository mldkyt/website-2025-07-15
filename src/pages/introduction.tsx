
import React from "react";
import { Header } from "@/components/Generic/Header";
import Heading from "@/components/Generic/Heading";
import Main from "@/components/Generic/Main";
import Metadata from "@/components/Generic/Metadata";
import Offset from "@/components/Generic/Offset";
import Image from "next/image";

import misskeyprofile from '@/images/misskeyprofile.jpg';
import Content from "@/components/Generic/Content";
import Footer from "@/components/Generic/Footer";
import { getVisits } from "@/backend/visitsCounter";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";


export async function getServerSideProps() {
    const visits = await getVisits({ route: "/introduction" });

    return {
        props: {
            visits,
        },
    };
}

export default function Introduction(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Header highlight="" />
            <Metadata title={'Introduction'} description={'An extended introduction to Lunya and about her'} />
            <Main>
                <Content>
                    <Heading level={1}>Introduction</Heading>
                    <div className="flex justify-center">
                        <Image src={misskeyprofile} alt="Misskey Profile" width={409.5} height={512} />
                    </div>

                    <div className="bg-red-800 p-2 mt-2 rounded-md drop-shadow-lg">
                        <p className="font-bold">WARNING</p>
                        <p>This page is under active editing. Please suggest improvements <Link href={'/socials'} className="text-pink-400 hover:text-pink-200">here</Link> :3</p>
                    </div>

                    <Heading level={2}>About Lunya</Heading>
                    <p className="py-2">Lunya is a transfem developer and a content creator from the Czech Republic. I use she/her pronouns exclusively and prefer not to be called by anything else. When in a voice call with me, you can call me &quot;mld&quot; or Lunya. I am transgender, pansexual and aromantic. Thus I am transitioning from a boy to a girl, I find anyone and anything attractive, but I do not like dating, it&apos;s not my cup of tea.</p>
                    <Heading level={2}>How to talk with me</Heading>
                    <p className="py-2">Talk to me in English. You can use a translator if you don&apos;t know English, or struggle with it.</p>
                    <p className="py-2">I like socializing with people that share the same interests and communities with me, which means I find people in the LGBTQ+ community amazing, and tech savvy people amazing. I also find many content creators interesting based on their content, or indie developers by their games. I heavily support people actively developing or maintaining free and open source software.</p>
                    <p className="py-2">What I don&apos;t like when talking with somebody are topics which are sensitive, such as anything political. Anything even remotely political is something I&apos;ll disagree talking about. I&apos;ll also quickly block any bigots, nazis, fascists and any people actively supporting it. I also do not support for-profit software and services which have a bad terms of service or privacy policy, even if the service is open source.</p>
                    <p className="py-2">If you recently added me as a friend on a social platform of any sort, please do not ask me about the transition process of mine. I don&apos;t like sharing this information with many people, so I&apos;ll reject it.</p>
                    <p className="py-2">Do not ask me for any real life pictures of me, I&apos;ll always reject it. I&apos;ll never share a picture of me with anyone on the internet, ever.</p>
                    <Heading level={2}>Behaviour</Heading>
                    <p className="py-2">My behaviour is mostly cute. I try to make things cute. My favorite colors are pink and purple, and a lot of things are themed that way, including my fedi instance, website and Git Forge.</p>
                    <p className="py-2">Even if I am in a relationship with someone, I&apos;ll forget about actively communicating with that person in the relationship. This means that if I never send out messages, that&apos;s completely normal. I prefer to be messaged instead of messaging someone.</p>
                    <p className="text-lg font-bold pt-8">This page will be extended if it is missing any piece of information. If it is missing something you would like here, please notify me about it in some way! You can get in touch with me <Link href={'/socials'} className="text-pink-400 hover:text-pink-200">here</Link>.</p>
                    <Offset amt={5} />
                    <Footer visits={props.visits} />
                </Content>
            </Main>
        </>
    );
}
