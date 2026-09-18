import { describe, expect, it } from 'vitest'
import { configs } from '../configs'
import eolLast from './eol-last/eol-last'
import indent from './indent/indent'
import linebreakStyle from './linebreak-style/linebreak-style'
import listStyle from './list-style/list-style'
import noTrailingSpaces from './no-trailing-spaces/no-trailing-spaces'

function getLanguages(rule: { meta?: unknown }) {
  return (rule.meta as { languages?: string[] } | undefined)?.languages
}

describe('rule language metadata', () => {
  it('scopes shared configs to JavaScript-family files', () => {
    const files = ['**/*.?([cm])[jt]s?(x)', '**/*.{astro,svelte,vue}']
    expect(configs.recommended.files).toEqual(files)
    expect(configs.all.files).toEqual(files)
  })

  it('limits syntax-aware rules to JavaScript-family languages', () => {
    expect(getLanguages(indent)).toEqual(['js/*'])
  })

  it('includes JSON for the list-style rule', () => {
    expect(getLanguages(listStyle)).toEqual(['js/*', 'json/*'])
  })

  it('allows text-only rules in any language', () => {
    for (const rule of [eolLast, linebreakStyle, noTrailingSpaces])
      expect(getLanguages(rule)).toEqual(['*'])
  })
})
