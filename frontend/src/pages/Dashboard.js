import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';

const Dashboard = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  const [statistics, setStatistics] = useState({
    vulnerabilities: 0,
    codeSmells: 0,
    bugs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch the code analysis results
        const response = await axios.get('http://localhost:5001/api/code-analysis/results', {
          headers: {
            token: `  ${localStorage.getItem('token')}`
          }
        });

        // Check if the data is an array within the 'data' key
        const responseData = response.data?.data;

        if (Array.isArray(responseData)) {
          let vulnerabilitiesCount = 0;

          responseData.forEach(review => {
            if (review.vulnerabilityStatus === 'Vulnerable') {
              vulnerabilitiesCount++;
            }
          });

          setStatistics({
            vulnerabilities: vulnerabilitiesCount,
            codeSmells: 0,  // No codeSmells property in the data
            bugs: 0,        // No bugs property in the data
          });
          setRecentReviews(responseData);
        } else {
          setError('Invalid data format received.');
        }
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const sortedReviews = Array.isArray(recentReviews) ? 
    recentReviews
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      })
      .slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
    : [];

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Code Review Dashboard</h2>
        {error && (
          <p className="text-red-600 bg-red-100 p-4 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500 text-center">Loading dashboard...</p>
        ) : (
          <div>
            {/* Summary Statistics */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-100 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-800">Vulnerabilities</h3>
                <p className="text-3xl font-bold text-blue-600">{statistics.vulnerabilities}</p>
              </div>
              <div className="p-4 bg-green-100 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-green-800">Code Smells</h3>
                <p className="text-3xl font-bold text-green-600">{statistics.codeSmells}</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-yellow-800">Bugs</h3>
                <p className="text-3xl font-bold text-yellow-600">{statistics.bugs}</p>
              </div>
            </div>

            {/* Recent Code Reviews */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Recent Code Reviews</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                <thead>
                  <tr>
                    {['timestamp', 'fileName', 'vulnerabilityStatus', 'category', 'type', 'codeSnippet'].map((field) => (
                      <th
                        key={field}
                        className="px-4 py-2 border-b cursor-pointer"
                        onClick={() => handleSort(field)}
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedReviews.length > 0 ? (
                    sortedReviews.map((review, index) => (
                      <tr key={index} className="hover:bg-gray-100 transition">
                        <td className="px-4 py-2 border-b text-center">
                          {new Date(review.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 border-b text-center">{review.fileName}</td>
                        <td className="px-4 py-2 border-b text-center text-red-500">
                          {review.vulnerabilityStatus}
                        </td>
                        <td className="px-4 py-2 border-b text-center text-yellow-500">
                          {review.category}
                        </td>
                        <td className="px-4 py-2 border-b text-center">{review.type}</td>
                        <td className="px-4 py-2 border-b text-center">{review.codeSnippet}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                        No recent reviews found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              {[...Array(Math.ceil(recentReviews.length / reviewsPerPage)).keys()].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 mx-1 rounded ${page + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
