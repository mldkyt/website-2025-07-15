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

import Content from "@/components/Generic/Content";
import Offset from "@/components/Generic/Offset";

export default function Page1() {
  return (
    <>
      <div className={"m-auto text-center z-10"}>
        <Offset amt={5} />
        <Content>
          <h1 className={"text-5xl font-bold text-green-500 xl:text-5xl"}>
            mldchan
          </h1>
          <br />
          <span className={"text-lg xl:text-xl"}>Developer.</span>
          <br />
          <br />
          <span className={"text-lg xl:text-xl"}>YouTuber.</span>
          <br />
          <br />
          <span className={"text-lg xl:text-xl"}>Mod Creator.</span>
        </Content>
      </div>
    </>
  );
}
