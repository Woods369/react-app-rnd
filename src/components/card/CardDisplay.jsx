import { useEffect, useState } from "react";

function Image({ src, alt, className }) {
    return <img src={src} alt={alt} className={className} />;
}

export default function CardDisplay({ card }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!card) return;

        async function fetchCard() {
            try {
                const res = await fetch(
                    `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(card)}`
                );
                const result = await res.json();
                setData(result.data[0]);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        fetchCard();
    }, [card]);

    if (!card) return <p>Select a card from the list.</p>;
    if (!data) return <p>Loading card...</p>;

    let name = data.name;
    let cardPrice = Number(data.card_prices[0].amazon_price);
    let cardType = data.type;

    return (
        <div className="card p-4 text-left" 
            data-archetype={data.archetype}
            data-price={cardPrice}
            data-type={cardType}>
            <h2 className="font-bold mb-2 hidden">{name}</h2>

            <Image src={data.card_images[0].image_url} alt={data.name} className="w-full max-w-[450px] rounded mb-2" />

            <h3 className="card-type" data-type={data.type}>{data.type}</h3>
            <p className="card-price">
                £{cardPrice}
            </p>


            <pre className="p-2 rounded text-xs overflow-auto opacity-25 mb-[50vh]">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
