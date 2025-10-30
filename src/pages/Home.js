import "../styles/Home.css";
import { Link } from "react-router";

export default function Home() {
    return (
        <div id="home-page">
            {/* <section className="d-flex vh-100 mt-4"> */}
            <div className="d-flex">
                <div className="d-flex flex-column" id="hero-text">
                    <h1 id="hero-title" className="text-red fw-bolder p-1">
                        Horrorhub <br />
                    </h1>
                    <h3 className="fw-light p-1 text-red" id="hero-warning">
                        Do <span id="not">not</span> read this at night
                    </h3>
                    <span className="fs-5 mx-2" id="hero-subtitle">
                        Welcome, wanderer. <br />
                        You weren’t looking for this place — not really. <br />A
                        click here, a story there… <br />
                        curiosity pretending to be boredom. <br />
                        That’s how it starts. <br />
                        If you feel the breath behind your neck, <br />
                        stop reading. <br /> (But all three of us know you won’t
                        stop and turn around.)
                    </span>
                    <span className="fs-5 mx-5" id="hero-subtitle-mobile">
                        Welcome, wanderer. <br />
                        You found this by accident. <br />
                        That’s what they all say. <br />
                        Stop reading if you feel a breath that isn’t yours.{" "}
                        <br />
                        (But all three of us know you won’t stop and turn
                        around.)
                    </span>
                    <Link
                        className="btn btn-black m-3 my-5 w-50 p-3"
                        to={"/random/"}
                    >
                        Dive into the unknown
                    </Link>
                </div>
                <div className="w-50 p-2" id="hero-image">
                    <img
                        src="/home-image.jpg"
                        alt="Eye-catcher"
                        className="w-100"
                    />
                </div>
            </div>
            <br />

            {/* </section> */}

            {/* <br />
            <section>
                <h2 className="text-red fw-bold">
                    Dive into the unknown. <br />
                    Your next unsettling read awaits.
                </h2>
                <br />
                <div className="d-flex">
                    {stories.length ? (
                        stories.map((story, index) => (
                            <div key={index} className="m-4 w-25">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h4 className="card-title">
                                        <Link to={`/story/${story.id}`}>
                                            {story.title}
                                        </Link>{" "}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    {story.description}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Everything forgotten.</p>
                    )}
                </div>
                <br />
                <br />
            </section>
            <section>
                <Search authors={authors} tags={tags} />
            </section> */}
        </div>
    );
}
