import fs from "fs-extra";
export default defineEventHandler(async (event) => {
    const packageJson = await fs.readJson("./package.json");
    const version = packageJson.version;
    return { version };
});
