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

export default function Page4MisskeyEmbed() {

    return <div className={'min-h-screen'}>
        <h1 className={'text-center text-2xl font-bold'}>Check out the latest posts by mldchan!</h1>
        <iframe src="https://social.mldchan.dev/embed/user-timeline/a0cj5mqxoz2e0001?maxHeight=0&border=false"
                data-misskey-embed-id="v1_61281eff-5d43-4a77-a1f8-984d5874324d" loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin" className={'max-h-[80vh] w-2/3 m-auto max-w-[500px]'}></iframe>
        <script defer src="https://social.mldchan.dev/embed.js"></script>
    </div>

}