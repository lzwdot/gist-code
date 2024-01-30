import Taro from "@tarojs/taro";
import React from "react";
import { View } from "@tarojs/components";
import { ThreadList } from "../../components/thread_list";
import { IThread } from "../../interfaces/thread";
import api from "../../utils/api";

import "./index.scss";

interface IState {
  loading: boolean;
  threads: IThread[];
}

// export default class Index extends Component<PropsWithChildren> {
class Index extends React.Component<{}, IState> {
  config = {
    navigationBarTitleText: "首页"
  };

  state = {
    loading: true,
    threads: []
  };

  componentWillMount() {}

  async componentDidMount() {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getLatestTopic()
      });
      this.setState({
        threads: res.data,
        loading: false
      });
    } catch (err) {
      Taro.showToast({
        title: "载入远程数据错误"
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { loading, threads } = this.state;
    return (
      <View className="index">
        {/* <Text>Hello world!</Text> */}
        <ThreadList threads={threads} loading={loading} />
      </View>
    );
  }
}

export default Index;
