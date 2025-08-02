import { useEffect, useState } from 'react';
import doctorsData from '../data/doctors.json';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import type { Doctor } from '../types/doctors';

const Home = () => {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const normalizedDoctors = doctorsData.map((doc) => ({
      ...doc,
      schedule: Object.fromEntries(
        Object.entries(doc.schedule).map(([day, time]) => [day, time ?? ''])
      ),
    }));
    setDoctors(normalizedDoctors as Doctor[]);
  }, []);

  const filtered = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-10">
        Book a Doctor Appointment
      </h1>

      <div className="mb-10">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          No doctors found matching your search.
        </div>
      )}
    </div>
  );
};

export default Home;
