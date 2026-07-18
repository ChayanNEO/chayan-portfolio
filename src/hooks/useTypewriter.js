import { useEffect, useState } from 'react'

function useTypewriter(words, { typingSpeed = 70, deletingSpeed = 40, pauseTime = 1600 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => prev + 1)
    } else {
      timeout = setTimeout(
        () => {
          const nextText = isDeleting
            ? currentWord.slice(0, text.length - 1)
            : currentWord.slice(0, text.length + 1)
          setText(nextText)
        },
        isDeleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

export default useTypewriter
