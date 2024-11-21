import {Sequelize} from "sequelize-typescript"
import config from "../../config";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const sequelize = new Sequelize({
    ...config.getDataBaseConfig(),
    dialect: "mysql",
    models: [__dirname + "/models"],
});

export default sequelize;