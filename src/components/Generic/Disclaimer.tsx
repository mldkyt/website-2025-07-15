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

export default function Disclaimer(props: { title: string, message: string }) {
    return (
        <div className={'border-2 border-red-600 rounded-xl bg-red-950 p-2'}>
            <h1 className={'text-3xl font-bold'}>{props.title}</h1>
            <p className={'text-lg'}>{props.message}</p>
        </div>
    );
}
