import type { Doctor } from '../types/doctors';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors }: { doctors: Doctor[] }) => {
  if (doctors.length === 0) {
    return <p className="text-center text-gray-500">No doctors found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;