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

import { useState } from "react";
import Heading from "@/components/Generic/Heading";
import Button from "@/components/Generic/Button";
import { generateCatgirl } from "@/components/CatgirlNonsense/script";

export default function Generator() {
       const [amount, setAmount] = useState(1);
       const [uwu, setUwu] = useState(true);
       const [owo, setOwo] = useState(true);
       const [nya, setNya] = useState(true);
       const [blush, setBlush] = useState(true);
       const [colon3, setColon3] = useState(true);
       const [actions, setActions] = useState(true);
       const [keysmash, setKeysmash] = useState(true);
       const [screaming, setScreaming] = useState(true);
       const [scrunkly, setScrunkly] = useState(true);
       const [nonsense, setNonsense] = useState(true);
       const [araAra, setAraAra] = useState(true);

       const [output, setOutput] = useState('');

       const submit = () => {
              const catgirl = generateCatgirl(amount, {
                     uwu,
                     owo,
                     nya,
                     blush,
                     three: colon3,
                     actions,
                     keysmashing: keysmash,
                     screaming,
                     scrunkly,
                     nonsense,
                     ara: araAra
              });

              setOutput(catgirl);
       }

       return (
              <div>
                     <div className={'bg-[#222] rounded-lg p-2 drop-shadow-md'}>
                            <Heading level={2}>Settings</Heading>
                            <label>Amount</label>
                            <input type={'number'} value={amount} onChange={e => setAmount(parseInt(e.target.value))}
                                   className={'bg-[#333] p-1 rounded-lg ml-2'} />
                            <br />
                            
                            <div className="flex flex-row flex-wrap gap-2">
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={uwu}
                                                 onChange={() => setUwu(!uwu)} />
                                          <label className={'ml-2'}>UwU</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={owo}
                                                 onChange={() => setOwo(!owo)} />
                                          <label className={'ml-2'}>OwO</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={nya}
                                                 onChange={() => setNya(!nya)} />
                                          <label className={'ml-2'}>Nya</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={blush}
                                                 onChange={() => setBlush(!blush)} />
                                          <label className={'ml-2'}>Blush</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={colon3}
                                                 onChange={() => setColon3(!colon3)} />
                                          <label className={'ml-2'}>:3</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={actions}
                                                 onChange={() => setActions(!actions)} />
                                          <label className={'ml-2'}>Actions</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={keysmash}
                                                 onChange={() => setKeysmash(!keysmash)} />
                                          <label className={'ml-2'}>Keysmash</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={screaming}
                                                 onChange={() => setScreaming(!screaming)} />
                                          <label className={'ml-2'}>Screaming</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={scrunkly}
                                                 onChange={() => setScrunkly(!scrunkly)} />
                                          <label className={'ml-2'}>Scrunkly</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={nonsense}
                                                 onChange={() => setNonsense(!nonsense)} />
                                          <label className={'ml-2'}>Nonsense</label>
                                   </div>
                                   <div>
                                          <input type={'checkbox'} className={'accent-pink-400 hover:accent-pink-200'} checked={araAra}
                                                 onChange={() => setAraAra(!araAra)} />
                                          <label className={'ml-2'}>Ara Ara</label>
                                   </div>
                            </div>

                            <br />
                            <Button onClick={submit} fullWidth>Generate</Button>
                     </div>

                     <div className={'mt-4 bg-[#222] rounded-lg drop-shadow-md p-2'}>
                            <Heading level={2}>Generated output</Heading>

                            <p>{output}</p>
                     </div>
              </div>
       )
}