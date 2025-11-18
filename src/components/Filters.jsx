import React from 'react';

export default function Filters({ filters, setFilters, locations, industries, clearFilters }) {
    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Search by name..."
                value={filters.search}
                onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            />

            <select
                value={filters.location}
                onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
            >
                <option value="">All locations</option>
                {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                ))}
            </select>

            <select
                value={filters.industry}
                onChange={e => setFilters(f => ({ ...f, industry: e.target.value }))}
            >
                <option value="">All industries</option>
                {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                ))}
            </select>

            <select
                value={filters.sortBy}
                onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}
            >
                <option value="name">Sort by Name</option>
                <option value="employees">Sort by Employees</option>
            </select>

            <button onClick={clearFilters}>Clear</button>
        </div>
    );
}