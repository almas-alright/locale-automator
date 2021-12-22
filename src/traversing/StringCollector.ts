import fs from 'fs';
import es from 'event-stream';
import path from 'path';
import { localeCsvPath, config, saveJson} from "../init/commons"
import { FileCollector } from './FileCollector';

export class StringCollector{
    
    private fc =  new FileCollector();
    private configs = config();
    private async readEach(fliePath:any){
        let fp1 = path.join(this.configs.source_dir, fliePath);
            fp1 = path.resolve(fp1);
        let lineNr = 0;
        const message = fs.createWriteStream(localeCsvPath, { 'flags': 'a', 'encoding': 'utf8'});
        let fileStream = await fs.createReadStream(fp1).pipe(es.split())
        let linesInFile = await fileStream.pipe(es.mapSync((line: any) =>{
            fileStream.pause();
            if(line.includes("i18n.t")){
                message.write(line.trim().match(/\(([^)]+)\)/)[1]+",\n")
                lineNr += 1;
            }
            fileStream.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', () =>{
            message.close();
            console.log(lineNr+' string found in '+fliePath)
        }));
        
    }

    public async checkFiles(){
        let files = await this.fc.getChangedFiles();
        files.forEach(element => {
            if(element.status == "MODIFIED")
                this.readEach(element.file)
        });
    }

}