// src/components/QuickActions.jsx
import React from 'react';

export default function QuickActions({ onEmergency }){
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="kicker">Quick actions</div>
          <h3 style={{margin:'6px 0 0 0'}}>Shortcuts</h3>
        </div>
      </div>

      <div style={{marginTop:12, display:'grid', gap:8}}>
        <button className="btn" onClick={()=>onEmergency()}>Call Emergency</button>
        <button className="btn-ghost" onClick={()=>alert('Show QR (simulated)')}>Show Health QR</button>
        <button className="btn-ghost" onClick={()=>alert('Export profile (simulated)')}>Export Profile</button>
      </div>
    </div>
  );
}
