import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';

const MapView = ({
    latitude,
    longitude,
    MapClickerHandlerComponent
}) => {
    const centerPoint = latitude && longitude
        ? [latitude, longitude]
        : [43, 27]

    return (
        <article className='map-container'>
            <MapContainer
                center={centerPoint}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '50vh' }}
            >
                {MapClickerHandlerComponent}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {latitude && longitude && (
                    <Marker position={[latitude, longitude]}>
                    <Tooltip direction="bottom">Some text</Tooltip>
                </Marker>
                )}
                
            </MapContainer>
        </article>
    )
}

export default MapView