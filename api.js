
const base = `https://api.getflow.com/v2`;

export async function loadLists(config) {
	const { access_token, organization_id, workspace_id } = config;

	const response = await fetch(`${base}/lists?organization_id=${organization_id}&workspace_id=${workspace_id}`, {
		method: 'get',
		headers: {
			'Accept': 'application/vnd.flow.v2+json',
			'Content-Type': 'application/vnd.flow.v2+json',
			'Authorization': `Bearer ${access_token}`,
		}
	});

	const data = await response.json();

	if (200 !== response.status || !data.lists || !data.lists.length) {
		return false;
	}

	// console.log(data.lists);

	return data.lists;
}