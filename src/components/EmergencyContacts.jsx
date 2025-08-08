// src/components/EmergencyContacts.jsx
import React, { useState } from 'react';

export default function EmergencyContacts({ contacts=[], onAdd, onRemove }){
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="kicker">Emergency contacts</div>
          <h3 style={{margin:'6px 0 0 0'}}>Contacts</h3>
        </div>
      </div>

      <div className="list" style={{marginTop:10}}>
        {contacts.map(c => (
          <div key={c.id} className="contact">
            <div>
              <div style={{fontWeight:700}}>{c.name} <span className="small-muted">({c.relation})</span></div>
              <div className="small-muted">{c.phone}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <button className="btn-ghost" onClick={()=>alert(`Calling ${c.phone} (simulated)`)}>Call</button>
              <button className="btn" onClick={()=>onRemove(c.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{height:10}} />

      <div style={{display:'grid', gap:8}}>
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Relation" value={relation} onChange={e=>setRelation(e.target.value)} />
        <input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={()=>{
            if (!name || !phone) return alert('Fill name and phone');
            onAdd({name, relation, phone});
            setName(''); setRelation(''); setPhone('');
          }}>Add contact</button>
        </div>
      </div>
    </div>
  );
}
