import React from "react"
import { profanity } from '@2toad/profanity';

export const checkForProfanity = (text) => {
    const haveProfanity = profanity.exists(text)
    return haveProfanity
}

export const checkObjForProfanity = (obj) => {
    const haveProfanity = Object.values(obj).some((value) => profanity.exists(value))
    return haveProfanity
}

export const checkIsOnChangeWithProfanity = (event) => {
    const { value } = event.target
    const haveProfanity = checkForProfanity(value)
    return haveProfanity
}
