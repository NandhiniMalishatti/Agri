import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { PlusCircle, Clock, CheckCircle, XCircle, MapPin, Loader2 } from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    serviceType: 'Tractor',
    workType: 'Ploughing',
    acres: '',
    date: '',
    startTime: '',
    estimatedHours: '',
    numberOfLabourers: 0,
    paymentOffered: '',
    additionalNotes: '',
    location: {
      village: user?.address?.village || '',
      mandal: user?.address?.mandal || '',
      district: user?.address?.district || '',
      state: user?.address?.state || ''
    }
  });

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my');
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['village', 'mandal', 'district', 'state'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', formData);
      setShowForm(false);
      fetchBookings();
      // Reset form
      setFormData(prev => ({ ...prev, acres: '', date: '', startTime: '', estimatedHours: '', paymentOffered: '', additionalNotes: '' }));
    } catch (error) {
      console.error('Error creating booking', error);
      alert('Failed to create booking');
    }
  };

  const handleCancel = async (id) => {
    if(window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.put(`/bookings/${id}/cancel`);
        fetchBookings();
      } catch (error) {
        console.error('Error canceling', error);
      }
    }
  };

  const handleComplete = async (id) => {
    if(window.confirm('Mark this booking as completed?')) {
      try {
        await api.put(`/bookings/${id}/complete`);
        fetchBookings();
      } catch (error) {
        console.error('Error completing', error);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-agri" /></div>;

  const activeBookings = bookings.filter(b => b.status === 'Pending' || b.status === 'Accepted');
  const historyBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary flex items-center"
        >
          {showForm ? 'Cancel Request' : <><PlusCircle className="mr-2 h-5 w-5" /> New Booking</>}
        </button>
      </div>

      {showForm && (
        <div className="card mb-8 animate-fade-in-up">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Create New Booking</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                <select name="serviceType" className="input-field" value={formData.serviceType} onChange={handleChange}>
                  <option value="Tractor">Tractor</option>
                  <option value="Agricultural Labour">Agricultural Labour</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                <select name="workType" className="input-field" value={formData.workType} onChange={handleChange}>
                  <option value="Ploughing">Ploughing</option>
                  <option value="Sowing">Sowing</option>
                  <option value="Harvesting">Harvesting</option>
                  <option value="Weeding">Weeding</option>
                  <option value="Spraying">Spraying</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer Application">Fertilizer Application</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Acres</label>
                <input type="number" step="0.1" name="acres" required className="input-field" value={formData.acres} onChange={handleChange} />
              </div>

              {formData.serviceType === 'Agricultural Labour' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Labourers</label>
                  <input type="number" name="numberOfLabourers" required className="input-field" value={formData.numberOfLabourers} onChange={handleChange} />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" name="date" required className="input-field" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input type="time" name="startTime" required className="input-field" value={formData.startTime} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
                <input type="number" name="estimatedHours" required className="input-field" value={formData.estimatedHours} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Offered (₹)</label>
                <input type="number" name="paymentOffered" required className="input-field" value={formData.paymentOffered} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-md font-medium text-gray-800 mb-3">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" name="village" placeholder="Village" required className="input-field" value={formData.location.village} onChange={handleChange} />
                <input type="text" name="mandal" placeholder="Mandal" required className="input-field" value={formData.location.mandal} onChange={handleChange} />
                <input type="text" name="district" placeholder="District" required className="input-field" value={formData.location.district} onChange={handleChange} />
                <input type="text" name="state" placeholder="State" required className="input-field" value={formData.location.state} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea name="additionalNotes" className="input-field" rows="3" value={formData.additionalNotes} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="btn-primary w-full md:w-auto">Submit Booking</button>
          </form>
        </div>
      )}

      {/* Active Bookings */}
      <h2 className="text-xl font-bold mb-4">Active Bookings</h2>
      {activeBookings.length === 0 ? (
        <div className="card text-center text-gray-500 mb-8 py-10">No active bookings found. Create one to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {activeBookings.map(booking => (
            <div key={booking._id} className="card relative">
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {booking.status}
                </span>
              </div>
              <h3 className="font-bold text-lg text-agri mb-1">{booking.serviceType} - {booking.workType}</h3>
              <div className="text-sm text-gray-600 mb-4 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" /> {booking.location.village}, {booking.location.district}
              </div>
              
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between"><span>Acres:</span> <span className="font-medium">{booking.acres}</span></div>
                <div className="flex justify-between"><span>Date:</span> <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span></div>
                <div className="flex justify-between"><span>Time:</span> <span className="font-medium">{booking.startTime}</span></div>
                <div className="flex justify-between"><span>Pay:</span> <span className="font-medium">₹{booking.paymentOffered}</span></div>
              </div>

              {booking.status === 'Accepted' && booking.acceptedBy && (
                <div className="bg-agri-light p-3 rounded-lg mb-4 text-sm">
                  <p className="font-semibold text-agri-dark">Accepted By:</p>
                  <p>{booking.acceptedBy.name} ({booking.acceptedBy.phone})</p>
                </div>
              )}

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                {booking.status === 'Pending' && (
                  <button onClick={() => handleCancel(booking._id)} className="flex-1 btn-secondary text-sm py-1 border-red-500 text-red-500 hover:bg-red-50">Cancel</button>
                )}
                {booking.status === 'Accepted' && (
                  <button onClick={() => handleComplete(booking._id)} className="flex-1 bg-green-500 text-white rounded-lg py-1 hover:bg-green-600 text-sm font-medium">Mark Complete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      <h2 className="text-xl font-bold mb-4">Booking History</h2>
      {historyBookings.length === 0 ? (
        <div className="card text-center text-gray-500 py-10">No past bookings.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyBookings.map(booking => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.serviceType} - {booking.workType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.acceptedBy ? booking.acceptedBy.name : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
