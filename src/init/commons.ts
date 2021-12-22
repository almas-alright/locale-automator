import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, '../');
export const initJsonPath = filePath+"locale_auto.json";
export const localeJsonPath = filePath+"locale_strings.json";
export const localeCsvPath = filePath+"locale_strings.csv";
export const sources = ["Frontend", "Backend", "iOS", "Android"];
export const config = () => {
    if(!fs.existsSync(initJsonPath)){
        console.log(`config not found`);
        process.exit(1)  
    }
    let search = "";
    let fromJson = fs.readFileSync(initJsonPath,'utf8')
    let configs = JSON.parse(fromJson);
        if(sources[configs.source] === "Frontend") { search = 'i18n.t(' }
        if(sources[configs.source] === "Backend") { search = 'i18n.t(' }
        if(sources[configs.source] === "iOS") { search = 'NSLocalizer(' }
        if(sources[configs.source] === "Android") { search = 'getString(R.string' }
        configs.search = search
    return configs;
};

export const saveJson = async (data:any, path:string) => {
    await fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
}

