import { Link } from 'react-router-dom';
import type { Doctor } from '../types/doctors';

const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
    <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover mx-auto" />
    <h3 className="text-lg font-bold mt-3 text-center">{doctor.name}</h3>
    <p className="text-center text-gray-600">{doctor.specialization}</p>
    <p className={`text-center mt-2 text-sm ${doctor.availability === 'Available Today' ? 'text-green-500' : doctor.availability === 'Fully Booked' ? 'text-red-500' : 'text-yellow-500'}`}>{doctor.availability}</p>
    <Link to={`/doctor/${doctor.id}`} className="mt-4 block text-center text-blue-600 hover:underline">
      View Profile
    </Link>
  </div>
);

export default DoctorCard;