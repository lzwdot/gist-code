import React from 'react'
import { View, Image } from '@tarojs/components'
import './loading.css'

const url = require('../resource/spiner.gif')

class Loading extends React.Component {
  render () {
    return (
      <View className='loading'>
        <Image src={url} className='img' />
      </View>
    )
  }
}

export { Loading }