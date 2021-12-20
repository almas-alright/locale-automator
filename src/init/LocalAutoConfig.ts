
import readlineSync from 'readline-sync';
import path from "path";
import fs from "fs";

export class LocalAutoConfig{
    private confJsonPath = path.join(__dirname, '../')+"locale_auto.json";
    private sources = ["Frontend", "Backend", "iOS", "Android"];
    private configs = {
        source: 0,
        source_dir: "",
        output_dir: ""
    };

    public init() {

        this.configs.source = readlineSync.keyInSelect(this.sources, 'select Source : ');
        this.configs.source_dir = readlineSync.questionPath('Source Driectory : ');
        this.configs.output_dir = readlineSync.questionPath('Output Driectory : ');
        this.saveInit()
    }

    private saveInit(){
            fs.writeFile(this.confJsonPath, JSON.stringify(this.configs), (err) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log(this.confJsonPath)
                }
            });
        
        console.log(`options: ${JSON.stringify(this.configs)}`);
    }

    public getConfig(){
        if(fs.existsSync(this.confJsonPath)){
            let conf = fs.readFileSync(this.confJsonPath,'utf8')
            return JSON.parse(conf);
            // fs.readFile(this.confJsonPath, 'utf-8', (err, data) => {
            //     return data
            // });
        } else {
            return this.configs
        }
        
    }

    public hasConfig(){
        console.log('works');
    }
}