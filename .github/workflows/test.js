const owner = context.repo.owner;
const repo = context.repo.repo;

const response = await github.request('GET /repos/{owner}/{repo}/properties/values', {
    owner: owner,
    repo: repo
});
console.log(`Repository properties: ${response.data}`);
const distributedProperty = response.data.find(prop => prop.property_name === 'is_distributed');
const distributedValue = distributedProperty ? distributedProperty.value : 'true';
core.setOutput('is_distributed', distributedValue);

const repoDetails = await github.request('GET /repos/{owner}/{repo}', {
    owner: owner,
    repo: repo
});
const isPublic = repoDetails.data.private ? 'false' : 'true';
console.log(`Is this a public repo? ${isPublic}`);
core.setOutput('is_public', isPublic);
