// import Footer from "./Footer.js";
import Navbar from "./Navbar.js";

export default function Wrapper({ data, component }) {
    return (
        <>
            <Navbar data={data} />
            <div className="container" id="all-content">
                {component}
            </div>
            {/* <Footer data={data} /> */}
        </>
    );
}
