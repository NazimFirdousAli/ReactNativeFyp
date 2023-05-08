import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { BLACK, WHITE } from "../Utils/constant";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/actions/authActions";
import { useNavigation } from "@react-navigation/native";
import { LOGIN } from "../Config/paths";
import Loading from "./Loading/Loading";

const Header = ({ header }) => {
    let [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const dispatch = useDispatch()
    const logout = () => {
        setLoading(true)
        dispatch(loginUser({}));
        setTimeout(() => {
            setLoading(false)
            navigation.navigate(LOGIN)
        }, 5000)
    }
    return (
        <View style={{ height: 60, width: '100%', marginTop: '15%' }}>
            <View style={{ paddingTop: 14, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: WHITE, height: '100%', width: '100%' }}>
                <TouchableOpacity>
                    <MaterialIcons
                        name={'menu-open'}
                        size={35}
                        style={{ alignSelf: 'center', color: 'grey' }}
                    />
                </TouchableOpacity>
                <Text style={{ paddingTop: '1%', fontSize: 20, fontWeight: 'bold', color: BLACK }}>{header}</Text>
                <TouchableOpacity
                    onPress={logout}
                >
                    <AntDesign
                        name={'logout'}
                        size={28}
                        style={{ alignSelf: 'center', color: 'grey' }}
                    />
                </TouchableOpacity>
            </View>
            {loading ? <Loading /> : null}

        </View>
    )
}

export default Header