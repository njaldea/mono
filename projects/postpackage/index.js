#!/usr/bin/env node

import { existsSync } from "fs";
import { readFile, writeFile, cp } from "fs/promises";

const dest = process.argv[2] ?? "./dist";

existsSync("LICENSE") && cp("LICENSE", `${dest}/LICENSE`);
existsSync("README.md") && cp("README.md", `${dest}/README.md`);
existsSync(".npmignore") && cp(".npmignore", `${dest}/.npmignore`);

const p = JSON.parse(await readFile("./package.json", "utf-8"));
delete p.publishConfig;
delete p.devDependencies;
delete p.scripts;

await writeFile(`${dest}/package.json`, JSON.stringify(p, null, 4));
