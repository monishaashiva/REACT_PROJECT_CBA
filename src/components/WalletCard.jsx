// src/components/WalletCard.jsx
import React, { useState } from 'react';

export default function WalletCard({ wallet, onTopUp, onQuickPay }){
  const [topAmt, setTopAmt] = useState('');
  const [payAmt, setPayAmt] = useState('');
  const [payDesc, setPayDesc] = useState('Medical bill');

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <div className="kicker">Wallet balance</div>
          <div className="wallet-balance">₹ {wallet.balance?.toFixed(2)}</div>
        </div>
        <div className="small-muted">Updated locally</div>
      </div>

      <div style={{height:12}} />

      <div style={{display:'flex', gap:8}}>
        <input className="input" placeholder="Amount" value={topAmt} onChange={e=>setTopAmt(e.target.value)} />
        <button className="btn" onClick={()=>{
          const amt = parseFloat(topAmt);
          if (!amt || isNaN(amt)) return alert('Enter a number');
          onTopUp(amt);
          setTopAmt('');
        }}>Top up</button>
      </div>

      <div style={{height:10}} />

      <div style={{borderTop:'1px dashed #ecf6ed', paddingTop:12}}>
        <div className="kicker">Quick pay</div>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <input className="input" placeholder="Amount" value={payAmt} onChange={e=>setPayAmt(e.target.value)} />
          <input className="input" placeholder="Description" value={payDesc} onChange={e=>setPayDesc(e.target.value)} />
          <button className="btn" onClick={()=>{
            const amt = parseFloat(payAmt);
            if (!amt || isNaN(amt)) return alert('Enter a number');
            onQuickPay(amt, payDesc || 'Payment');
            setPayAmt('');
          }}>Pay</button>
        </div>
      </div>
    </div>
  );
}
