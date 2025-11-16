import { useState } from "react";
import CardBrowser from "./card/CardBrowser";
import CardDisplay from "./card/CardDisplay";

export default function MainArea() {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div className="grid py-10 px-12 items-start gap-12 grid-cols-2 max-w-[1360px] mx-auto">
            <CardDisplay card={selectedCard} />
            <CardBrowser onCardClick={setSelectedCard} />  
        </div>
    );
}