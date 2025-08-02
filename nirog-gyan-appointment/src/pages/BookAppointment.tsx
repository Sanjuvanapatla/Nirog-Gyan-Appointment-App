import { useParams } from 'react-router-dom';
import { useState } from 'react';
import doctors from '../data/doctors.json';
import type { Doctor } from '../types/doctors';

const BookAppointment = () => {
  const { id } = useParams();
  const doctor: Doctor | undefined = doctors
    .map((doc) => ({
      ...doc,
      schedule: Object.fromEntries(
        Object.entries(doc.schedule).map(([day, time]) => [day, time ?? ''])
      ),
    }))
    .find((doc) => doc.id === Number(id));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datetime, setDatetime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !datetime) return alert('All fields are required');
    setSubmitted(true);
  };

  if (!doctor) return <p className="text-center text-red-600 text-lg font-medium mt-10">Doctor not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
        Book Appointment with <span className="text-gray-800">{doctor.name}</span>
      </h2>

      {submitted ? (
        <div className="text-green-700 bg-green-100 p-4 rounded-lg text-center font-medium">
          Appointment confirmed for <span className="font-semibold">{name}</span> on{' '}
          <span className="font-semibold">{new Date(datetime).toLocaleString()}</span>.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Patient Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Select Date & Time</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Confirm Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
