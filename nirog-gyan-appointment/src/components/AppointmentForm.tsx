import { useState } from 'react';

interface Props {
  doctorName: string;
  onSubmit: (name: string, email: string, datetime: string) => void;
}

const AppointmentForm = ({ doctorName, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datetime, setDatetime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !datetime) {
      alert('Please fill all fields.');
      return;
    }
    onSubmit(name, email, datetime);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Patient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg"
      />
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Confirm Appointment with {doctorName}
      </button>
    </form>
  );
};

export default AppointmentForm;
