
import { types } from "mobx-state-tree"

export default types.model({
	access_token: '',
	organization_id: '',
	workspace_id: '',
	list_id: '',
}).actions(self => ({
	update(key, value) {
		self[key] = value;
	}
}));