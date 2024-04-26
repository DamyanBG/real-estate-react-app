import React from "react";

function About() {
    return (
        <div className="about-container">
            <div className="section">
                <h1>About us</h1>
            </div>
            <div className="section">
                <h3>Planning to Buy/Sell a property? Introducing the Real Estate App! Your one-stop solution for all your real estate needs!!</h3>
            </div>
            <br />
            <div className="section">
                <h2>Brief Description:</h2>
            </div>
            <p className="brief-desc">The idea behind this application is to create a place where buyers and sellers can meet. In this
                application, users can register an account, search for a real estate listing base of his/her
                preference(s) and make an inquiry of the listing; and the admin can manage resources including
                property listings, realtors and contact inquiries in the admin area.</p>
            <br />
            <div className="section">
                <p id="self-intro">This is the front-end for the Real Estate Application. The source code for the front-end can be found <a href="https://github.com/DamyanBG/real-estate-react-app" target="_blank" rel="noreferrer">here</a></p>
            </div>

            <div className="section">
                <p id="backend-repo-intro">The Back-end repository can be found <a href="https://github.com/DamyanBG/real-estate-nodejs-be" target="_blank" rel="noreferrer">here</a></p>
            </div>

            <div className="project-walkthrough">
                <p>A short walkthrough of the project can be found in the following <a href="https://www.youtube.com/watch?v=dR8qX2cMPcE&t=25s" target="_blank" rel="noreferrer">Youtube video</a></p>
            </div>
            <br />
            <p><strong>NOTE:</strong>This is an Open Source project and everyone is welcome to contribute and it will be much appreciated.</p>
        </div>
    )
}

export default About;