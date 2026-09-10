import React from 'react'

function Icon({ name, className = "", ...props }) {
   const paths = {
       people: (
           <>
               <circle cx="9" cy="8" r="3" />
               <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m3 10v-3a6 6 0 0 0-2-4" />
           </>
       ),
       grid: (
           <>
               <rect x="3" y="3" width="7" height="7" rx="2" />
               <rect x="14" y="3" width="7" height="7" rx="2" />
               <rect x="3" y="14" width="7" height="7" rx="2" />
               <rect x="14" y="14" width="7" height="7" rx="2" />
           </>
       ),
       briefcase: (
           <>
               <rect x="3" y="7" width="18" height="14" rx="3" />
               <path d="M8 7V4h8v3M3 12a22 22 0 0 0 18 0M12 12v4" />
           </>
       ),
       arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
       check: <path d="m5 12 4 4L19 6" />,
   };

   return (
       <svg
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="1.6"
           strokeLinecap="round"
           strokeLinejoin="round"
           aria-hidden="true"
           className={`size-[21px] shrink-0 ${className}`}
           {...props}
       >
           {paths[name]}
       </svg>
   );
}

export default Icon