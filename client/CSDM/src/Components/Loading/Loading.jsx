import React from 'react'
import { View, Text, Modal } from 'react-native'
import Lottie from 'lottie-react-native';
import noData from './data.json'
import { BLACK, HEIGHT, WIDTH } from '../../Utils/constant';

const Loading = () => {
    return (
        <Modal animationType="slide" transparent={true} style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
            <View style={{
                opacity: 0.5,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
                <Lottie
                    source={noData}
                    autoPlay={true}
                    style={{ color: 'black', width: 100, height: 100 }}
                />
            </View>
        </Modal>

    )
}

export default Loading