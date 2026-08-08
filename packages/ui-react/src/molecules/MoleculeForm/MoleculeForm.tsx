import React from 'react'

/**
 * TYPE DEFINITIONS
 * -----------------------------------------------------------------------------
 */
interface MoleculeFormProps {
  title?: string
  name?: string
  onUpdateName?: (value: string) => void
  age?: number
  onUpdateAge?: (value: number) => void
}

/**
 * MoleculeForm COMPONENT
 * -----------------------------------------------------------------------------
 */
export default function MoleculeForm({
  title = '',
  name = '',
  onUpdateName = () => {},
  age = 0,
  onUpdateAge = () => {},
}: MoleculeFormProps) {
  return (
    <div className="molecule-form" data-testid="molecule-form">
      <fieldset className="text-foreground" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
        {title && <legend style={{ fontWeight: 'bold', padding: '0 8px' }}>{title}</legend>}

        {/* Name Input Field */}
        <div style={{ marginBottom: '12px', display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="form-name-input" style={{ marginBottom: '4px', fontSize: '14px' }}>Name:</label>
          <input
            id="form-name-input"
            type="text"
            value={name}
            onChange={(e) => onUpdateName(e.target.value)}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #999' }}
          />
        </div>

        {/* Age Input Field */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="form-age-input" style={{ marginBottom: '4px', fontSize: '14px' }}>Age:</label>
          <input
            id="form-age-input"
            type="number"
            value={age}
            onChange={(e) => onUpdateAge(Number(e.target.value))}
            style={{ padding: '6px', borderRadius: '4px', border: '1px solid #999' }}
          />
        </div>
      </fieldset>
    </div>
  )
}
