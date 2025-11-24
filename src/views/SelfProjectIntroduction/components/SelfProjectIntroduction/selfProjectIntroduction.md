### 批量请求数据并增量渲染 ECharts 图表

```
// series配合修改
{
    name: '分布式光伏用户',
    type: 'scatter',
    coordinateSystem: 'geo',
    geoIndex: 1,
    z: 6,
    data: electricData.value,
    symbol: 'circle',
    symbolSize: 22,
    itemStyle: { color: '#2EB993' },
    progressive: 300,
    progressiveThreshold: 3000,
},

import { to } from '@web/common/util'
/**
 * 批量请求数据并增量渲染ECharts图表
 * @param {object} options - 配置项
 * @param {Function} options.apiFn - 获取数据的API函数，该函数应返回一个Promise
 * @param {object} options.apiParams - API函数的固定参数
 * @param {import('vue').Ref<any[]>} options.dataRef - 用于存储所有数据的ref对象
 * @param {object} options.chart - ECharts实例
 * @param {string} options.activeType - 当前激活的图表类型，用于判断是否需要渲染
 * @param {string} options.type - 此方法对应的图表类型
 * @param {number} options.seriesIndex - ECharts中需要追加数据的系列索引
 * @param {Function} options.dataMapper - 用于处理和映射单页数据的函数
 * @param {number} options.pageSize - 每页请求的数据量，默认值为1000
 * @param {Function} options.onCancelled - 一个返回布尔值的函数，用于检查操作是否应被取消
 */
export const loadDataIncrementally = async ({
  apiFn,
  apiParams = {},
  dataRef,
  chart,
  activeType,
  type,
  seriesIndex = 0,
  dataMapper,
  pageSize = 1000,
  onCancelled = () => false,
}) => {
  dataRef.value = []; // 开始前清空数据
  let page = 1;
  let hasMoreData = true;
  while (hasMoreData) {
    if (onCancelled()) break;

    const [res, err] = await to(
      apiFn({
        ...apiParams,
        pagination: {
          page,
          size: pageSize,
        },
      })
    );

    if (err) {
      console.error("获取数据失败:", err);
      hasMoreData = false;
      continue;
    }

    const newData = dataMapper(res.data) || [];

    if (newData.length > 0) {
      dataRef.value.push(...newData);
      if (chart && activeType.value === type) {
        chart.appendData({
          seriesIndex,
          data: newData,
        });
      }
    }

    if (newData.length < pageSize) {
      hasMoreData = false;
    } else {
      page++;
    }
  }
};
```
