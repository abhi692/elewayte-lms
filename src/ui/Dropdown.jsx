import { useEffect, useRef, useState } from "react";

export default function Dropdown({ button, children, align="right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{
    const h = (e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", h);
    return ()=>document.removeEventListener("click", h);
  },[]);
  return (
    <div className="relative" ref={ref}>
      <button onClick={()=>setOpen(v=>!v)}>{button}</button>
      {open && (
        <div className={`absolute ${align==="right"?"right-0":"left-0"} mt-2 w-48 bg-white border rounded-lg shadow-lg text-sm`}>
          {children({ close: ()=>setOpen(false) })}
        </div>
      )}
    </div>
  );
}
