import path from "path";
import fs from "fs";
import nodegit from 'nodegit'
import { config } from "../init/commons"

export class FileCollector{
    //not in use
    public getFiles(){
        let configs = config()
        console.log(configs.source_dir)
        let files = [];
        files  = fs.readdirSync(configs.source_dir, { withFileTypes: true }).map(dirent => dirent.name);
        console.log(files[3])
    }

    public async getChangedFiles(){
        let statuses: { file: string; status: string; }[] = [];
        let configs = config();
        let repoPath = path.resolve(configs.source_dir);
        let repository = nodegit.Repository.open(repoPath);
        //  we have to check git repository or not
        let statusMixed =  await repository.then(function(repo) { return repo.getStatus() })
            statusMixed.forEach((file) => {
                console.log(this.statusToText(file) + " - " + file.path());
                statuses.push({"file" : file.path(), "status": this.statusToText(file)})
            });
            console.log("-------------------------------------------------------------");
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