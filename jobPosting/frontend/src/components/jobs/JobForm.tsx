import React, { useState } from 'react';
import axios from 'axios';

const JobForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('BEGINNER');
  const [endDate, setEndDate] = useState('');
  const [candidateEmails, setCandidateEmails] = useState(['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/jobs', { title, description, experienceLevel, endDate, candidateEmails });
      alert('Job posted successfully!');
    } catch (err) {
      alert('Error posting job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" required />
      <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
        <option value="BEGINNER">Beginner</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="EXPERT">Expert</option>
      </select>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input
        type="email"
        value={candidateEmails[0]}
        onChange={(e) => setCandidateEmails([e.target.value])}
        placeholder="Candidate Email"
        required
      />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobForm;
