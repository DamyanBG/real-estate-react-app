import { toast } from 'react-toastify';

export function checkEmptyFields(name, place, price, size, description, longitude, latitude) {

    if(!name) {
        toast.error('Land name is required')
    }

    if(!place) {
        toast.error('location name is required')
    }

    if(!price) {
        toast.error('Price of Land is required')
    }

    if(!size) {
        toast.error('Size of the is required')
    }

    if(!description) {
        toast.error('description of the land is required')
    }

    if(!longitude) {
        toast.error('Land longitude is required')
    }

    if(!latitude) {
        toast.error('Land latitude is required')
    }
}