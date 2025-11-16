export default function CardSearchFilter({ search, setSearch }) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
                Search by name:
            </label>
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. Dark Magician"
                className="w-full p-2 border rounded"
            />
        </div>
    );
}