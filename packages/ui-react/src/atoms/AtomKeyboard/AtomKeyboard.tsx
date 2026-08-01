export interface AtomKeyboardProps {
  character?: string
}

export const AtomKeyboard = ({ character = '' }: AtomKeyboardProps) => {
  return (
    <kbd
      className="atom-keyboard bg-card border-border text-foreground rounded border px-1 font-mono shadow-sm"
      data-testid="atom-keyboard"
    >
      {character}
      <span className="sr-only">atom-keyboard</span>
    </kbd>
  )
}

export default AtomKeyboard
