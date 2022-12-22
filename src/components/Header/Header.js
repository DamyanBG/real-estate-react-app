import "./Header.scss"

export default function Header() {
    return (
        <header>
            <section>
                <p className="app-name">Real Estate App</p>
            </section>
            <nav>
                <ul>
                    <li>Buy</li>
                    <li>Sell</li>
                    <li>Rent</li>
                </ul>
            </nav>
            <section className="auth">
                <p>Sign up</p>
            </section>
        </header>
    )
}