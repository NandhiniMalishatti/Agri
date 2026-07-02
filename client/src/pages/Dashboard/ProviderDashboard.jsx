import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { MapPin, Phone, CheckCircle, Loader2 } from 'lucide-react';

const ProviderDashboard = () => {
  const { user } = useContext(AuthContext);
  const [availableBookings, setAvailableBookings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [availableRes, acceptedRes] = await Promise.all([
        api.get('/bookings/available'),
        api.get('/bookings/accepted')
      ]);
      setAvailableBookings(availableRes.data);
      setMyBookings(acceptedRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (id) => {
    if(window.confirm('Accept this booking?')) {
      try {
        await api.put(`/bookings/${id}/accept`);
        fetchData();
      } catch (error) {
        console.error('Error accepting', error);
        alert(error.response?.data?.message || 'Failed to accept booking');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-agri" /></div>;

  const activeMyBookings = myBookings.filter(b => b.status === 'Accepted');
  const historyMyBookings = myBookings.filter(b => b.status === 'Completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{user.role} Dashboard</h1>
        <p className="text-gray-600">Find work and manage your accepted bookings.</p>
      </div>

      {/* Available Bookings */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Available Requests in your area
        <span className="ml-2 bg-agri-light text-agri text-xs px-2 py-1 rounded-full">{availableBookings.length}</span>
      </h2>
      
      {availableBookings.length === 0 ? (
        <div className="card text-center text-gray-500 mb-10 py-10">No available requests right now. Check back later.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {availableBookings.map(booking => (
            <div key={booking._id} className="card border-l-4 border-l-agri">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{booking.workType}</h3>
                <span className="font-bold text-agri">₹{booking.paymentOffered}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-4 flex flex-col space-y-1">
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-gray-400"/> {booking.location.village}, {booking.location.mandal}</span>
                <span className="flex items-center text-gray-800 font-medium mt-1">Farmer: {booking.farmer.name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                <div><span className="text-gray-500 text-xs block">Date</span>{new Date(booking.date).toLocaleDateString()}</div>
                <div><span className="text-gray-500 text-xs block">Time</span>{booking.startTime}</div>
                <div><span className="text-gray-500 text-xs block">Acres</span>{booking.acres}</div>
                <div><span className="text-gray-500 text-xs block">Est. Hours</span>{booking.estimatedHours}</div>
                {booking.serviceType === 'Agricultural Labour' && (
                  <div className="col-span-2"><span className="text-gray-500 text-xs block">Labourers Needed</span>{booking.numberOfLabourers}</div>
                )}
              </div>

              {booking.additionalNotes && (
                <div className="text-sm text-gray-600 mb-4 italic">
                  "{booking.additionalNotes}"
                </div>
              )}

              <button onClick={() => handleAccept(booking._id)} className="btn-primary w-full flex justify-center items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> Accept Work
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Accepted Work */}
      <h2 className="text-xl font-bold mb-4">Your Active Jobs</h2>
      {activeMyBookings.length === 0 ? (
        <div className="card text-center text-gray-500 mb-10 py-10">You haven't accepted any jobs yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {activeMyBookings.map(booking => (
            <div key={booking._id} className="card bg-agri-light/30 border border-agri/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{booking.workType}</h3>
                  <p className="text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()} at {booking.startTime}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded font-semibold">In Progress</span>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Farmer Contact Details</h4>
                <div className="flex items-center text-gray-800 font-medium mb-1">
                  {booking.farmer.name}
                </div>
                <div className="flex items-center text-agri font-medium text-lg">
                  <Phone className="h-4 w-4 mr-2" /> {booking.farmer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <MapPin className="h-4 w-4 mr-2" /> {booking.location.village}, {booking.location.mandal}, {booking.location.district}
                </div>
              </div>
              <p className="text-xs text-gray-500 italic text-center">Wait for the farmer to mark this job as complete to move it to history.</p>
            </div>
          ))}
        </div>
      )}

      {/* Completed Jobs */}
      <h2 className="text-xl font-bold mb-4">Completed Jobs</h2>
      {historyMyBookings.length === 0 ? (
        <p className="text-gray-500 italic">No completed jobs yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyMyBookings.map(booking => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.workType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.farmer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-agri">₹{booking.paymentOffered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
