import MapView from "../map/MapView";

const CreateHomeMap = ({ isChoosingLocation, homeLocation, theComponentClick }) => {
    return (
        <section className="map-section">
            {(homeLocation.latitude || isChoosingLocation) && (
                <section style={{ textAlign: 'center' }}>
                    <MapView
                        latitude={homeLocation.latitude}
                        longitude={homeLocation.longitude}
                        MapClickerHandlerComponent={theComponentClick}
                    />
                </section>
            )}
        </section>
    );
};

export default CreateHomeMap;
