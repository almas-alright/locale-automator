import fs from 'fs';
import es from 'event-stream';
import path from 'path';
import { LocalAutoConfig } from "../init/LocalAutoConfig";
import { FileCollector } from './FileCollector';

export class StringCollector{
    private lac = new LocalAutoConfig();
    private fc =  new FileCollector();

    private async readEach(fliePath:any){
        let configs = this.lac.getConfig();
        let fucking = path.join(__dirname, '../')+"locale_strings.json"
        // let data = await fs.readFileSync(path.join(configs.output_dir, '/locale_strings.json'),'utf8')
        let data = await fs.readFileSync(fucking,'utf8')
        let lines: String[] = JSON.parse(data);
        let fp1 = path.join(configs.source_dir, fliePath);
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
        .on('end', () =>{
            this.lac.saveJson(lines)
            console.log('Read entire file.')
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