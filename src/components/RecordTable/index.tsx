/* eslint-disable @next/next/no-img-element */
import { IoMdCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

export const RecordTable = (props: {record: boolean[]}) => {

  const defaultSize = 32;
  const temp = [false, true, true, true, false, false, true, true, true,];
    // props.record

  return (
    <div className="grid grid-cols-7 gap-4 py-8">
        {props.record.map((item, i) =>(
        <div key={i}>
            {item
            ? <IoMdCheckmarkCircle fontSize={defaultSize} color="#00ff00"/>
            : <IoIosCloseCircle fontSize={defaultSize} color="#ff0000"/>
            }
        </div>
  ))
}
    </div>
  )
}