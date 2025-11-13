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
    let cardPrice = data.card_prices[0].amazon_price;

    return (
        <div className="card p-4 max-w-sm text-left" 
            data-archetype={data.archetype}
            data-price={Number(cardPrice)}
            data-type={data.type}>
            <h2 className="font-bold mb-2">{name}</h2>

            <Image src={data.card_images[0].image_url} alt={data.name} className="w-[150px] rounded mb-2" />

            <h3 className="card-type" data-type={data.type}>{data.type}</h3>
            <p className="card-price">
                £{cardPrice}
            </p>


            <pre className="p-2 rounded text-xs overflow-auto opacity-25">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
