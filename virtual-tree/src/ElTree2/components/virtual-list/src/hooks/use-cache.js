import { memoize } from 'lodash'
import memoOne from 'memoize-one'

export const useCache = (perfMode) => {
  // eslint-disable-next-line
    const _getItemStyleCache = (_,  __, ___) => ({})
  return perfMode
    ? memoize(_getItemStyleCache)
    : memoOne(_getItemStyleCache)
}
