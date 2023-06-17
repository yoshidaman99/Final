'use client'
import React, { useState } from 'react';
import HeaderInfo from '@/app/components/header_info';
import { addRequest } from '@/lib/addRequest';


export default function CreateRequest(): React.JSX.Element {
  const requestList = [
    {
      request: 'Request Diploma',
      notes: 'Please be informed that for no issue in getting your diploma, you need to have all requirements and payment paid.',
      employeeAssign: 'registral',
    },
    {
      request: 'Request Clearance',
      notes: 'Please make sure all fees from the cashier are paid.',
      employeeAssign: 'cashier',
    },
  ];

  const [templateName, setTemplateName] = useState('');
  const [employee, setEmployee] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [studentId, setStudentId] = useState('');

  const [selectedRequest, setSelectedRequest] = useState('');

  const handleRequestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRequest(e.target.value);
    setTemplateName(e.target.value);
    setTitle(e.target.value);
  };

  const handleEmployee = (value: string) => {
    setEmployee(value);
  };

  const handleMessage = (value: string) => {
    setMessage(value);
  };

  const handleContactNumber = (value: string) => {
    setContactNumber(value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handleGender = (value: string) => {
    setGender(value);
  };

  const handleBirthdate = (value: string) => {
    setBirthdate(value);
  };

  const handleStudentId = (value: string) => {
    setStudentId(value);
  };

  const handleAddRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Role = formData.get('_role') as string;

    try {
      addRequest(title, message, templateName, Role, contactNumber, email, gender, birthdate, studentId);
    } catch (error) {
      // Handle error
    }
  };
  
  const selectedRequestData = requestList.find((item) => item.request === selectedRequest);

  return (
    <section>
    <div>
      <HeaderInfo title={'Create Request'} />
    </div>
    <form onSubmit={handleAddRequest}>
      <div className="w-full p-5 text-slate-900">
        <div className="w-full p-4 bg-slate-100 rounded">
          <div className="w-full">
            <h1 className="text-lg font-semibold">Create a Request</h1>
          </div>
          <div>
          <select
            id="template_name"
            className="px-3 py-2 w-10/12 mt-2"
            value={templateName}
            onChange={handleRequestChange}
            required
          >
            <option value="">Select a Request...</option>
            {requestList.map((item, index) => (
              <option key={index} value={item.request}>
                {item.request}
              </option>
            ))}
          </select>
          </div>
          <div className="mt-2">
            <h2>Notes:</h2>
          </div>
          <div className="mt-2 p-2 ring-2 ring-black h-screen max-h-350">
            <h3 id="request_text">{selectedRequestData?.notes}</h3>
          </div>
          {selectedRequestData && (
            <div className="mt-2">
              <h2>Employee:</h2>
              <input
                name="_role"
                value={selectedRequestData.employeeAssign}
                onChange={(e) => {
                  handleEmployee(e.target.value);
                }}
                className="px-3 py-2 border border-gray-400 rounded mt-2"
              />
            </div>
          )}
          <div className="mt-2">
            <h2>Message:</h2>
          </div>
          <div className="mt-2 w-full">
            <textarea
              value={message}
              onChange={(e) => handleMessage(e.target.value)}
              placeholder="Message..."
              className="w-full h-36 border-2 border-black p-3"
              required
            ></textarea>
          </div>
          <div className="mt-2">
            <h2>Contact Number:</h2>
            <input
              type="text"
              name="contact_number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              className="px-3 py-2 border border-gray-400 rounded mt-2"
            />
          </div>
          <div className="mt-2">
            <h2>Email:</h2>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 border border-gray-400 rounded mt-2"
            />
          </div>
          <div className="mt-2">
            <h2>Gender:</h2>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={(e) => handleGender(e.target.value)}
              required
              className="px-3 py-2 border border-gray-400 rounded mt-2"
            />
          </div>
          <div className="mt-2">
            <h2>Birthdate:</h2>
            <input
              type="date"
              name="birthdate"
              value={birthdate}
              onChange={(e) => handleBirthdate(e.target.value)}
              required
              className="px-3 py-2 border border-gray-400 rounded mt-2"
            />
          </div>
          <div className="mt-2">
            <h2>Student ID:</h2>
            <input
              type="text"
              name="student_id"
              value={studentId}
              onChange={(e) => handleStudentId(e.target.value)}
              required
              className="px-3 py-2 border border-gray-400 rounded mt-2"
            />
          </div>
          <div className="h-14 pt-4">
            <button
              type="submit"
              className="float-right px-3 py-2 bg-red-600 text-white rounded"
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
  );
}