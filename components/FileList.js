import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import React, { Component } from 'react';

export default class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directoryListing: null,
        }
    }

    async componentDidMount() {
        this.grabListing(this.props.directoryUri);
    }

    async componentDidUpdate() {
        this.grabListing(this.props.directoryUri);
    }

    grabListing = async (uri) => {
        const listing = await FileSystem.readDirectoryAsync(uri);
        this.setDirectoryListing(listing);
    }

    setDirectoryListing = (listing) => {
        this.setState({
            directoryListing: listing,
        })
    }

    async deleteFile(name, key) {
        Alert.alert(name + " - " + key);
        const f2del = await
        FileSystem.deleteAsync(FileSystem.documentDirectory + name);
    }

    async showFile(name, key) {
        try {
            const stringFromFile = await
            FileSystem.readAsStringAsync(FileSystem.documentDirectory + name);
            Alert.alert("Read: " + stringFromFile);
        } catch (error) {
            Alert.alert("Read error");
        }
    }

    render() {
        if (!this.state.directoryListing) {
            return (
                <Text>There are no files here!</Text>
            );
        } else {
            return (
                <ScrollView style={styles.fileList}>
                    {
                        this.state.directoryListing.map(
                            (name, key) => (
                                <Pressable
                                    key={key}
                                    onPress={() => {this.showFile(name, key)}}
                                    onLongPress={() => {this.deleteFile(name, key)}}
                                >
                                    <Text key={key} style={styles.textyText}>{ name }</Text>
                                </Pressable>
                            )
                        )
                    }
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      },
      fileList: {
        width: '90%',
      },
      textyText: {
        fontSize: 15,
        lineHeight: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
      },
  })
  