import VerticalAccordion from "./VerticalAccordion";
import elden_ring from "../../assets/img/games/elden_ring.avif";
import god_of_war from "../../assets/img/games/god_of_war.webp";
import gta_v from "../../assets/img/games/gta_v.jpg";
import last_of_us from "../../assets/img/games/last_of_us.avif";
import marvel from "../../assets/img/games/marvel.jpeg";
import fortnite from "../../assets/img/games/fortnite.jpg";
import valorant from "../../assets/img/games/valorant.avif";

const VerticalAccordions = () => {
    const CURRENTACCORDION = 0;
    const ITEMSPERACCORDIONS = 7;
    const games = [
        { picture: valorant, name: "Valorant" },
        { picture: fortnite, name: "Fortnite" },
        { picture: elden_ring, name: "Elden Ring" },
        { picture: god_of_war, name: "God of War" },
        { picture: gta_v, name: "GTA V" },
        { picture: last_of_us, name: "The Last of Us" },
        { picture: marvel, name: "Marvel" },
    ];

    return (
        <div className="vertical-accordions">
            {games.slice(CURRENTACCORDION, ITEMSPERACCORDIONS).map((game, index) => (
                <VerticalAccordion key={index} game={game} />
            ))}
        </div>
    );
};

export default VerticalAccordions;
