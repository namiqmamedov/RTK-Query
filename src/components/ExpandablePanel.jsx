import React,{useState} from 'react'
import { GoChevronLeft, GoChevronDown } from 'react-icons/go';

function ExpandablePanel({header,children}) {

    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
    <div className='panelMain'>
        <div className='topArrangement'>
            <div className='topArrangement'>{header}</div>
            <div onClick={handleClick}>
             {expanded ? <GoChevronDown/> : <GoChevronLeft/>}
            </div>
        </div>
        {expanded && <div>{children}</div>} 
        </div>
  )
}

export default ExpandablePanel