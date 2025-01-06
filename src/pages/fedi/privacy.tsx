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

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {countVisit, getVisits} from "@/backend/visitsCounter";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    await countVisit({route: '/fedi/privacy'});
    const visits = await getVisits({route: '/fedi/privacy'});

    return {
        props: {
            visits
        }
    }
}

export default function Privacy(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main>
        <Metadata title={'Fedi Privacy Policy'} description={'Learn about the privacy policy of mldchan Social.'}/>
        <Header/>
        <Content>
            <Offset amt={4}/>
            <Heading level={1}>Fedi Privacy Policy</Heading>
            <p><em>Last Updated: December 17, 2024</em></p>

            <Heading level={2}>Introduction</Heading>
            <p>Welcome to mldchan Social, a Sharkey instance primarily intended for mldchan and her friends. This
                privacy policy outlines how we handle and protect your personal information.</p>

            <Heading level={2}>Data Collection and Storage</Heading>
            <p>We collect and store only the necessary information to provide our social platform services:</p>
            <ul className={'ml-4 list-disc'}>
                <li>IP Address</li>
                <li>Username</li>
                <li>User-provided profile information (bio, profile picture, banner)</li>
                <li>User-generated content</li>
            </ul>

            <Heading level={2}>Data Usage</Heading>
            <p>All collected data is used solely for the operation of mldchan Social. We do not:</p>
            <ul className={'ml-4 list-disc'}>
                <li>Share data with third parties</li>
                <li>Use data for marketing purposes</li>
                <li>Sell or rent user information</li>
            </ul>

            <Heading level={2}>Data Export</Heading>
            <p>Users can request an export of their personal data at any time.</p>

            <Heading level={2}>Important Precautions</Heading>
            <ul className={'ml-4 list-disc'}>
                <li>As a decentralized platform, data deletion may not be guaranteed across all servers.</li>
                <li>Private posts are not guaranteed to remain completely private.</li>
                <li>The platform's "Drive" feature is not secure cloud storage.</li>
            </ul>

            <div>
                <Heading level={2}>Contact Information</Heading>
                <p>For privacy-related inquiries, please contact: <a href="mailto:mldkyt@proton.me">mldkyt@proton.me</a>
                </p>
            </div>


            <p><small>Parts of this page were AI generated. The content has been checked by an actual person.</small>
            </p>
            <Offset amt={4}/>
            <Footer visits={props.visits}/>
        </Content>
    </Main>
}
