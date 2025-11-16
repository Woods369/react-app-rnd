export default function CardTypeFilter({ type, setType }) {
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

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
                Filter by Type:
            </label>
            <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
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