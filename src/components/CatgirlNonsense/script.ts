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

function uwu_nonsense(length: number) {
    const nonsense = ["aa", "am", "an", "ao", "eo", "ew", "me", "mr", "ny", "ow", "pp", "pu", "ra", "re", "rm", "rn", "ro", "rp", "rw", "ur", "wm", "wn", "wp", "wr", "ww", "ya"];

    let out = "";
    for (let x = 0; x <= length / 2; x++) {
        const rand = Math.floor(Math.random() * nonsense.length);
        out += nonsense[rand];
    }
    return out;
}

function uwu_nya(length: number) {
    return "ny" + "a".repeat(length);
}

function uwu_blush(length: number) {
    return ">" + "/".repeat(length) + "<";
}

function uwu_action(rand: number) {
    const actions = [
        "*tilts head*",
        "*twitches ears slightly*",
        "*purrs*",
        "*falls asleep*",
        "*sits on ur keyboard*",
        "*nuzzles*",
        "*stares at u*",
        "*points towards case of monster zero ultra*",
        "*sneezes*",
        "*plays with yarn*",
        "*eats all ur doritos*",
        "*lies down on a random surface*",
    ];

    if (rand === 12) {
        rand = 11;
    }
    return actions[rand];
}

function uwu_keysmash(length: number) {
    let out = "";
    for (let x = 0; x <= length; x++) {
        const randomAsciiValue = Math.floor(Math.random() * 26) + 65; // ASCII values for uppercase letters A-Z
        const randomLetter = String.fromCharCode(randomAsciiValue);
        out += randomLetter.toLowerCase();
    }
    return out;
}

function uwu_scrunkly(length: number) {
    return "aw " + uwu_keysmash(length - 3);
}

export function generateCatgirl(amount: number, options: {
    uwu: boolean,
    nonsense: boolean,
    nya: boolean,
    blush: boolean,
    three: boolean,
    actions: boolean,
    keysmashing: boolean,
    screaming: boolean,
    scrunkly: boolean,
    owo: boolean,
    ara: boolean
} = {
    uwu: true,
    nonsense: true,
    nya: true,
    blush: true,
    three: true,
    actions: true,
    keysmashing: true,
    screaming: true,
    scrunkly: true,
    owo: true,
    ara: true
}) {
    const actions = [
        "*tilts head*",
        "*twitches ears slightly*",
        "*purrs*",
        "*falls asleep*",
        "*sits on ur keyboard*",
        "*nuzzles*",
        "*stares at u*",
        "*points towards case of monster zero ultra*",
        "*sneezes*",
        "*plays with yarn*",
        "*eats all ur doritos*",
        "*lies down on a random surface*",
    ];

    let output = "";
    let looplimit = 0;
    let last = -1;
    const blockLength = 50; // Adjust this value as needed

    while (true) {
        const random = Math.floor(Math.random() * 12);

        // Don't repeat the same thing twice
        if (last === random) {
            continue;
        }

        if (random === 0 && options.uwu) {
            const str = "uwu";
            output += str;
        } else if (random === 1 && options.nonsense) {
            // nonsense
            const str = uwu_nonsense(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
            output += str;
        } else if (random === 2 && options.nya) {
            // nyaaa~
            const str = uwu_nya(Math.floor(Math.random() * (6 - 3 + 1)) + 3);
            output += str;
        } else if (random === 3 && options.blush) {
            // >///<
            const str = uwu_blush(Math.floor(Math.random() * (5 - 3 + 1)) + 3);
            output += str;
        } else if (random === 4 && options.three) {
            //
            const str = ":3";
            output += str;
        } else if (random === 5 && options.actions) {
            // Actions
            const str = uwu_action(Math.floor(Math.random() * actions.length));
            output += str;
        } else if (random === 6 && options.keysmashing) {
            // Keysmash
            const str = uwu_keysmash(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
            output += str;
        } else if (random === 7 && options.screaming) {
            // Screaming
            const str = "A".repeat(Math.floor(Math.random() * (5 - 3 + 1)) + 3);
            output += str;
        } else if (random === 8 && options.scrunkly) {
            // Aww the scrunkly
            const str = uwu_scrunkly(Math.floor(Math.random() * (25 - 5 + 1)) + 5);
            output += str;
        } else if (random === 9 && options.owo) {
            // owo
            output += "owo";
        } else if (random === 10 && options.ara) {
            // ara ara
            output += "ara ara~";
        }

        if (output.length > amount) {
            break;
        }

        output += " ";
        output = output.replace(/\s{2,}/g, " ");
        last = random;

        looplimit += 1;
        if (looplimit > 10000) {
            break;
        }
    }

    // Split the output into blocks
    const blocks = [];
    for (let i = 0; i < output.length; i += blockLength) {
        blocks.push(output.substr(i, blockLength));
    }

    return blocks.join(""); // Join blocks with spaces
}