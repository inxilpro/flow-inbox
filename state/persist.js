
export default function persist(key, target) {
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