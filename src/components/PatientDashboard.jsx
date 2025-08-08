// src/components/PatientDashboard.jsx
import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import WalletCard from './WalletCard';
import EmergencyContacts from './EmergencyContacts';
import Transactions from './Transactions';
import QuickActions from './QuickActions';

const LOCAL_KEYS = {
  profile: 'pd_profile',
  wallet: 'pd_wallet',
  contacts: 'pd_contacts',
  tx: 'pd_tx'
};

const mockProfile = {
  name: "John D",
  age: 25,
  bloodGroup: "O+",
  phone: "+91-9876543210",
  notes: "Allergic to penicillin",
};

const mockWallet = { balance: 1200.50 };

const mockContacts = [
  { id: 1, name: 'Jane D', relation: 'Wife', phone: '+91-9876543211' },
  { id: 2, name: 'Dr. Raj', relation: 'Primary', phone: '+91-9876543222' },
];

const mockTx = [
  { id: 1, date: '2025-07-31', desc: 'Pharmacy purchase', amount: -250.00 },
  { id: 2, date: '2025-07-28', desc: 'Insurance refund', amount: 500.00 },
];

function readOrSet(key, fallback){
  const v = localStorage.getItem(key);
  if (v) return JSON.parse(v);
  localStorage.setItem(key, JSON.stringify(fallback));
  return fallback;
}

export default function PatientDashboard(){
  const [profile, setProfile] = useState(() => readOrSet(LOCAL_KEYS.profile, mockProfile));
  const [wallet, setWallet] = useState(() => readOrSet(LOCAL_KEYS.wallet, mockWallet));
  const [contacts, setContacts] = useState(() => readOrSet(LOCAL_KEYS.contacts, mockContacts));
  const [tx, setTx] = useState(() => readOrSet(LOCAL_KEYS.tx, mockTx));

  useEffect(() => localStorage.setItem(LOCAL_KEYS.profile, JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem(LOCAL_KEYS.wallet, JSON.stringify(wallet)), [wallet]);
  useEffect(() => localStorage.setItem(LOCAL_KEYS.contacts, JSON.stringify(contacts)), [contacts]);
  useEffect(() => localStorage.setItem(LOCAL_KEYS.tx, JSON.stringify(tx)), [tx]);

  function updateProfile(updated){ setProfile(prev => ({...prev, ...updated})); }

  function addContact(contact){
    contact.id = Date.now();
    setContacts(prev => [contact, ...prev]);
  }

  function removeContact(id){
    setContacts(prev => prev.filter(c => c.id !== id));
  }

  function addTransaction({desc, amount}){
    const entry = { id: Date.now(), date: new Date().toISOString().slice(0,10), desc, amount: Number(amount) };
    setTx(prev => [entry, ...prev]);
    setWallet(prev => ({...prev, balance: Math.round((prev.balance + Number(amount)) * 100) / 100}));
  }

  function topUp(amount){
    addTransaction({desc: 'Top-up', amount: Number(amount)});
  }

  return (
    <div className="grid">
      <div>
        <div className="card">
          <ProfileCard profile={profile} onSave={updateProfile} />
        </div>

        <div style={{height: 18}} />

        <div className="card">
          <WalletCard wallet={wallet} onTopUp={(amt)=>topUp(amt)} onQuickPay={(amt,desc)=>addTransaction({desc, amount:-Math.abs(amt)})} />
        </div>

        <div style={{height: 18}} />

        <div className="card">
          <QuickActions onEmergency={()=>alert('Calling emergency services (simulated)')} />
        </div>
      </div>

      <div>
        <div className="card">
          <EmergencyContacts contacts={contacts} onAdd={addContact} onRemove={removeContact} />
        </div>

        <div style={{height: 18}} />

        <div className="card">
          <Transactions tx={tx} onAdd={addTransaction} />
        </div>
      </div>
    </div>
  );
}
