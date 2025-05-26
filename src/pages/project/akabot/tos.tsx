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

import Main from "@/components/Generic/Main";
import {Header} from "@/components/Generic/Header";
import Content from "@/components/Generic/Content";
import Heading from "@/components/Generic/Heading";
import Offset from "@/components/Generic/Offset";
import Metadata from "@/components/Generic/Metadata";
import Footer from "@/components/Generic/Footer";
import {InferGetServerSidePropsType} from "next";
import {getVisits} from "@/backend/visitsCounter";

const ToSHeading = (props: { children: string }) => {
    return (
        <h2 className={'text-xl font-bold my-4'}>{props.children}</h2>
    )
}

export async function getServerSideProps() {
    const visits = await getVisits({route: '/project/akabot/tos'});

    return {
        props: {
            visits
        }
    }
}

export default function TermsOfService(props: InferGetServerSidePropsType<typeof getServerSideProps>) {

    return (
        <Main>
            <Metadata title={'Akabot Terms of Service'} description={'Akabot Discord bot terms of service'}/>
            <Header highlight={'projects'}/>
            <Content>
                <Heading level={1}>Akabot Terms of Service</Heading>
                <p className="py-2">Last updated: 2024/05/16</p>

                <p className="py-2">By using the Akabot Discord bot, you agree to the following terms and conditions:</p>
                <ToSHeading>Usage Restrictions</ToSHeading>
                <p className="py-2">
                    Akabot is intended for use in family-friendly, all-ages Discord servers. You agree not to use Akabot
                    in any
                    NSFW (Not Safe For Work) channels, servers, or areas. Akabot is not designed or permitted for use in
                    adult-oriented or explicit content environments.
                </p>
                <ToSHeading>Compliance with Discord Terms</ToSHeading>
                <p className="py-2">
                    Your use of Akabot must comply with the Discord Terms of Service and Community Guidelines. You are
                    responsible for ensuring that your server and user activities adhere to Discord&apos;s policies. Akabot
                    will not
                    be used to
                    violate Discord&apos;s rules or enable others to do so.
                </p>
                <ToSHeading>No User Data Collection</ToSHeading>
                <p className="py-2">Akabot does not collect, store, or share any personal user data. Your interactions with the bot are
                    completely private, and we do not have access to any of your Discord information or content.</p>
                <ToSHeading>Modifications to Terms</ToSHeading>
                <p className="py-2">
                    We may update these Terms of Service from time to time. It is your responsibility to review the
                    current
                    terms each time before using Akabot. Continued use of the bot after any changes indicates your
                    acceptance of
                    the
                    revised terms.
                </p>
                <ToSHeading>Termination of Access</ToSHeading>
                <p className="py-2">We reserve the right to suspend or terminate your access to Akabot at any time for any reason,
                    including if
                    we reasonably believe you have violated these terms or Discord&apos;s policies.</p>
                <ToSHeading>Limitation of Liability</ToSHeading>
                <p className="py-2">Akabot is provided &quot;as is&quot; without warranties. We are not liable for any issues, damages, or
                    disruptions
                    caused by the bot&apos;s use or malfunction. Your use of Akabot is at your own risk.</p>
                <ToSHeading>Contact Us</ToSHeading>
                <p className="py-2">If you have any questions or concerns about these Terms of Service, please contact us at <a
                    href="mailto:mldkyt@proton.me">mldkyt@proton.me</a>.</p>
                <p className="py-2">By using Akabot, you agree to these terms and conditions. If you do not agree, please refrain from
                    using the
                    bot.</p>
                <Offset amt={3}/>
                <Footer visits={props.visits} route={'/project/akabot/tos'}
                        />
            </Content>
        </Main>
    )
}