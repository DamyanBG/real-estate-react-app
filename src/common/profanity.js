import { profanity } from '@2toad/profanity';

export const checkTextForProfanity = (text) => {
    const haveProfanity = profanity.exists(text)
    return haveProfanity
}

export const checkObjForProfanity = (obj) => {
    const haveProfanity = Object.values(obj).some((value) => profanity.exists(value))
    return haveProfanity
}

export const checkIsOnChangeWithProfanity = (event) => {
    const { value } = event.target
    const haveProfanity = checkTextForProfanity(value)
    return haveProfanity
}
