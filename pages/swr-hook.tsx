import { StudentDetail } from '@/components/swr'
import { useState } from 'react'

export default function SWRHookDemoPage() {
  const [detailList, setDetailList] = useState([1, 1, 1])

  function handleAddClick() {
    setDetailList((prevList) => [...prevList, 1])
  }

  return (
    <div>
      <h1>SWR Hook Demo</h1>
      <button onClick={handleAddClick}>Add detail</button>

      <ul>
        {detailList.map((x, idx) => (
          <li key={idx}>
            <StudentDetail studentId="lea11ziflg8xoize" />
          </li>
        ))}
      </ul>
    </div>
  )
}
