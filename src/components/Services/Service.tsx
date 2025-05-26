/*
 *     Lunya's Personal Website
 *     Copyright (C) 2024  Lunya UwU :3
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

import Link from "next/link";

export default function Service(props: {
  svcName: string;
  svcDesc: string;
  links?: { label: string, url: string }[];
}) {
  return (
    <div className={"bg-[#222] p-2 rounded-lg drop-shadow-md my-4"}>
      <h1 className={"font-bold"}>{props.svcName}</h1>
      <p>{props.svcDesc}</p>
      {props.links &&
        props.links.map((link, index) => {
          return (
            <div
              key={index}
              className={"w-max"}
            >
              <Link
                href={link.url}
                className={"text-pink-400 hover:text-pink-200 transition-all block"}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
