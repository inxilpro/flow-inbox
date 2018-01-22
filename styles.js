import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputGroup: {
		width: '100%',
		padding: 10,
	},
	inputLabel: {
		width: '100%',
		fontSize: 18,
		marginBottom: 5,
	},
	input: {
		width: '100%',
		fontSize: 18,
		borderColor: 'rgba(0, 0, 0, 0.25)',
		borderWidth: 1,
		marginBottom: 10,
		padding: 10,
		borderRadius: 4,
	},
});