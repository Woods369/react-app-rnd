export default function CardGrid({ cards, loading, error, onCardClick }) {
    return (
        <div className="w-full max-h-[400px] overflow-y-scroll p-2 border rounded space-y-4">
            {error && (
                <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700">
                    Failed to load cards: {error}
                </div>
            )}
            
            {loading && <p>Loading cards...</p>}
            
            {!loading && !error && (
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
    );
}