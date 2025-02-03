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

import { motion } from "motion/react";
import Link from "next/link";

export type PubInfo =
  | "This service is publicly available for public use."
  | "This service is limited to Luna's friends and people who she trusts."
  | "This service is limited to Luna's friend circle only."
  | "This service is for mldchan's personal use only.";

export default function Service(props: {
  svcName: string;
  svcDesc: string;
  pubInfo: PubInfo;
  links?: string[];
}) {
  return (
    <div className={"bg-[#222] p-2 rounded-lg drop-shadow-md my-4"}>
      <h1 className={"text-xl font-bold"}>{props.svcName}</h1>
      <p>{props.svcDesc}</p>
      <h2 className={"text-lg font-bold"}>Can I use this service?</h2>
      <p>{props.pubInfo}</p>
      {props.links &&
        props.links.map((link, index) => {
          return (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={"w-max"}
            >
              <Link
                href={link}
                key={index}
                className={"text-pink-400 hover:text-pink-200 block"}
              >
                {link}
              </Link>
            </motion.div>
          );
        })}
    </div>
  );
}
