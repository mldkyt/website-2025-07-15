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

import Head from "next/head";

export default function Metadata(props: {
  title: string;
  description: string;
}) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{`${props.title} | Lunya's website :3`}</title>
      <meta name="description" content={props.description} />
      <meta name="author" content="Lunya :3" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="content-language" content="en" />
      <meta
        property="og:title"
        content={`${props.title} | Lunya's website :3`}
      />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mldchan.dev" />
      <meta property="og:site_name" content="Lunya's website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ja_JP" />
      <meta
        name="twitter:title"
        content={`${props.title} | Lunya's website :3`}
      />
      <meta name="twitter:description" content={props.description} />
      <meta name="theme-color" content="#ff77ff" />
    </Head>
  );
}
