import { useParams, Link } from 'react-router-dom';
import doctors from '../data/doctors.json';
import type { Doctor } from '../types/doctors';

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor: Doctor | undefined = doctors
    .map((doc) => ({
      ...doc,
      schedule: Object.fromEntries(
        Object.entries(doc.schedule).map(([day, time]) => [day, time ?? ''])
      ),
    }))
    .find((doc) => doc.id === Number(id));

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-600">Doctor not found.</p>
      </div>
    );
  }

  const isBookingDisabled = doctor.availability === 'Fully Booked' || doctor.availability === 'On Leave';

  const getButtonLabel = () => {
    switch (doctor.availability) {
      case 'Fully Booked':
        return 'Fully Booked';
      case 'On Leave':
        return 'On Leave';
      default:
        return 'Book Appointment';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex flex-col items-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-blue-500"
        />
        <h2 className="text-3xl font-bold text-gray-800 mt-4">{doctor.name}</h2>
        <p className="text-lg text-blue-600 mt-1">{doctor.specialization}</p>
        <span
          className={`mt-2 px-3 py-1 text-sm rounded-full ${
            doctor.availability === 'Available Today'
              ? 'bg-green-100 text-green-700'
              : doctor.availability === 'Fully Booked'
              ? 'bg-red-100 text-red-600'
              : doctor.availability === 'On Leave'
              ? 'bg-gray-100 text-gray-600'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {doctor.availability}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Availability Schedule</h3>
        <ul className="space-y-2">
          {Object.entries(doctor.schedule).map(([day, time]) => (
            <li key={day} className="flex justify-between text-gray-600">
              <span className="font-medium">{day}</span>
              <span>{time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 text-center">
        {isBookingDisabled ? (
          <button
            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
            disabled
          >
            {getButtonLabel()}
          </button>
        ) : (
          <Link
            to={`/book/${doctor.id}`}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            {getButtonLabel()}
          </Link>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
