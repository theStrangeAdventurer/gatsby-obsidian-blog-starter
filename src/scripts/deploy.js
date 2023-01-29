require('dotenv').config();
const { execSync } = require('child_process');

const deploy = () => {
    const command = `scp -C -o "BatchMode yes" -r public/* ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}`;
    const result = execSync(command, { stdio: 'inherit', encoding: 'utf8' });
    console.log(result);
}

deploy();

 