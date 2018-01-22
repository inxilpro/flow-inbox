import { types } from "mobx-state-tree"

export default types.model({
	"id": types.identifier(types.number),
	"name": types.string,
});