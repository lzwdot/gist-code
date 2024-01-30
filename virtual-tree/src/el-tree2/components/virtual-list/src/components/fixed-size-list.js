import { isString, debugWarn } from '../../../../utils'
import buildList from '../builders/build-list'
import { isHorizontal } from '../utils'
import {
  AUTO_ALIGNMENT,
  CENTERED_ALIGNMENT,
  END_ALIGNMENT,
  SMART_ALIGNMENT,
  START_ALIGNMENT,
} from '../defaults'


const FixedSizeList = buildList({
  getItemOffset: ({ itemSize }, index) => index * (itemSize),

  getItemSize: ({ itemSize }) => itemSize,

  getEstimatedTotalSize: ({ total, itemSize }) => (itemSize) * total,

  getOffset: (
    { height, total, itemSize, layout, width },
    index,
    alignment,
    scrollOffset
  ) => {
    const size = (isHorizontal(layout) ? width : height)
    if (process.env.NODE_ENV !== 'production' && isString(size)) {
      debugWarn(
        '[V2VirtualList]',
        `
        You should set
          width/height
        to number when your layout is
          horizontal/vertical
      `
      )
    }
    const lastItemOffset = Math.max(0, total * (itemSize) - size)
    const maxOffset = Math.min(lastItemOffset, index * (itemSize))
    const minOffset = Math.max(0, (index + 1) * (itemSize) - size)

    if (alignment === SMART_ALIGNMENT) {
      if (
        scrollOffset >= minOffset - size &&
        scrollOffset <= maxOffset + size
      ) {
        alignment = AUTO_ALIGNMENT
      } else {
        alignment = CENTERED_ALIGNMENT
      }
    }

    switch (alignment) {
      case START_ALIGNMENT: {
        return maxOffset
      }
      case END_ALIGNMENT: {
        return minOffset
      }
      case CENTERED_ALIGNMENT: {
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2)
        if (middleOffset < Math.ceil(size / 2)) {
          return 0 // near the beginning
        } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
          return lastItemOffset // near the end
        } else {
          return middleOffset
        }
      }
      case AUTO_ALIGNMENT:
      default: {
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset
        } else if (scrollOffset < minOffset) {
          return minOffset
        } else {
          return maxOffset
        }
      }
    }
  },

  getStartIndexForOffset: ({ total, itemSize }, offset) =>
    Math.max(0, Math.min(total - 1, Math.floor(offset / (itemSize)))),

  getStopIndexForStartIndex: (
    { height, total, itemSize, layout, width },
    startIndex,
    scrollOffset
  ) => {
    const offset = startIndex * (itemSize)
    const size = isHorizontal(layout) ? width : height
    const numVisibleItems = Math.ceil(
      ((size) + scrollOffset - offset) / (itemSize)
    )
    return Math.max(
      0,
      Math.min(
        total - 1,
        // because startIndex is inclusive, so in order to prevent array outbound indexing
        // we need to - 1 to prevent outbound behavior
        startIndex + numVisibleItems - 1
      )
    )
  }
})

export default FixedSizeList
