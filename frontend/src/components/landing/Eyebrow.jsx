import React from 'react'

function Eyebrow({ children, dot = false, light = false }) {
  return (
    <p
      className={`text-[10px] font-semibold tracking-[0.17em] ${
        light ? "text-[#d6bddc]" : "text-[#896c92]"
      } ${dot ? "flex items-center gap-[9px]" : ""}`}
    >
      {dot && <span className="size-1.5 rounded-full bg-[#a786b5]" />}

      {children}
    </p>
  )
}

export default Eyebrow