import React from 'react'
import Icon from './Icon'

function PreviewStat({ icon, label, value, unit }) {
  return (
      <div className="rounded-lg bg-[#f8f6fa] p-[13px] max-[1000px]:p-[9px]">
          <Icon name={icon} className="mb-2 size-4 text-[#886995]" />

          <span className="block text-[9px] text-[#7b737e]">{label}</span>

          <strong className="mt-1 flex items-baseline gap-1.5 text-[27px] font-medium max-[1000px]:text-[23px]">
              {value}

              <span className="text-[8px] font-normal text-[#7b737e] max-[440px]:hidden">
                  {unit}
              </span>
          </strong>
      </div>
  );
}

export default PreviewStat