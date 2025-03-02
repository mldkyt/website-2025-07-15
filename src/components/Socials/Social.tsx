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

import React from "react";

import { motion } from "motion/react";
import Link from "next/link";

export default function Social(props: {
  social: string;
  socialDescription: string;
  followAction: "follow" | "subscribe to" | "view";
  preSocial?: string;
  link: string;
}) {
  return (
    <Link href={props.link}>
      <motion.div
        className={"w-full p-2 bg-[#222] rounded-lg my-4"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1 className={"text-center font-bold text-2xl py-2"}>
          {props.social}: {props.socialDescription}
        </h1>
        <p className={"text-center"}>
          mldchan is active on {props.preSocial} {props.social}.{" "}
          {props.followAction !== "view"
            ? `Click on this card to ${props.followAction} them there!`
            : `View their profile there!`}
        </p>
      </motion.div>
    </Link>
  );
}
