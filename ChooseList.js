import React from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Svg } from 'expo';
import { observer } from "mobx-react";
import { flow } from './state';
import styles from './styles';

@observer
export default class ChooseList extends React.Component {
	render() {
		return (
			<SafeAreaView style={ styles.container }>
				<FlatList
					style={ { flex: 1 } }
					data={ flow.lists }
					keyExtractor={ list => list.id }
					renderItem={ ({ item }) => this.renderItem(item) }
				/>
			</SafeAreaView>
		);
	}

	renderItem({ id, name }) {
		return (
			<TouchableOpacity onPress={ () => this.props.onChoose(id) }>
				<Text style={ { fontSize: 18, paddingVertical: 10 } }>
					{ name }
				</Text>
			</TouchableOpacity>
		);
	}
}