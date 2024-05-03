const AuthSection = ({ children }) => {
    return (
        <section className="auth-form-container">
            <section className="auth-form-section">{children}</section>
        </section>
    );
};

export default AuthSection;
