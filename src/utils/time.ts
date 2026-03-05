//封装一个函数，获取是早上、中午、下午还是晚上
export const getTimeOfDay = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return '早上'
  } else if (hour >= 12 && hour < 13) {
    return '中午'
  } else if (hour >= 13 && hour < 18) {
    return '下午'
  } else if (hour >= 18 && hour < 24) {
    return '晚上'
  } else {
    return '凌晨'
  }
}
