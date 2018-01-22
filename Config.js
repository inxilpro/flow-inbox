import React from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import { observer } from "mobx-react";
import { config } from './state';
import styles from './styles';

@observer
export default class Config extends React.Component {
	render() {
		return (
			<SafeAreaView style={ styles.container }>
				{ this.input('Access Token', 'access_token') }
				{ this.input('Organization ID', 'organization_id') }
				{ this.input('Workspace ID', 'workspace_id') }

				<Button title={ `Log In` } onPress={ ::this.props.login }/>
			</SafeAreaView>
		);
	}

	input(title, key) {
		return (
			<View style={ styles.inputGroup }>
				<Text style={ styles.inputLabel }>
					{ title }
				</Text>
				<TextInput
					autoCorrect={ false }
					autoCapitalize="none"
					keyboardType="default"
					returnKeyType="done"
					style={ styles.input }
					onChangeText={ value => config.update(key, value) }
					value={ `${config[key]}` }
				/>
			</View>
		);
	}
}