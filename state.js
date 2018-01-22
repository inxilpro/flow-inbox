import { AsyncStorage } from 'react-native';
import { applySnapshot, onSnapshot, types } from "mobx-state-tree"

function sync(key, target) {
	AsyncStorage.getItem(`@mobx:${key}`).then(data => {
		if (data) {
			const snapshot = JSON.parse(data);
			console.log(`Restoring snapshot for '${key}'`, snapshot);
			applySnapshot(target, snapshot);
		}
	});
	onSnapshot(target, snapshot => {
		console.log(`Saving snapshot for '${key}'`, snapshot);
		AsyncStorage.setItem(`@mobx:${key}`, JSON.stringify(snapshot));
	});
}

const Config = types.model({
	access_token: '',
	organization_id: '',
	workspace_id: '',
	list_id: '',
}).actions(self => ({
	update(key, value) {
		self[key] = value;
	}
}));

export const config = Config.create({
	access_token: '',
	organization_id: '',
	workspace_id: '',
});

sync('config', config);

const List = types.model({
	"id": types.identifier(types.number),
	"name": types.string,
});

const Flow = types.model({
	'lists': types.array(List),
}).actions(self => ({
	replaceLists(data) {
		const lists = data.filter(listData => !listData.archived && !listData.deleted)
			.map(listData => List.create({
				id: listData.id,
				name: listData.name,
			}));
		self.lists.replace(lists);
	}
}));

export const flow = Flow.create({
	lists: [],
});

sync('flow', flow);