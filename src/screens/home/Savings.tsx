import { Button, FlatList, View, Text, TextInput } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { ISaving } from '../../models';
import { SavingsList } from '../../data';
import styles from './SavingsStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Savings: FunctionComponent<{}> = () => {

    const [savingsLst, setSavingLst] = useState<ISaving[]>(SavingsList);
    const [text, setText] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const deleteSavingItem: (idSaving: number) => void = (idSaving: number) => {
        setSavingLst((prevList: ISaving[]) => prevList.filter((saving) => saving.id !== idSaving));
    }

    const addSavingItem: (text: string, amount: string) => void = (text: string, amount: string) => {
        if (text !== '' && amount !== '') {
            let idItem: number = savingsLst.length === 0 ? 1 : savingsLst.length + 1;
            setSavingLst((prevList: ISaving[]) => [...prevList, { id: idItem, text: text, amount: amount }]);
            setErrorMessage(null);
            setText('');
            setAmount('');
        } else {
            setErrorMessage('Los campos son obligatorios');
        }

    }

    const renderListData: (saving: ISaving) => JSX.Element = (saving: ISaving) => {
        return (
            <View style={styles.list}>
                <Icon name='attach-money' size={30} color='#0d910b' />
                <Text style={styles.textList}>{saving.text}</Text>
                <Text style={styles.textList}>$ {saving.amount}</Text>
                <Button title='Eliminar' color='#ff3d50' onPress={() => deleteSavingItem(saving.id)} />
            </View>
        )
    }

    const onChangeText: (text: string) => void = (text: string) => setText(text);
    const onChangeAmount: (amount: string) => void = (amount: string) => setAmount(amount);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>App de Ahorros</Text>
            <View style={styles.containerInput}>
                <TextInput
                    placeholder='Ingrese descripción de ahorro'
                    placeholderTextColor='gray'
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <TextInput
                    placeholder='Ingrese monto de ahorro'
                    placeholderTextColor='gray'
                    style={[styles.input, styles.marginBottom20]}
                    onChangeText={onChangeAmount}
                    value={amount}
                />
                { !!errorMessage && <Text style={styles.error}>{ errorMessage }</Text>}
                <Button
                    title='Agregar'
                    color='#73c257'
                    onPress={() => addSavingItem(text, amount)}
                />
            </View>
            <FlatList
                data={savingsLst}
                renderItem={({ item }) => renderListData(item)}
                keyExtractor={ (item) => item.text }
            />
        </View>
    )
}

export default Savings;