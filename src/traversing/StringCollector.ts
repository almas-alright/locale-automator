import fs from 'fs';
import es from 'event-stream';
import path from 'path';
import { LocalAutoConfig } from "../init/LocalAutoConfig";
import { FileCollector } from './FileCollector';

export class StringCollector{
    private lac = new LocalAutoConfig();

    public async readEach(){
        
        let lines: String[] = []
        let configs = this.lac.getConfig();
        let fp1 = path.join(configs.source_dir, 'src/constant/treatmentTemplates.ts');
            fp1 = path.resolve(fp1);
        let lineNr = 0;

        let fileStream = await fs.createReadStream(fp1).pipe(es.split())
        let linesInFile = await fileStream.pipe(es.mapSync((line: any) =>{
            fileStream.pause();
            lineNr += 1;
            if(line.includes("i18n.t")){
                lines.push(line.trim().match(/\(([^)]+)\)/)[1]);
            }
            fileStream.resume();
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log(lines)
            console.log('Read entire file.')
        }));
        
        
    }

}