import Mockjs from 'mockjs';
import {delay} from 'roadhog-api-doc';

const DATA = {
  'Get /api/dish/list': Mockjs.mock({
    code: 200,
    message: '成功',
    'data|20': [
      {
        'id|+1': 1,
        name: '@cname',
        desc: '@cparagraph(1, 5)',
        image: '@image(64x64)'
      }
    ]
  })
};

// 调用 delay 函数，统一处理
export default delay(DATA, 800);
