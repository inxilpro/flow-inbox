import React from 'react';
import { AppState, Text, View, SafeAreaView } from 'react-native';
import { Constants, Svg } from 'expo';
import { observer } from "mobx-react";
import * as state from './state';
import { loadLists } from './api';
import styles from './styles';
import Config from './Config';
import ChooseList from "./ChooseList";

@observer
export default class App extends React.Component {
	state = {
		appState: AppState.currentState,
		refreshing: false,
		loading: true,
	};

	render() {
		if (!state.flow.lists.length) {
			return <Config login={ ::this.login }/>;
		}

		if ('' === state.config.list_id) {
			return <ChooseList onChoose={::this.chooseList} />;
		}

		return (
			<SafeAreaView style={ styles.container }>
				<Svg width={30} height={30} viewBox="0 0 512 512" style={{ position: "absolute", right: 10, top: 40 }}>
					<Svg.Path fillOpacity={0.2} d="M444.788 291.1l42.616 24.599c4.867 2.809 7.126 8.618 5.459 13.985-11.07 35.642-29.97 67.842-54.689 94.586a12.016 12.016 0 0 1-14.832 2.254l-42.584-24.595a191.577 191.577 0 0 1-60.759 35.13v49.182a12.01 12.01 0 0 1-9.377 11.718c-34.956 7.85-72.499 8.256-109.219.007-5.49-1.233-9.403-6.096-9.403-11.723v-49.184a191.555 191.555 0 0 1-60.759-35.13l-42.584 24.595a12.016 12.016 0 0 1-14.832-2.254c-24.718-26.744-43.619-58.944-54.689-94.586-1.667-5.366.592-11.175 5.459-13.985L67.212 291.1a193.48 193.48 0 0 1 0-70.199l-42.616-24.599c-4.867-2.809-7.126-8.618-5.459-13.985 11.07-35.642 29.97-67.842 54.689-94.586a12.016 12.016 0 0 1 14.832-2.254l42.584 24.595a191.577 191.577 0 0 1 60.759-35.13V25.759a12.01 12.01 0 0 1 9.377-11.718c34.956-7.85 72.499-8.256 109.219-.007 5.49 1.233 9.403 6.096 9.403 11.723v49.184a191.555 191.555 0 0 1 60.759 35.13l42.584-24.595a12.016 12.016 0 0 1 14.832 2.254c24.718 26.744 43.619 58.944 54.689 94.586 1.667 5.366-.592 11.175-5.459 13.985L444.788 220.9a193.485 193.485 0 0 1 0 70.2zM336 256c0-44.112-35.888-80-80-80s-80 35.888-80 80 35.888 80 80 80 80-35.888 80-80z" />
				</Svg>
				<Text>{ this.state.loading ? 'loading' : 'done loading' }</Text>
				<Text>{ JSON.stringify(state.config, null, 4) }</Text>
			</SafeAreaView>
		);
	}

	componentDidMount() {
		AppState.addEventListener('change', ::this.onAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.onAppStateChange);
	}

	onAppStateChange(appState) {
		this.setState({ appState });
	}

	async login() {
		const lists = await loadLists(state.config);

		if (!lists) {
			alert('Unable to log in.');
			return;
		}

		state.flow.replaceLists(lists);
	}

	chooseList(list_id) {
		state.config.update('list_id', `${list_id}`);
	}
}