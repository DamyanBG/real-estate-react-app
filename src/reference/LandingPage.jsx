return (
    <main>
        <section className="landing-section">
            <article>
                <h1>Welcome To Real Estate App</h1>
                <h2>
                    Platform opened for everybody to publish real estate!
                </h2>
                <p>
                    Our global Real Estate App! Publish and
                    discover properties effortlessly on our inclusive
                    platform. From any corner of the world, you can easily
                    list your real estate. Our advanced platform ensures a
                    smooth experience for everyone, making property searches
                    super intuitive. Join us and unlock endless
                    possibilities in real estate!
                </p>
                <Link href="/homes">Discover</Link>
            </article>
        </section>
        <section className="latest-properties">
            <article className="latest-properties-title">
                <h2>Latest Properties</h2>
            </article>
            <article className="properties-card-container">
                <article className="property-card">
                    <article className="property-image-container">
                        <img
                            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?cs=srgb&dl=pexels-binyamin-mellish-1396122.jpg&fm=jpg"
                            alt=""
                        />
                    </article>

                    <article className="property-address">
                        New York, Brooklyn
                    </article>

                    <article className="property-info">
                        <h3>White House</h3>
                        <p>
                            Data action chair memory pull cause field
                            method. Sometimes peace citizen east. Account
                            thought news against call hospital Mr.
                        </p>
                    </article>

                    <article className="property-card-footer">
                        <span className="property-price">$35000</span>
                        <Link href="/details">View Details</Link>
                    </article>
                </article>

                <LatestPropertyCard
                    imgLink="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"
                    city="Los Angeles"
                    neightborhood="Orange County"
                    title="Aqua House"
                    description="Part operation month record. Grow there but wall look degree. Though at certain analysis skill along structure remain."
                    price="$100000"
                />

                <LatestPropertyCard
                    imgLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPC033xTDLDxQ_3-Ut8SPC9YukaNioHAtghVQBp-1O7kU8ATY9nXesVJwTBADYBhKBggQ&usqp=CAU"
                    city="Maine"
                    neightborhood="West Housing"
                    title="House with pool"
                    description="Part operation month record. Grow there but wall look degree. Though at certain analysis skill along structure remain."
                    price="$90000"
                />
            </article>
        </section>
    </main>
);