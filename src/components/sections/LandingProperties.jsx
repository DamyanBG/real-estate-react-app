import HomeCard from "../cards/home-cards/HomeCard";
import ExtraHomeCard from '../cards/home-cards/ExtraHomeCard';


const LandingProperties = () => {
    return (
        <section className="latest-properties">
            <article className="latest-properties-title">
                <h2>Latest Properties</h2>
            </article>
            <article className="properties-card-container">
                <ExtraHomeCard
                    photoUrl="https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"
                    city="Los Angeles"
                    neightborhood="Orange County"
                    title="Aqua House"
                    description="Part operation month record. Grow there but wall look degree. Though at certain analysis skill along structure remain."
                    price="$100000"
                />

                <HomeCard
                    photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPC033xTDLDxQ_3-Ut8SPC9YukaNioHAtghVQBp-1O7kU8ATY9nXesVJwTBADYBhKBggQ&usqp=CAU"
                    city="Maine"
                    neightborhood="West Housing"
                    title="House with pool"
                    description="Part operation month record. Grow there but wall look degree. Though at certain analysis skill along structure remain."
                    price="$90000"
                />

                <HomeCard
                    photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPC033xTDLDxQ_3-Ut8SPC9YukaNioHAtghVQBp-1O7kU8ATY9nXesVJwTBADYBhKBggQ&usqp=CAU"
                    city="Maine"
                    neightborhood="West Housing"
                    title="House with pool"
                    description="Part operation month record. Grow there but wall look degree. Though at certain analysis skill along structure remain."
                    price="$90000"
                />
            </article>
        </section>
    );
};

export default LandingProperties;
