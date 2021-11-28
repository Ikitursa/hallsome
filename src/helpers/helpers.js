/*
export default function (firebaseObject) {
    const keys = Object.keys(firebaseObject)

    return keys.map(key => {

        return {
            ...firebaseObject[key],
            id: key
        }
    })
}*/

const firebaseObjectToList = (firebaseObject) => {
    const keys = Object.keys(firebaseObject)

    return keys.map(key => {

        return {
            ...firebaseObject[key],
            id: key
        }
    })
}

export {firebaseObjectToList}

