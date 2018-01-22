import { types } from "mobx-state-tree"
import List from './List';

export default types.model({
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