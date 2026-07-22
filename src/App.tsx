import { useMemo, useState } from 'react'
import { BookOpen, ChevronDown, Keyboard, Moon, Search, Sun, X } from 'lucide-react'
import './App.css'

type Entry = { word: string; syllables: number; part: string; meaning: string }
const lexicon: Entry[] = [
  { word:'အချစ်ရေး', syllables:3, part:'နာမ်', meaning:'ချစ်ခြင်းနှင့် ပတ်သက်သော အရေးအရာ။' },
  { word:'အသက်ရေး', syllables:3, part:'နာမ်', meaning:'အသက်ရှင်သန်ရေးနှင့် သက်ဆိုင်သော အရေးကိစ္စ။' },
  { word:'ဘဝရေး', syllables:3, part:'နာမ်', meaning:'ဘဝတည်ဆောက်မှု၊ နေထိုင်မှုနှင့် သက်ဆိုင်သော ကိစ္စ။' },
  { word:'အိမ်ထောင်ရေး', syllables:4, part:'နာမ်', meaning:'လင်မယားနှစ်ဦး၏ မိသားစုဘဝဆိုင်ရာ အရေးအရာ။' },
  { word:'ပညာရေး', syllables:3, part:'နာမ်', meaning:'ပညာသင်ယူခြင်းနှင့် သင်ကြားခြင်းဆိုင်ရာ လုပ်ငန်း။' },
  { word:'ကျန်းမာရေး', syllables:4, part:'နာမ်', meaning:'ကိုယ်ခန္ဓာနှင့် စိတ်၏ ကျန်းမာကောင်းမွန်မှု။' },
  { word:'စီးပွားရေး', syllables:4, part:'နာမ်', meaning:'ကုန်ထုတ်လုပ်မှု၊ ဖြန့်ဖြူးမှုနှင့် ငွေကြေးဆိုင်ရာ လုပ်ငန်းများ။' },
  { word:'နိုင်ငံရေး', syllables:4, part:'နာမ်', meaning:'နိုင်ငံအုပ်ချုပ်မှုနှင့် အာဏာဆိုင်ရာ အရေးအရာ။' },
  { word:'လူမှုရေး', syllables:4, part:'နာမ်', meaning:'လူအများ၏ နေထိုင်မှု၊ ဆက်ဆံမှုနှင့် သက်ဆိုင်သော အရေးအရာ။' },
  { word:'တရားရေး', syllables:3, part:'နာမ်', meaning:'တရားဥပဒေစီရင်ခြင်းနှင့် သက်ဆိုင်သော လုပ်ငန်း။' },
  { word:'စာပေရေး', syllables:4, part:'နာမ်', meaning:'စာပေဖန်တီးရေးနှင့် သက်ဆိုင်သော အလုပ်အကိုင်။' },
  { word:'အရေးအရေး', syllables:4, part:'ကြိယာဝိသေသန', meaning:'အလွန်အရေးကြီးစွာ; အရေးတကြီး။' },
]
const keys = [['က','ခ','ဂ','ဃ','င','စ','ဆ','ဇ','ည','တ'],['ထ','ဒ','န','ပ','ဖ','ဗ','မ','ယ','ရ','လ'],['ဝ','သ','ဟ','အ','ါ','ာ','ိ','ီ','ု','ူ'],['ေ','ဲ','ံ','့','း','်','ျ','ြ','ွ','ှ']]
function App() {
  const [dark,setDark]=useState(false), [query,setQuery]=useState('အချစ်ရေး'), [submitted,setSubmitted]=useState('အချစ်ရေး'), [open,setOpen]=useState(false), [selected,setSelected]=useState<Entry|null>(null), [notice,setNotice]=useState('')
  const source=lexicon.find(x=>x.word===submitted)
  const results=useMemo(()=>source?lexicon.filter(x=>x.word!==source.word&&x.word.endsWith('ရေး')&&x.syllables>=2&&x.syllables<=5):[],[source])
  const search=()=>{const found=lexicon.find(x=>x.word===query.trim());if(!found){setSubmitted('');setNotice('ဤစကားလုံးကို စိစစ်ပြီး အဘိဓာန်စာရင်းတွင် မတွေ့ရှိပါ။');return}if(found.syllables<2||found.syllables>3){setNotice('ထည့်သွင်းရန် စကားလုံးသည် ၂ မှ ၃ သံလုံးအတွင်း ဖြစ်ရမည်။');return}setNotice('');setSubmitted(found.word);setSelected(null)}
  return (
    <main className={dark?'app dark':'app'}><header><button className="theme" onClick={()=>setDark(!dark)}>{dark?<Sun size={17}/>:<Moon size={17}/>} {dark?'Light':'Dark'} mode</button><span>MYANMAR • DICTIONARY EDITION</span></header><section className="hero"><img src="/djx-logo.png" alt="DJX crest"/><h1>DJX Burmese Rhyme Dictionary</h1><p>အက္ခရာမှ အသံအထိ</p><small>အဓိပ္ပါယ်ရှိသော မြန်မာစကားလုံးများအတွက် ကာရန်တူသံများကို ရှာဖွေပါ။</small></section><section className="lookup"><div className="label"><b>စကားလုံးရှာရန်</b><span>၂–၃ သံလုံးသာ</span></div><div className="search"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="ဥပမာ — အချစ်ရေး"/><button className="key-toggle" onClick={()=>setOpen(!open)}><Keyboard size={19}/> မြန်မာ <ChevronDown size={14}/></button><button className="go" onClick={search}><Search size={18}/> ရှာဖွေရန်</button></div>{open&&<div className="keyboard"><div><span>မြန်မာ အက္ခရာ</span><button onClick={()=>setOpen(false)}><X size={15}/></button></div>{keys.map((row,i)=><p key={i}>{row.map(k=><button key={k} onClick={()=>setQuery(v=>v+k)}>{k}</button>)}</p>)}<p><button onClick={()=>setQuery('')}>ရှင်းလင်း</button><button onClick={()=>setQuery(v=>v.slice(0,-1))}>ဖျက်ရန်</button></p></div>}{notice&&<strong className="notice">{notice}</strong>}<small className="hint">သံလုံးစည်းကမ်းနှင့် အဘိဓာန်အတည်ပြုချက်ကို အလိုအလျောက် စစ်ဆေးပေးပါသည်။</small></section>{source&&<section className="results"><div className="heading"><div><p>SEARCH RESULT</p><h2><span>“{source.word}”</span> နှင့် ကာရန်တူသော စကားလုံးများ</h2></div><b>{results.length}<small> စကားလုံး</small></b></div><small>အောက်ပါစကားလုံးများသည် ၂–၅ သံလုံးအတွင်းရှိ အဘိဓာန်စကားလုံးများသာ ဖြစ်ပါသည်။</small><div className="grid">{results.map(x=><button className={selected?.word===x.word?'active':''} key={x.word} onClick={()=>setSelected(x)}><b>{x.word}</b><span>{x.syllables} သံလုံး</span></button>)}</div></section>}{selected&&<aside><BookOpen size={20}/><div><p>အဘိဓာန် အဓိပ္ပါယ်</p><h3>{selected.word} <small>{selected.part}</small></h3><span>{selected.meaning}</span></div><button onClick={()=>setSelected(null)}><X size={19}/></button></aside>}<footer><span>© 2025 DJX Burmese Rhyme Dictionary</span><nav><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Use</a></nav></footer></main>
  )
}

export default App
