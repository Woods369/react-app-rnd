import { useState } from "react";

export function CardNumSelectField({ num, setNum }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
                Number of cards: {num}
            </label>
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={num} 
                onChange={(e) => setNum(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}

export function CardTypeSelectField({ setType }) {
    const [selectedType, setSelectedType] = useState("");
    
    const cardTypes = [
        "Normal Monster",
        "Effect Monster", 
        "Ritual Monster",
        "Fusion Monster",
        "Synchro Monster",
        "Xyz Monster",
        "Link Monster",
        "Spell Card",
        "Trap Card"
    ];

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setSelectedType(newType);
        setType(newType);
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
                Filter by Type:
            </label>
            <select 
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full p-2 border rounded"
            >
                <option value="">All Types</option>
                {cardTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
}