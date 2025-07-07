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
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';

import Main from '@/components/Generic/main';
import { Header } from '@/components/Generic/header';
import Content from '@/components/Generic/content';
import Heading from '@/components/Generic/heading';
import safe1 from '@/images/astolfoiscomingforyou/safe_1.png';
import safe2 from '@/images/astolfoiscomingforyou/safe_2.png';
import evil1 from '@/images/astolfoiscomingforyou/evil_1.png';
import evil2 from '@/images/astolfoiscomingforyou/evil_2.png';
import Offset from '@/components/Generic/offset';
import Metadata from '@/components/Generic/metadata';
import Footer from '@/components/Generic/footer';
import { getVisits } from '@/backend/visits-counter';
import Button from '@/components/Generic/button';

export async function getServerSideProps() {
    const visits = await getVisits({ route: '/project/astolfoiscomingforyou' });

    return {
        props: {
            visits,
        },
    };
}

export default function Astolfoiscomingforyou(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [variant, setVariant] = useState('safe');

    return (
        <Main>
            <Metadata
                title={'Astolfo is Coming for You'}
                description={
                    'Astolfo is coming for you has 2 variants: Safe and Evil. The main difference between the safe variant and evil variant is that the safe gives you compliments, while the evil shuts down your machine.'
                }
            />
            <Header highlight={'projects'} />
            <Content>
                <Heading level={1}>astolfo is coming for you</Heading>

                <p>choose between 2 variants: safe and evil :3</p>
                <p>the safe variant is for cuddlies :3 and the evil one shuts down your computer &gt;:3</p>

                <div className="w-full flex flex-row text-center">
                    <div onClick={() => setVariant('safe')} className={`${variant === 'safe' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>
                        safe and comf variant :3
                    </div>
                    <div onClick={() => setVariant('evil')} className={`${variant === 'evil' ? 'border-b-2 border-b-[#ff77ff]' : ''} py-2 w-full cursor-pointer`}>
                        evil variant &gt;:3
                    </div>
                </div>

                {variant === 'safe' && (
                    <div>
                        <p>the safe variant gives you comfy compliments once it finished counting down :3</p>
                        <Image className={'p-1 rounded-lg'} src={safe1} alt={'Window of Astolfo coming for you, with a countdown of kilometers'} />
                        <Image className={'p-1 rounded-lg'} src={safe2} alt={'Astolfo gives you lots of compliments'} />
                        <iframe
                            width="400"
                            height="225"
                            src="https://www.youtube-nocookie.com/embed/HkuCNFGXMNU?si=lDmf3C1Cf65gE5bL"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <br />
                    </div>
                )}

                {variant === 'evil' && (
                    <div>
                        <p>the evil variant turns off your computer once it finished &gt;:3</p>
                        <Image className={'p-1 rounded-lg'} src={evil1} alt={'Window of angry Astolfo coming for you, with a countdown of kilometers'} />
                        <Image className={'p-1 rounded-lg'} src={evil2} alt={'Astolfo shuts down your machine in anger'} />
                        <iframe
                            width="400"
                            height="225"
                            src="https://www.youtube-nocookie.com/embed/ZtN1QqLx3ww?si=VaVwXDUo505gF9TS"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <br />
                    </div>
                )}

                <Link href={'https://github.com/LunyaPet/AstolfoIsComingForYou/releases'}>
                    <Button fullWidth>download latest :3</Button>
                </Link>

                <br />
                <Offset amt={2} />
                <Footer visits={props.visits} route={'/project/astolfoiscomingforyou'} />
            </Content>
        </Main>
    );
}
