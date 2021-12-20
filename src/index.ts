#!/usr/bin/env node

import { Command } from 'commander'
import { LocalAutoConfig } from "./init/LocalAutoConfig";
import { FileCollector } from './traversing/FileCollector';


const l_init = new LocalAutoConfig();
const fc = new FileCollector();

const program = new Command();
    program
    .command('init')
    .alias('i')
    .description('initialize config')
    .action(() => {
        l_init.init()
    });

    program.command('walk').action(() => { fc.getChangedFiles() });

    program.parse();
    const options = program.opts();

    //chmod u+x ./dist/index.js