import { useCallback, useState } from 'react'

interface TraitCardProps {
  name: string
  setTrait: (trait: string) => void
}

export const Trait = ({ name, setTrait }: TraitCardProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = useCallback(() => {
    setTrait(name)
  }, [setTrait, name])

  return (
    <div
      className={`mb-3 mr-3 flex cursor-pointer flex-col items-center justify-center border ${
        isFocused ? 'focus-outline' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick()
        }
      }}
    >
      <div className="aspect-w-1 aspect-h-1 overflow-hidden">{name}</div>
    </div>
  )
}
