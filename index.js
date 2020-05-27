const github = require('@actions/github');
const core = require('@actions/core');

function getEnvironment() {
    const ref = github.context.ref;
    console.log('Ref is: ', ref);

    if (ref.startsWith('refs/heads/master')) {
        return 'prod';
    }
    if (ref.startsWith('refs/heads/release') || ref.startsWith('refs/heads/hotfix')) {
        return 'beta';
    }

    if (ref.startsWith('refs/heads/develop')) {
        return 'dev';
    }

    core.setFailed('Branch is not supported');
}

try {
    console.log('Setting environment...');
    const environment = getEnvironment();
    console.log('Result: ', environment);
    core.setOutput('environment', environment);
} catch (e) {
    core.setFailed(e.message);
}
