'use client'

import React, { useState } from 'react'
import { MoleculeForm } from '@repo/ui-react'

export default function Home() {
  const [userName, setUserName] = useState<string>('John Doe')
  const [userAge, setUserAge] = useState<number>(25)

  return (
    <div
      className="test-page bg-background text-foreground h-100"
      style={{ padding: '24px', color: '#fff' }}
    >
      <h1>Hello world!</h1>

      <div
        style={{
          margin: '16px 0',
          padding: '12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '6px',
        }}
      >
        <p>
          Parent Name Reactivity: <strong>{userName}</strong>
        </p>
        <p>
          Parent Age Reactivity: <strong>{userAge}</strong>
        </p>
      </div>

      <MoleculeForm
        title="User Form Info"
        name={userName}
        onUpdateName={setUserName}
        age={userAge}
        onUpdateAge={setUserAge}
      />
    </div>
  )
}
