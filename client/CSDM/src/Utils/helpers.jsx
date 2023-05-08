import Toast from 'react-native-toast-message'

const successMessage = (desc = 'Successfully Complete!') => {
    return Toast.show({
        type: 'success',
        text1: desc,
        duration:2000,
    })
}

const LoginMessage = (desc = 'Successfully Login!') => {
    return Toast.show({
        type: 'success',
        text1: desc,
        duration:2000,
    })
}

const errorMessage = (desc = 'Oops Something Went Wrong!') => {
    return Toast.show({
        type: 'error',
        text1: desc,
    })
}

const requireAllField = (desc = 'please fill all field!') => {
    return Toast.show({
        type: 'error',
        text1: desc,
    })
}

export {
    successMessage,
    errorMessage,
    requireAllField,
    LoginMessage
}