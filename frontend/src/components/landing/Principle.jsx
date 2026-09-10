import React from 'react'
import Icon from './Icon'

function Principle({ children, icon }) {
  return (
      <span className="flex items-center gap-3 text-xs text-[#6e5b7c] max-[1000px]:gap-[7px] max-[1000px]:text-[10px] max-[760px]:gap-3 max-[760px]:text-xs max-[440px]:text-[10px]">
          <Icon name={icon} />
          {children}
      </span>
  );
}

export default Principle