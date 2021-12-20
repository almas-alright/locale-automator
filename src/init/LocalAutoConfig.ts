
import readlineSync from 'readline-sync';
import path from "path";
import fs from "fs";

export class LocalAutoConfig{
    private confJsonPath = path.join(__dirname, '../')+"locale_auto.json";
    private sources = ["Frontend", "Backend", "iOS", "Android"];
    

    public init() {
        let configs = {
            source: 0,
            source_dir: "",
            output_dir: ""
        };
        configs.source = readlineSync.keyInSelect(this.sources, 'select Source : ');
        configs.source_dir = readlineSync.questionPath('Source Driectory : ');
        configs.output_dir = readlineSync.questionPath('Output Driectory : ');
        this.saveInit(configs)
    }

    private saveInit(configs: any){
        if(configs.source !== -1){
            fs.writeFile(this.confJsonPath, JSON.stringify(configs), (err) => {
                if (err) {
                    console.log(err);
                } else{
                    console.log(this.confJsonPath)
                }
                this.saveJson([])
            });
            console.log(`config saved`);
        } else {
            console.log(`not saved ... you did not select any source`);
        }
        
    }

    public getConfig(){
        if(!fs.existsSync(this.confJsonPath)){
            console.log(`config not found`);
            process.exit(1)  
        } 
        let conf = fs.readFileSync(this.confJsonPath,'utf8')
            return JSON.parse(conf);
    }

    public saveJson(data:any){
        let output_file = path.join(__dirname, '../')+"locale_strings.json";//path.join(configs.output_dir, '/locale_strings.json')
        fs.writeFile(output_file, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            } 
        });
    }
}