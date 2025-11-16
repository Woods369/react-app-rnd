import { useEffect, useState } from "react";
import CardCountFilter from "../filters/CardCountFilter";
import CardTypeFilter from "../filters/CardTypeFilter";
import CardSearchFilter from "../filters/CardSearchFilter";
import CardGrid from "./CardGrid";

export default function CardBrowser({ onCardClick }) {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(20);
    const [type, setType] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            async function fetchCards() {
                setLoading(true);
                setError(null);
                try {
                    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?`;
                    
                    if (search) {
                        url += `fname=${encodeURIComponent(search)}&`;
                    }
                    
                    if (type) {
                        url += `type=${encodeURIComponent(type)}&`;
                    }
                    
                    url += `num=${count}&offset=0`;
                    
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error(`API returned ${res.status}`);
                    }
                    const data = await res.json();
                    setCards(data.data);
                } catch (error) {
                    setError(error.message);
                    console.error("API error:", error);
                } finally {
                    setLoading(false);
                }
            }
            
            fetchCards();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [count, type, search]);
    
    return (
        <div>
            <CardSearchFilter search={search} setSearch={setSearch} />
            <CardTypeFilter type={type} setType={setType} />
            <CardCountFilter count={count} setCount={setCount} />
            <CardGrid 
                cards={cards} 
                loading={loading} 
                error={error} 
                onCardClick={onCardClick} 
            />
        </div>
    );
}