
import readlineSync from 'readline-sync';
import { initJsonPath, localeJsonPath, saveJson, sources} from "./commons"

export class LocalAutoConfig{
    
    public init() {
        let configs = {
            source: 0,
            source_dir: "",
            search: ""
        };
        configs.source = readlineSync.keyInSelect(sources, 'select Source : ');
        configs.source_dir = readlineSync.questionPath('Source Driectory : ');
        this.saveInit(configs)
    }

    private saveInit(configs: any){
        if(configs.source !== -1){
            saveJson(configs,initJsonPath)
            saveJson([],localeJsonPath)
            console.log(`config saved`);
        } else {
            console.log(`not saved ... you did not select any source`);
        }
        
    }

}