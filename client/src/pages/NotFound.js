import { Link } from "react-router-dom";
import gif from "../images/notFound.gif";

export default function notFound() {
    return (
        <div className="notFound">
            <h1>OUPS</h1>
            <h2>PAGE NOT FOUND...</h2>
            <Link className="notFound_link" to={"/"}>GO TO HOMEPAGE</Link>
            <div className="notFound_footer">
                <img src={gif} alt="John Travolta meme" />
                <a className="link_anim" href="https://tenor.com/fr/view/confused-john-travolta-what-gif-5114829">Source</a>
            </div>
        </div>
    )
}