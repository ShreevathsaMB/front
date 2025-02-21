import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comparisons, setComparisons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/comparisons');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setComparisons(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading comparisons...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!comparisons) return null;

  return (
    <div className="comparisons-container">
      <h1>Technology Comparisons</h1>
      <ComparisonSection data={comparisons.git_comparison} />
      <ComparisonSection data={comparisons.docker_comparison} />
      <ComparisonSection data={comparisons.kubernetes_comparison} />
      <ComparisonSection data={comparisons.jenkins_comparison} />
      <ComparisonSection data={comparisons.flask_react_relationship} /> {/* Added this line */}
    </div>
  );
}

function ComparisonSection({ data }) {
  return (
    <div className="comparison-section">
      <h2>{data.title}</h2>
      {data.description && <p>{data.description}</p>}
      {data.features && (
        <ul className="features-list">
          {Object.entries(data.features).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      )}
      {data.key_features && (
        <ul className="features-list">
          {data.key_features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
      {data.key_points && ( // Added this conditional rendering
        <ul className="features-list">
          {data.key_points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;