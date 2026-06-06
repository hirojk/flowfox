import tokensJson from '../styles/tokens.json'

type TokenValue = { value: string }
type TokenNode = TokenValue | { [key: string]: TokenNode }

function isTokenValue(val: TokenNode): val is TokenValue {
  return 'value' in val && typeof (val as TokenValue).value === 'string'
}

function flattenTokens(obj: Record<string, TokenNode>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key

    if (isTokenValue(val)) {
      result[newKey] = val.value
    } else {
      Object.assign(result, flattenTokens(val as Record<string, TokenNode>, newKey))
    }
  }

  return result
}

function resolveReferences(tokens: Record<string, string>): Record<string, string> {
  const resolved: Record<string, string> = { ...tokens }

  for (let i = 0; i < 10; i++) {
    let hasUnresolved = false

    for (const [key, value] of Object.entries(resolved)) {
      resolved[key] = value.replace(/\{([^}]+)\}/g, (original, ref: string) => {
        const refKey = ref.split('.').join('-')
        const refValue = resolved[refKey]

        if (refValue && !refValue.includes('{')) {
          return refValue
        }

        hasUnresolved = true
        return original
      })
    }

    if (!hasUnresolved) break
  }

  return resolved
}

function tokensToScss(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `$${key}: ${value};`)
    .join('\n')
}

export function buildFlatTokens(designTokens: Record<string, TokenNode>): Record<string, string> {
  const flat = flattenTokens(designTokens)
  return resolveReferences(flat)
}

export function buildScssTokens(designTokens: Record<string, TokenNode>): string {
  const flat = flattenTokens(designTokens)
  const resolved = resolveReferences(flat)
  return tokensToScss(resolved)
}

export const tokens = buildFlatTokens(tokensJson as Record<string, TokenNode>)
