import React, { useEffect, useMemo, useState } from 'react';

export default function App() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({ search: '', location: '', industry: '', sortBy: 'name' });
    const [view, setView] = useState('table');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/companies.json');
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const data = await res.json();
            setCompanies(data);
        } catch (err) {
            setError(err.message || 'Failed to load');
        } finally {
            setLoading(false);
        }
    }

    const locations = useMemo(() => Array.from(new Set(companies.map(c => c.location))).sort(), [companies]);
    const industries = useMemo(() => Array.from(new Set(companies.map(c => c.industry))).sort(), [companies]);

    const filtered = useMemo(() => {
        let out = companies.slice();

        if (filters.search) {
            const s = filters.search.toLowerCase();
            out = out.filter(c => c.name.toLowerCase().includes(s));
        }
        if (filters.location) out = out.filter(c => c.location === filters.location);
        if (filters.industry) out = out.filter(c => c.industry === filters.industry);

        if (filters.sortBy === 'name') out.sort((a, b) => a.name.localeCompare(b.name));
        if (filters.sortBy === 'employees') out.sort((a, b) => a.employees - b.employees);

        return out;
    }, [companies, filters]);

    function clearFilters() {
        setFilters({ search: '', location: '', industry: '', sortBy: 'name' });
    }

    return (
        <div className="container">
            <header>
                <h1>Companies Directory</h1>
                <p className="muted">Search and filter companies.</p>
            </header>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={filters.search}
                    onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                />

                <select value={filters.location} onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}>
                    <option value="">All locations</option>
                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>

                <select value={filters.industry} onChange={e => setFilters(f => ({ ...f, industry: e.target.value }))}>
                    <option value="">All industries</option>
                    {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>

                <select value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
                    <option value="name">Sort by Name</option>
                    <option value="employees">Sort by Employees</option>
                </select>

                <button onClick={clearFilters}>Clear</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Industry</th>
                            <th>Employees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.location}</td>
                                <td>{c.industry}</td>
                                <td>{c.employees}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}