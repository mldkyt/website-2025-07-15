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

import postgres from "postgres";

export default async function () {
    const sql = postgres({});

    await sql`create table if not exists visits
              (
                  route text primary key,
                  count integer not null default 0
              )`;

    await sql`create table if not exists blogPosts
              (
                  id          serial primary key,
                  handle      text    not null unique,
                  title       text    not null,
                  description text    not null,
                  created     timestamp        default now(),
                  updated     timestamp        default now(),
                  targetURL   text    not null,
                  views       integer not null default 0
              );`;

    await sql`create table if not exists polls
              (
                  id     serial primary key,
                  handle text not null unique,
                  title  text not null
              )`;

    await sql`create table if not exists polloptions
              (
                  id     serial primary key,
                  pollID integer not null,
                  option text    not null,
                  foreign key (pollID) references polls (id)
              )`;

    await sql`create table if not exists pollvotes
              (
                  id       serial primary key,
                  pollID   integer not null,
                  optionID integer not null,
                  ip       text    not null,
                  foreign key (pollID) references polls (id),
                  foreign key (optionID) references pollOptions (id)
              )`;

    await sql`create table if not exists guestbook
              (
                  id       serial
                      constraint guestbook_pk
                          primary key,
                  username text              not null,
                  body     text              not null,
                  ip       text              not null,
                  approved integer default 0 not null,
                  replyto  integer
                      constraint guestbook_guestbook_id_fk
                          references guestbook
                          on update cascade on delete cascade
              );`;

    await sql`create table if not exists guestbookbans
              (
                  id serial
                      constraint guestbookbans_pk
                          primary key,
                  ip text not null
              );`;

    await sql`create table if not exists ytvideos
              (
                  video        text
                      constraint ytvideos_pk
                          primary key,
                  title        text      not null,
                  description  text      not null,
                  views        integer   not null,
                  published_at timestamp not null,
                  thumb_url    text      not null
              );`

    await sql.end();
}
