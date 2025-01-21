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

import Content from "@/components/Generic/Content";
import MainPageOtherElement from "@/components/MainPage/MainPageOtherElement";

export default function Page5Other() {
    return (
        <div className={'h-screen'}>
            <Content>
                <h1 className={'py-4 text-center text-2xl font-bold'}>What else does Emily do?</h1>

                <MainPageOtherElement title={'Self-Hosting'}
                                      description={'Emily self hosts a few services, including her own Sharkey instance and GitLab instance. Most of these self-hosted services are for personal use only, or are shared across friends.'}
                                      link={'/services'}/>
                <MainPageOtherElement title={'Video content creation'}
                                      description={'Emily creates videos on YouTube, Instagram and TikTok. Most active is YouTube. Her recent Celeste content has made her a lot of success.'}
                                      link={'https://youtube.com/@mldchan'}/>
                <MainPageOtherElement title={'Art'}
                                      description={'Emily rarely does art. One of her kawaii arts can be seen by looking at the website logo. Another one when you look at the logo of her Sharkey instance.'}
                                      link={'/art'}/>
            </Content>
        </div>
    )
}
