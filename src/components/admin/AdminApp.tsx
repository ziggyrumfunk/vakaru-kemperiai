"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { isSupabaseConfigured, getSupabase, VEHICLE_BUCKET } from "@/lib/supabase";

type Row = Record<string, any>;

const FEATURES = [
  "awning","ac","gasStove","fridge","boiler","shower","wc","heating",
  "thermalCurtains","insectScreens","solar","bikeRack","tv","navigation",
  "alarm","powerSteering","individualSeats","guideMic","largeLuggage",
] as const;

const FEATURE_LT: Record<string, string> = {
  awning:"Markizė", ac:"Kondicionierius", gasStove:"Dujinė viryklė", fridge:"Šaldytuvas",
  boiler:"Boileris", shower:"Dušas", wc:"WC", heating:"Šildymas", thermalCurtains:"Term. užuolaidos",
  insectScreens:"Tinkleliai", solar:"Saulės baterijos", bikeRack:"Dviračių laikiklis", tv:"TV",
  navigation:"Navigacija", alarm:"Signalizacija", powerSteering:"Vairo stiprintuvas",
  individualSeats:"Regul. sėdynės", guideMic:"Gido mikrofonas", largeLuggage:"Didelis bagažinė",
};

const NUM_FIELDS = ["power_kw","power_hp","year","length_cm","height_cm","width_cm","weight_kg","water_l","fuel_tank_l","seats","berths","sort_order"];
const TEXT_FIELDS = ["chassis","engine","consumption"];

function emptyForm(): Row {
  return { slug:"", name:"", category:"camper", featured:false, vip:false, sort_order:0,
    chassis:"", engine:"", power_kw:"", power_hp:"", year:"", transmission:"",
    length_cm:"", height_cm:"", width_cm:"", weight_kg:"", water_l:"", fuel_tank_l:"",
    consumption:"", seats:"", berths:"", features:[] as string[],
    description_lt:"", description_ru:"", description_lv:"", description_en:"",
    hero_image:"", images:[] as string[] };
}

const inputCls = "w-full border border-line bg-paper px-3 py-2 text-sm rounded-none";
const labelCls = "block text-xs tracking-widest uppercase text-muted mb-1";

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);
  const [msg, setMsg] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const sb = getSupabase();
    const { data } = await sb.from("vehicles").select("*").order("sort_order").order("name");
    setRows(data ?? []);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) { setReady(true); return; }
    const sb = getSupabase();
    sb.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setReady(true);
      if (data.session) load();
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session);
      if (session) load();
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  async function signIn(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    const sb = getSupabase();
    const { error } = await sb.auth.signInWithPassword({ email, password: pass });
    if (error) setMsg(error.message);
  }
  async function signOut() { await getSupabase().auth.signOut(); setRows([]); setForm(null); }

  async function uploadImage(file: File) {
    setBusy(true);
    try {
      const sb = getSupabase();
      const path = `${(form?.slug || "vehicle").replace(/[^a-z0-9-]/gi,"-")}/${Date.now()}-${file.name.replace(/[^a-z0-9.\-]/gi,"_")}`;
      const { error } = await sb.storage.from(VEHICLE_BUCKET).upload(path, file, { upsert: true });
      if (error) { setMsg(error.message); return; }
      const { data } = sb.storage.from(VEHICLE_BUCKET).getPublicUrl(path);
      setForm((f) => f ? { ...f, images: [...f.images, data.publicUrl], hero_image: f.hero_image || data.publicUrl } : f);
    } finally { setBusy(false); }
  }

  async function save() {
    if (!form) return;
    if (!form.slug || !form.name) { setMsg("Reikia įvesti pavadinimą ir nuorodą (slug)."); return; }
    setBusy(true); setMsg("");
    const payload: Row = { ...form };
    NUM_FIELDS.forEach((k) => { payload[k] = payload[k] === "" || payload[k] === null ? null : Number(payload[k]); });
    TEXT_FIELDS.forEach((k) => { if (payload[k] === "") payload[k] = null; });
    if (payload.transmission === "") payload.transmission = null;
    ["description_lt","description_ru","description_lv","description_en"].forEach((k)=>{ if(payload[k]==="") payload[k]=null; });
    payload.hero_image = payload.hero_image || payload.images?.[0] || null;
    try {
      const sb = getSupabase();
      let error;
      if (payload.id) { ({ error } = await sb.from("vehicles").update(payload).eq("id", payload.id)); }
      else { ({ error } = await sb.from("vehicles").insert(payload)); }
      if (error) { setMsg(error.message); return; }
      setForm(null);
      await load();
    } finally { setBusy(false); }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Ištrinti „${name}"?`)) return;
    const sb = getSupabase();
    const { error } = await sb.from("vehicles").delete().eq("id", id);
    if (error) setMsg(error.message); else load();
  }

  if (!ready) return <div className="container-luxe pt-36 pb-24">Kraunama…</div>;

  if (!isSupabaseConfigured)
    return (
      <div className="container-luxe pt-36 pb-24 max-w-xl">
        <h1 className="display text-3xl mb-4">Administravimas</h1>
        <p className="text-muted text-sm leading-relaxed">Duomenų bazė dar nesukonfigūruota. Įdėkite Supabase raktus į <code>.env.local</code> failą ir paleiskite serverį iš naujo.</p>
      </div>
    );

  if (!authed)
    return (
      <div className="container-luxe pt-36 pb-24 max-w-sm">
        <h1 className="display text-3xl mb-6">Prisijungimas</h1>
        <form onSubmit={signIn} className="space-y-4">
          <div><label className={labelCls}>El. paštas</label><input className={inputCls} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></div>
          <div><label className={labelCls}>Slaptažodis</label><input className={inputCls} type="password" value={pass} onChange={(e)=>setPass(e.target.value)} required /></div>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
          <button className="bg-champagne text-paper px-6 py-2.5 text-xs font-semibold tracking-widest uppercase">Prisijungti</button>
        </form>
      </div>
    );

  return (
    <div className="container-luxe pt-32 pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="display text-3xl sm:text-4xl">Automobilių valdymas</h1>
        <div className="flex gap-3">
          <button onClick={()=>{ setForm(emptyForm()); setMsg(""); }} className="bg-champagne text-paper px-5 py-2.5 text-xs font-semibold tracking-widest uppercase">+ Pridėti</button>
          <button onClick={signOut} className="border border-line px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-muted hover:text-ink">Atsijungti</button>
        </div>
      </div>

      {msg && <p className="text-sm text-red-600 mb-4">{msg}</p>}

      {form ? (
        <div className="border border-line p-6 sm:p-8 bg-paper-2/40">
          <h2 className="text-lg font-medium mb-6">{form.id ? "Redaguoti" : "Naujas automobilis"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div><label className={labelCls}>Pavadinimas *</label><input className={inputCls} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></div>
            <div><label className={labelCls}>Nuoroda (slug) *</label><input className={inputCls} value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})}/></div>
            <div><label className={labelCls}>Kategorija</label>
              <select className={inputCls} value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>
                <option value="camper">Kemperis</option><option value="minibus">Mikroautobusas</option>
              </select></div>
            <div><label className={labelCls}>Bazė</label><input className={inputCls} value={form.chassis} onChange={(e)=>setForm({...form,chassis:e.target.value})}/></div>
            <div><label className={labelCls}>Variklis</label><input className={inputCls} value={form.engine} onChange={(e)=>setForm({...form,engine:e.target.value})}/></div>
            <div><label className={labelCls}>Pavarų dėžė</label>
              <select className={inputCls} value={form.transmission} onChange={(e)=>setForm({...form,transmission:e.target.value})}>
                <option value="">—</option><option value="manual">Mechaninė</option><option value="automatic">Automatinė</option>
              </select></div>
            <div><label className={labelCls}>Galia (kW)</label><input className={inputCls} value={form.power_kw} onChange={(e)=>setForm({...form,power_kw:e.target.value})}/></div>
            <div><label className={labelCls}>Galia (AG)</label><input className={inputCls} value={form.power_hp} onChange={(e)=>setForm({...form,power_hp:e.target.value})}/></div>
            <div><label className={labelCls}>Metai</label><input className={inputCls} value={form.year} onChange={(e)=>setForm({...form,year:e.target.value})}/></div>
            <div><label className={labelCls}>Sėdimos vietos</label><input className={inputCls} value={form.seats} onChange={(e)=>setForm({...form,seats:e.target.value})}/></div>
            <div><label className={labelCls}>Miegamos vietos</label><input className={inputCls} value={form.berths} onChange={(e)=>setForm({...form,berths:e.target.value})}/></div>
            <div><label className={labelCls}>Ilgis (cm)</label><input className={inputCls} value={form.length_cm} onChange={(e)=>setForm({...form,length_cm:e.target.value})}/></div>
            <div><label className={labelCls}>Aukštis (cm)</label><input className={inputCls} value={form.height_cm} onChange={(e)=>setForm({...form,height_cm:e.target.value})}/></div>
            <div><label className={labelCls}>Plotis (cm)</label><input className={inputCls} value={form.width_cm} onChange={(e)=>setForm({...form,width_cm:e.target.value})}/></div>
            <div><label className={labelCls}>Masė (kg)</label><input className={inputCls} value={form.weight_kg} onChange={(e)=>setForm({...form,weight_kg:e.target.value})}/></div>
            <div><label className={labelCls}>Vandens bakas (l)</label><input className={inputCls} value={form.water_l} onChange={(e)=>setForm({...form,water_l:e.target.value})}/></div>
            <div><label className={labelCls}>Kuro bakas (l)</label><input className={inputCls} value={form.fuel_tank_l} onChange={(e)=>setForm({...form,fuel_tank_l:e.target.value})}/></div>
            <div><label className={labelCls}>Sąnaudos</label><input className={inputCls} value={form.consumption} onChange={(e)=>setForm({...form,consumption:e.target.value})}/></div>
            <div><label className={labelCls}>Rikiavimas</label><input className={inputCls} value={form.sort_order} onChange={(e)=>setForm({...form,sort_order:e.target.value})}/></div>
          </div>

          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e)=>setForm({...form,featured:e.target.checked})}/> Rekomenduojamas</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.vip} onChange={(e)=>setForm({...form,vip:e.target.checked})}/> VIP</label>
          </div>

          <div className="mt-6">
            <label className={labelCls}>Komplektacija</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {FEATURES.map((f)=>(
                <label key={f} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.features.includes(f)} onChange={(e)=>{
                    setForm({...form, features: e.target.checked ? [...form.features,f] : form.features.filter((x:string)=>x!==f)});
                  }}/> {FEATURE_LT[f]}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6"><label className={labelCls}>Aprašymas (LT)</label><textarea className={inputCls} rows={3} value={form.description_lt} onChange={(e)=>setForm({...form,description_lt:e.target.value})}/></div>

          <div className="mt-6">
            <label className={labelCls}>Nuotraukos</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images.map((img:string,i:number)=>(
                <div key={i} className="relative w-28 h-20 border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button onClick={()=>setForm({...form, images: form.images.filter((_:string,j:number)=>j!==i), hero_image: form.hero_image===img ? (form.images.find((x:string)=>x!==img)||"") : form.hero_image})} className="absolute top-0 right-0 bg-black/70 text-white w-5 h-5 text-xs leading-none">×</button>
                  <button onClick={()=>setForm({...form,hero_image:img})} className={`absolute bottom-0 left-0 right-0 text-[10px] uppercase tracking-widest py-0.5 ${form.hero_image===img?'bg-champagne text-paper':'bg-black/60 text-white'}`}>{form.hero_image===img?'Pagrindinė':'Nustatyti'}</button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" disabled={busy} onChange={(e)=>{ const f=e.target.files?.[0]; if(f) uploadImage(f); e.target.value=""; }} />
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={save} disabled={busy} className="bg-champagne text-paper px-6 py-2.5 text-xs font-semibold tracking-widest uppercase disabled:opacity-50">{busy?"Saugoma…":"Išsaugoti"}</button>
            <button onClick={()=>setForm(null)} className="border border-line px-6 py-2.5 text-xs font-semibold tracking-widest uppercase text-muted">Atšaukti</button>
          </div>
        </div>
      ) : (
        <div className="border border-line divide-y divide-line">
          {rows.map((r)=>(
            <div key={r.id} className="flex items-center gap-4 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.hero_image || r.images?.[0] || "/logo.svg"} alt="" className="w-20 h-14 object-cover bg-graphite shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.name} {r.vip && <span className="text-champagne text-xs">VIP</span>}</div>
                <div className="text-xs text-muted">{r.category === "camper" ? "Kemperis" : "Mikroautobusas"} · {r.slug}{r.featured ? " · rekomenduojamas" : ""}</div>
              </div>
              <button onClick={()=>{ setForm({ ...emptyForm(), ...r, features: r.features ?? [], images: r.images ?? [] }); setMsg(""); }} className="text-xs tracking-widest uppercase text-champagne">Redaguoti</button>
              <button onClick={()=>remove(r.id, r.name)} className="text-xs tracking-widest uppercase text-red-600">Trinti</button>
            </div>
          ))}
          {rows.length === 0 && <div className="p-6 text-sm text-muted">Nėra automobilių. Paspauskite „+ Pridėti".</div>}
        </div>
      )}
    </div>
  );
}
