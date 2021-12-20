import path from "path";
import fs from "fs";
import nodegit from 'nodegit'
import { LocalAutoConfig } from "../init/LocalAutoConfig";

export class FileCollector{

    private lac = new LocalAutoConfig();

    //not in use
    public getFiles(){
        let configs = this.lac.getConfig();
        console.log(configs.source_dir)
        let f = [];
        f  = fs.readdirSync(configs.source_dir, { withFileTypes: true }).map(dirent => dirent.name);
        console.log(f[3])
    }

    public async getChangedFiles(){
        let statuses: { file: string; status: string; }[] = [];
        let configs = this.lac.getConfig();
        let repoPath = path.resolve(configs.source_dir);
        let repository = nodegit.Repository.open(repoPath);
        //    if((await repository).isEmpty()){ process.exit(1) }
        let statusMixed =  await repository.then(function(repo) { return repo.getStatus() })
            statusMixed.forEach((file) => {
                statuses.push({"file" : file.path(), "status": this.statusToText(file)})
                // console.log(file.path() + " " + this.statusToText(file));
            });
            return statuses;
    }

    private statusToText(status:any) {
        var words = [];
        if (status.isNew()) { words.push("NEW"); }
        if (status.isModified()) { words.push("MODIFIED"); }
        if (status.isTypechange()) { words.push("TYPECHANGE"); }
        if (status.isRenamed()) { words.push("RENAMED"); }
        if (status.isIgnored()) { words.push("IGNORED"); }
        return words.join(" ");
      }


}