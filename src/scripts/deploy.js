require('dotenv').config();
const { execSync } = require('child_process');

const deploy = () => {
    const command = `rsync --no-o --no-g --omit-dir-times -a -P  -e ssh public/ ${process.env.DEPLOY_USER}@${process.env.DEPLOY_HOST}:${process.env.DEPLOY_PATH}`;
    const result = execSync(command, { stdio: 'inherit', encoding: 'utf8' });
}

deploy();

 