import React from 'react';

export default function CompanyCards({ data }) {
    return (
        <div className="cardsContainer">
            {data.map((c, index) => (
                <div key={index} className="card">
                    <h3 className="cardTitle">{c.name}</h3>
                    <p><strong>Location:</strong> {c.location}</p>
                    <p><strong>Industry:</strong> {c.industry}</p>
                    <p><strong>Employees:</strong> {c.employees}</p>
                </div>
            ))}
        </div>
    );
}