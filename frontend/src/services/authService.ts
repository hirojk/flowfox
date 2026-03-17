const hashPassword = async (password: string): Promise<string> => {
  const data = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  return Array.from(new Uint8Array(hashBuffer))
    .map((buffer) => buffer.toString(16).padStart(2, '0'))
    .join('')
}

export const checkTestAuth = async (): Promise<boolean> => {
  if (import.meta.env.APP_ENV !== 'development') {
    return true
  }

  const expectedHash = await hashPassword(import.meta.env.DEV_PASS)

  if (sessionStorage.getItem('testAuth') === expectedHash) {
    return true
  }

  const password = window.prompt('Test Environment\n\nPassword:')
  const isValid = !!password && (await hashPassword(password)) === expectedHash

  if (isValid) sessionStorage.setItem('testAuth', expectedHash)
  else window.alert(password ? 'Invalid password!' : 'Password required!')

  return isValid || checkTestAuth()
}
