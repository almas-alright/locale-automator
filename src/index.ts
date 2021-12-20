#!/usr/bin/env node

import { Command } from 'commander'
import { LocalAutoConfig } from "./init/LocalAutoConfig";
import { FileCollector } from './traversing/FileCollector';
import { StringCollector } from './traversing/StringCollector';

const l_init = new LocalAutoConfig();
const fc = new FileCollector();
const sc = new StringCollector();

const program = new Command();
    program
    .command('init')
    .alias('i')
    .description('initialize config')
    .action(() => {
        l_init.init()
    });

    program.command('walk').action(() => { 
        // fc.getChangedFiles() 
        // sc.readEach();
        sc.checkFiles()
    });

    program.parse();
    const options = program.opts();

    //chmod u+x ./dist/index.js