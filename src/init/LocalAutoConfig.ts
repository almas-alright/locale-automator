
import readlineSync from 'readline-sync';
import { initJsonPath, localeJsonPath, localeCsvPath, saveJson} from "./commons"

export class LocalAutoConfig{
    
    private sources = ["Frontend", "Backend", "iOS", "Android"];
    

    public init() {
        let configs = {
            source: 0,
            source_dir: "",
            output_dir: ""
        };
        configs.source = readlineSync.keyInSelect(this.sources, 'select Source : ');
        configs.source_dir = readlineSync.questionPath('Source Driectory : ');
        // configs.output_dir = readlineSync.questionPath('Output Driectory : ');
        this.saveInit(configs)
    }

    private saveInit(configs: any){
        if(configs.source !== -1){
            saveJson(configs,initJsonPath)
            saveJson([],localeCsvPath)
            console.log(`config saved`);
        } else {
            console.log(`not saved ... you did not select any source`);
        }
        
    }

}