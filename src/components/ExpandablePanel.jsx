import React from 'react'
import { GoChevronLeft, GoChevronDown } from 'react-icons/go';

function ExpandablePanel({header,children}) {
    return (
    <div className='panelMain'>
        <div className='topArrangement'>
            <div className='topArrangement'>{header}</div>
            <div>
                <GoChevronLeft/>
            </div>
        </div>
        {children}
        </div>
  )
}

export default ExpandablePanel