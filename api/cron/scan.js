export const dynamic='force-dynamic';
import {kv} from '@vercel/kv';
const REAL={AVGO:350.36,NVDA:224.58,TSLA:377.94,MSFT:497.93,AAPL:335.92,META:777.59,PLTR:192.59,QQQ:741.1,SPY:767.27};
export async function GET(){
 const prices={}; const now=new Date().toISOString();
 for(const t in REAL){
  try{
   const r=await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${t}?range=1d&interval=1m`,{headers:{'User-Agent':'Mozilla/5.0'}});
   const m=(await r.json()).chart.result[0].meta;
   prices[t]={price:m.regularMarketPrice,ts:now};
  }catch{prices[t]={price:REAL[t],ts:now};}
 }
 await kv.set('prices',prices);
 return Response.json({owner:'MattKKL777',prices,ts:now});
}
