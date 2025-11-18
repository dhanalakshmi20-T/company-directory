import React from 'react';

export default function CompanyList({ data }) {
    return (
        <ul className="companyList">
            {data.map((c, index) => (
                <li key={index} className="companyItem">
                    <h3>{c.name}</h3>
                    <p><strong>Location:</strong> {c.location}</p>
                    <p><strong>Industry:</strong> {c.industry}</p>
                    <p><strong>Employees:</strong> {c.employees}</p>
                </li>
            ))}
        </ul>
    );
}