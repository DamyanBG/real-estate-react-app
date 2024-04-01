import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

const MapView = ({
    latitude,
    longitude,
    MapClickerHandlerComponent
}) => {
    return (
        <article className='map-container'>
            <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '50vh' }}
            >
                {MapClickerHandlerComponent && MapClickerHandlerComponent}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Tooltip direction="bottom">Some text</Tooltip>
                </Marker>
            </MapContainer>
        </article>
    )
}

export default MapView