export default function CardCountFilter({ count, setCount }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
                Number of cards: {count}
            </label>
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={count} 
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}