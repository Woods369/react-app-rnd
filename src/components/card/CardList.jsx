import { useEffect, useState } from "react";
import { CardNumSelectField, CardTypeSelectField } from "../../formFields";

export default function CardList({ onCardClick }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [num, setNum] = useState(20);
    const [type, setType] = useState("");

    useEffect(() => {
        async function fetchCards() {
            setLoading(true);
            try {
                let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;
                
                if (type) {
                    url += `type=${encodeURIComponent(type)}&`;
                }
                
                url += `num=${num}&offset=0`;
                
                console.log("Fetching from:", url); 
                
                const res = await fetch(url);
                const data = await res.json();
                setCards(data.data);
            } catch (error) {
                console.error("API error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCards();
    }, [num, type]);
    
    return (
        <div className="">
            {/* Slider */}
            <CardNumSelectField num={num} setNum={setNum} />
            
            {/* Type Selector */}
            <CardTypeSelectField setType={setType} />

            <div className="w-full max-h-[400px] overflow-y-scroll p-2 border rounded space-y-4">
            {/* Card list */}
            {loading ? (
                <p>Loading cards...</p>
            ) : (
                <ul>
                    {cards.map(card => (
                        <li
                            key={card.id}
                            className="cursor-pointer hover:bg-gray-200 p-1"
                            onClick={() => onCardClick(card.name)}
                        >
                            {card.name}
                        </li>
                    ))}
                </ul>
            )}
            </div>
        </div>
    );
}