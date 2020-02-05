import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Surface, Snackbar, Avatar, Caption } from 'react-native-paper';
import { TitleSmall, HeaderGroup, Box, BarConnector, StatusBall } from '../../components/util.component'

const { width, height } = Dimensions.get('window');
const SPACE = 20
const dummy = [
    {
        title: 'Keberangkatan Project',
    },
    {
        title: 'Kepulangan Project',
    },
]

export const TeamStatusScreen = (props) => (
    <View style={styles.container}>

        {dummy.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => props.navigation.push('DetailTeam')}
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginHorizontal: 40, marginVertical: 5,
                    padding: 10, elevation: 4, borderRadius: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Keberangkatan Project</Text>
                    {props.date && <Caption>20/13/2019</Caption>}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <StatusBall backgroundColor='seagreen' />
                    <Text style={{ color: 'seagreen' }}>Approved</Text>
                </View>
            </TouchableOpacity>
        ))}

        {/* delete */}
        <TouchableOpacity
            onPress={() => props.navigation.push('DetailTeam')}
            style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginHorizontal: 40, marginVertical: 5,
                padding: 10, elevation: 4, borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>Day 1</Text>
                <Caption>20/13/2019</Caption>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <StatusBall backgroundColor='seagreen' />
                <Text style={{ color: 'seagreen' }}>Approved</Text>
            </View>
        </TouchableOpacity>

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SPACE,
    },
    text: {
        textAlign: 'center',
    },
});
