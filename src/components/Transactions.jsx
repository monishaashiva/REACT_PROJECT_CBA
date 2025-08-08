// src/components/Transactions.jsx
import React, { useState } from 'react';

export default function Transactions({ tx=[], onAdd }){
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="kicker">Transaction history</div>
          <h3 style={{margin:'6px 0 0 0'}}>Recent activity</h3>
        </div>
        <div className="small-muted">{tx.length} items</div>
      </div>

      <div style={{marginTop:12}} className="list">
        {tx.map(t => (
          <div key={t.id} className="tx">
            <div style={{display:'flex', flexDirection:'column'}}>
              <div style={{fontWeight:700}}>{t.desc}</div>
              <div className="small-muted">{t.date}</div>
            </div>
            <div className="amount">{t.amount < 0 ? '- ' : '+ ' }₹{Math.abs(t.amount).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div style={{height:12}} />

      <div style={{display:'grid', gap:8}}>
        <input className="input" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input className="input" placeholder="Amount (use negative for expenses e.g. -200)" value={amount} onChange={e=>setAmount(e.target.value)} />
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={()=>{
            const a = Number(amount);
            if (!desc || !amount || isNaN(a)) return alert('Provide description and valid amount');
            onAdd({desc, amount: a});
            setDesc(''); setAmount('');
          }}>Add transaction</button>
        </div>
      </div>
    </div>
  );
}
