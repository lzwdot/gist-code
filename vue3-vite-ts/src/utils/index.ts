
/**
 * 驼峰转横杆连接
 * @param value 
 * @returns 
 */
export const toLine = (value: string) => {
    return value.replace(/([^A-Z]+)([A-Z])/g, '$1-$2').toLocaleLowerCase()
}