import { ElMessage } from "element-plus"

// 复制文本
export const useCopy = (text: string) => {
    // 创建输入框
    const input = document.createElement('input')
    // 设置值
    input.value = text
    // 追加到 body 里面
    document.body.appendChild(input)
    // 选择输入框
    input.select()
    // 执行复制
    document.execCommand('Copy')
    // 移除 input
    document.body.removeChild(input)
    // 提示复制成功
    ElMessage.success('复制成功')
}