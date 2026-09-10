import React from 'react'
import { Link } from 'react-router-dom';

function Brand({ footer = false }) {
  return (
      <Link
          to="/"
          aria-label="Lead By Example home"
          className={`flex items-center text-[#5b3c78] ${
              footer
                  ? "gap-3 text-[11px]"
                  : "gap-3 text-sm font-semibold tracking-[0.03em]"
          }`}
      >
          <span
              className={`grid place-items-center bg-[#5b3c78] font-semibold tracking-[-0.06em] text-[#f0cdb7] ${
                  footer
                      ? "size-[34px] rounded-[10px] text-[13px]"
                      : "size-[43px] rounded-[13px] text-base max-[440px]:size-9"
              }`}
          >
              LBE
          </span>

          <span>
              Lead. By. Example
              <span
                  className={`mt-1 block font-medium tracking-[0.14em] ${
                      footer ? "text-[6px]" : "text-[7px] max-[760px]:hidden"
                  }`}
              >
                  HUMAN RESOURCE INFORMATION SYSTEM
              </span>
          </span>
      </Link>
  );
}

export default Brand