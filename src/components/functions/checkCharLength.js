import { toast } from 'react-toastify';

export function checkCharLength(name, place, price, size, description, longitude, latitude) {

    if(name && name.length < 3) {
        toast.error('name required minimum of 3 characters')
    }

    if(name && name.length > 150) {
        toast.error('name required maximum of 150 characters')
    }

    if(price && price.length > 50) {
        toast.error('price required maximum of 50 characters')
    }

    if(place && place.length < 3) {
        toast.error('Location required minimum of 3 characters')
    }

    if(place && place.length > 150) {
        toast.error('location required maximum of 150 characters')
    }

    if(size && size.length < 3) {
        toast.error('Size required minimum of 3 characters')
    }

    if(size && size.length > 150) {
        toast.error('Size required maximum of 150 characters')
    }

    if(description && description.length < 3) {
        toast.error('Description required minimum of 3 characters')
    }

    if(description && description.length > 150) {
        toast.error('Description required maximum of 150 characters')
    }

    if(longitude && longitude.length < 3) {
        toast.error('Longitude required minimum of 3 characters')
    }

    if(longitude && longitude.length > 150) {
        toast.error('Longitude required maximum of 150 characters')
    }

    if(latitude && latitude.length < 3) {
        toast.error('Latitude required minimum of 3 characters')
    }

    if(latitude && latitude.length > 150) {
        toast.error('Latitude required maximum of 150 characters')
    }

}