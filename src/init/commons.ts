import fs from "fs";
import path from "path";

export const initJsonPath = path.join(__dirname, '../')+"locale_auto.json";
export const localeJsonPath = path.join(__dirname, '../')+"locale_strings.json";
export const localeCsvPath = path.join(__dirname, '../')+"locale_strings.csv";

export const config = () => {
    if(!fs.existsSync(initJsonPath)){
        console.log(`config not found`);
        process.exit(1)  
    } 
    let conf = fs.readFileSync(initJsonPath,'utf8')
        return JSON.parse(conf);
};

export const saveJson = async (data:any, path:string) => {
    await fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });
}

