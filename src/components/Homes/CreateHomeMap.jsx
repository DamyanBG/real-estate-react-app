import MapView from '../../common/MapView';

const CreateHomeMap = ({
    isChoosingLocation,
    setIsChoosingLocation,
    homeLocation,
    theComponentClick,
}) => {
    return (
        <section className="map-section">
            {!isChoosingLocation && (
                <section style={{ textAlign: 'center' }}>
                    <button type="button" onClick={() => setIsChoosingLocation(true)}>
                        Add location
                    </button>
                </section>
            )}
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
