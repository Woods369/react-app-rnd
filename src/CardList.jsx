import { useEffect, useState } from "react";

export default function CardList({ onCardClick }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [num, setNum] = useState(20); // default number of cards

    useEffect(() => {
        async function fetchCards() {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${num}&offset=0`
                );
                const data = await res.json();
                setCards(data.data);
            } catch (error) {
                console.error("API error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCards();
    }, [num]);
    
    return (
        <div className="">
            {/* Slider */}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">
                    Number of cards: {num}
                </label>
                <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={num}
                    onChange={(e) => setNum(Number(e.target.value))}
                    className="w-full cursor-pointer"
                />
            </div>

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
