import fetch from 'node-fetch';
import { promises as fsPromises } from 'fs';
import { join } from 'path';

const {stat, writeFile, readFile} = fsPromises;

const ADVENT_URL = 'https://adventofcode.com/2021/day/{day}/input';
const SESSION_CODE = process.env.AOC_SESSION_CODE || false;

if(!SESSION_CODE) {
    console.log(`Couldn't find AOC_SESSION_CODE env, you can retrieve this from your session=<code> cookie on adventofcode.com after logging in.`);
    process.exit(0);
}

const currentDay = (new Date()).getDate();
const days = Array.from({ length: currentDay }, (_, i) => i + 1);

async function saveInput(day: number, path: string) : Promise<any> {
    const request = await fetch(ADVENT_URL.replace('{day}', day.toString()), {
        headers: {
            Cookie: `session=${SESSION_CODE}`
        }
    });
    const input = await request.text();
    await writeFile(path, input.toString());
}

async function main() {
    for(const day of days) {
        const inputFile = join(__dirname, '../inputs/', `${day}.txt`);
        try {
            await stat(inputFile);
        } catch(e) {
            await saveInput(day, inputFile);
        }
        try {
            const runner = require(`./days/${day}`);
            const input = await readFile(inputFile, 'utf8');
            console.log(`Day ${day}`);
            await runner.run(input);
        } catch(e) {
            if(e.code === 'MODULE_NOT_FOUND') {
                console.error(`Module not found for day ${day}`);
            } else {
                console.error(e);
            }
        }
    }
}

main().catch(console.error);