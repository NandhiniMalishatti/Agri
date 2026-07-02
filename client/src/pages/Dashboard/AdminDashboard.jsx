import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { Users, Tractor, Briefcase, FileText, Trash2, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, bookingsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/bookings')
      ]);
      setStats(statsRes.data);
      setUsersList(usersRes.data);
      setBookingsList(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching admin data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if(window.confirm('Are you sure you want to delete this user? All their associated data might be affected.')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-agri" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${activeTab === 'overview' ? 'border-agri text-agri' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`${activeTab === 'users' ? 'border-agri text-agri' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`${activeTab === 'bookings' ? 'border-agri text-agri' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            All Bookings
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && stats && (
        <div className="space-y-8">
          <h2 className="text-lg font-medium text-gray-900">Platform Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users.totalUsers}</p>
              </div>
            </div>
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <User className="h-6 w-6" /> 
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Farmers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users.farmers}</p>
              </div>
            </div>
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <Tractor className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tractor Owners</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users.tractorOwners}</p>
              </div>
            </div>
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Labourers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users.labourers}</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-medium text-gray-900 mt-8">Booking Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bookings.totalBookings}</p>
              </div>
            </div>
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <Loader2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bookings.pendingBookings}</p>
              </div>
            </div>
            <div className="card flex items-center p-6">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.bookings.completedBookings}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usersList.map(u => (
                  <tr key={u._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{u.name}</div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${u.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                          u.role === 'Farmer' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.address?.village}, {u.address?.district}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {u.role !== 'Admin' && (
                        <button onClick={() => handleDeleteUser(u._id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingsList.map(b => (
                  <tr key={b._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500">{b._id.substring(b._id.length - 6)}</div>
                      <div className="text-sm font-medium text-gray-900">{new Date(b.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{b.serviceType}</div>
                      <div className="text-xs text-gray-500">{b.workType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.farmer?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.acceptedBy ? b.acceptedBy.name : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${b.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          b.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                          b.status === 'Accepted' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Fix for missing User icon import in AdminDashboard
import { User } from 'lucide-react';

export default AdminDashboard;
