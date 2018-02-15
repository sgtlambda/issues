#!/usr/bin/env node
'use strict';

const execa = require('execa');
const opn   = require('opn');

const sites = [
    {
        pattern: /git@bitbucket\.org(?::|\/)(.*)\.git/,
        url:     matches => `https://bitbucket.org/${matches[1]}/issues?status=new&status=open`,
    },
    {
        pattern: /(?:git@|https?:\/\/)github\.com(?::|\/)(.*)\.git/,
        url:     matches => `https://github.com/${matches[1]}/issues`,
    },
];

const getIssuesUrl = origin => {

    for (const {pattern, url} of sites) {
        const matches = pattern.exec(origin);
        if (!matches) continue;
        return url(matches);
    }

    return null;
};

const main = async () => {

    let origin;

    try {
        ({stdout: origin} = await execa.shell('git remote get-url origin'));
    } catch (e) {
        process.stderr.write(e.stderr);
        process.exit(e.code);
    }

    const url = getIssuesUrl(origin);

    if (!url) throw new Error(`${origin}: not a github or bitbucket repository`);
    opn(url, {wait: false});
};

if (require.main === module) {
    main();
}

module.exports              = main;
module.exports.getIssuesUrl = getIssuesUrl;