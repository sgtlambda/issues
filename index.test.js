const {getIssuesUrl} = require('./');

const testResolve = (remote, contains) => {
    const url = getIssuesUrl(remote);
    expect(typeof url).toBe('string');
    expect(url).toEqual(expect.stringContaining(contains));
}

test('resolves the issues URL related to the cwd', () => {

    testResolve('ssh://git@bitbucket.org/launchdeckio/controlpanel.git', 'launchdeckio/controlpanel');
    testResolve('https://github.com/jmversteeg/johnnycache.git', 'jmversteeg/johnnycache');
});