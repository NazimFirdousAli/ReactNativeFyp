
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export async function uploadImage({ source, ref }) {
    try {
        const task = storage().ref(`${ref}/${source?.filename}`).putFile(source?.uri);

        try {
            await task;
            alert(
                'Photo uploaded!',
                'Your photo has been uploaded to Firebase Cloud Storage!',
            );
            return source?.fileName;
        } catch (e) {
            alert(e);
            return e;
        }

    } catch (error) {
        alert(error);
    }
};

