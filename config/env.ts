
const NODE_ENV = process.env.NODE_ENV as 'development' | 'production';

export default Object.freeze({

  BASE_URL: '/practical',

  NODE_ENV,

  PROJECT_NAME: 'Practical',

  API_BASE_URL: '/trail'

})
