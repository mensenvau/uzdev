#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fs_extra = require('fs-extra');

const { execSync } = require('child_process');

(async () => {

    try {
        const command = process.argv[2];

        if (command == 'create') {
            fs_extra.copy(path.join(__dirname, "../example"), path.join(process.cwd(), process.argv[3]))
                .then(() => console.log('\x1b[32m%s\x1b[0m', 'Folder copied successfully!\n\n', 'Next steps: \nnpm i\n npm run start'))
                .catch(err => console.error('\x1b[31m%s\x1b[0m', 'Error copying folder:', err.message));
        }

        if (command == 'run') {
            // Read the devops.json file
            const devops = JSON.parse(fs.readFileSync('devops.json', 'utf-8'));
            const jobs = devops[command];

            if (!jobs) {
                console.error(`\x1b[31mError: Command "${command}" not found in devops.json\x1b[0m`);
                process.exit(1);
            }

            for (let i = 0; i < jobs.length; i++) {
                try {
                    console.log(`\x1b[34mRun job: ${jobs[i].name}\x1b[0m`);
                    execSync(jobs[i].command, { stdio: 'inherit' });
                    console.log(`\x1b[32mSuccess: Job "${jobs[i].name}" completed\x1b[0m`);
                } catch (err) {
                    console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
                    process.exit(1);
                }
            }
        }

    } catch (err) {
        console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
        process.exit(1);
    }
})();
