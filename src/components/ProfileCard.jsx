// src/components/ProfileCard.jsx
import React, { useState } from 'react';

export default function ProfileCard({ profile, onSave }){
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  function startEdit(){ setForm(profile); setEditing(true); }
  function cancel(){ setEditing(false); setForm(profile); }
  function save(){
    onSave(form);
    setEditing(false);
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="kicker">Patient</div>
          <h3 style={{margin:'6px 0 0 0'}}>{profile.name}</h3>
          <div className="small-muted">Tap edit to update profile</div>
        </div>
        <div>
          {!editing ? <button className="btn-ghost" onClick={startEdit}>Edit</button>
                   : <div style={{display:'flex', gap:8}}><button className="btn-ghost" onClick={cancel}>Cancel</button><button className="btn" onClick={save}>Save</button></div>}
        </div>
      </div>

      <div style={{height:12}} />

      {!editing ? (
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div className="avatar">{(profile.name||'P').split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
          <div style={{display:'flex', flexDirection:'column', gap:6}}>
            <div><strong>Age:</strong> {profile.age}</div>
            <div><strong>Blood Group:</strong> {profile.bloodGroup}</div>
            <div><strong>Phone:</strong> {profile.phone}</div>
            <div><strong>Notes:</strong> <span className="small-muted">{profile.notes}</span></div>
          </div>
        </div>
      ) : (
        <div style={{marginTop:12, display:'grid', gap:8}}>
          <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <div style={{display:'flex', gap:8}}>
            <input className="input" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} placeholder="Age" />
            <input className="input" value={form.bloodGroup} onChange={e=>setForm({...form, bloodGroup:e.target.value})} placeholder="Blood group" />
          </div>
          <input className="input" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" />
          <textarea className="input" rows="3" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Notes" />
        </div>
      )}
    </div>
  );
}
