import fs from 'fs';
import es from 'event-stream';
import path from 'path';
import { localeJsonPath, config, saveJson} from "../init/commons"
import { FileCollector } from './FileCollector';

export class StringCollector{
    
    private fc =  new FileCollector();

    private async readEach(fliePath:any){
        let configs = config();
        let data = await fs.readFileSync(localeJsonPath,'utf8')
        let lines: String[] = JSON.parse(data);
        let fp1 = path.join(configs.source_dir, fliePath);
            fp1 = path.resolve(fp1);
        let lineNr = 0;

        let fileStream = await fs.createReadStream(fp1).pipe(es.split())
        let linesInFile = await fileStream.pipe(es.mapSync((line: any) =>{
            fileStream.pause();
            if(line.includes("i18n.t")){
                lines.push(line.trim().match(/\(([^)]+)\)/)[1]);
                lineNr += 1;
            }
            fileStream.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', () =>{
            saveJson(lines, localeJsonPath)
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