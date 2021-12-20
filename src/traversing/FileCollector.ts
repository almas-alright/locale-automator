import fs from "fs";
import { LocalAutoConfig } from "../init/LocalAutoConfig";

export class FileCollector{
    private files = [];
    private lac = new LocalAutoConfig();

    public getFiles(){
        let configs = this.lac.getConfig();
        console.log(configs.source_dir)
        let f = [];
        f  = fs.readdirSync(configs.source_dir, { withFileTypes: true }).map(dirent => dirent.name);
        console.log(f[3])
    }

}