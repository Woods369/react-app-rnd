import { useState } from "react";
import CardList from "./CardList";
import CardDisplay from "./CardDisplay";

export default function MainArea() {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <main className="grid py-10 items-start gap-4 grid-cols-2">
            <CardDisplay card={selectedCard} />
            <CardList onCardClick={setSelectedCard} />
        </main>
    );
}
