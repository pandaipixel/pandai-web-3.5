'use client'

import { useState, useEffect } from 'react'

export interface PandaiCount {
  users: number
  questions: number
  quizzess: number
  teachers: number
}

const COUNT_URL = 'https://pandai.org/count/'

const FALLBACK: PandaiCount = {
  users: 878501,
  questions: 722682777,
  quizzess: 86750,
  teachers: 92610,
}

export function usePandaiCount(): PandaiCount {
  const [count, setCount] = useState<PandaiCount>(FALLBACK)

  useEffect(() => {
    fetch(COUNT_URL)
      .then((r) => r.json())
      .then((json) =>
        setCount({
          users: json.users,
          questions: json.questions,
          quizzess: json.quizzess,
          teachers: json.teachers,
        })
      )
      .catch(() => {})
  }, [])

  return count
}
