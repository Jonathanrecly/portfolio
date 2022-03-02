const path = require('path')

function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}

const aliases = {
    '@src': '',
    '@router': 'router/',
    '@modules': 'modules',
    '@views': 'router/views/',
    '@pages': 'router/pages/',
    '@layouts': 'router/layouts/',
    '@components': 'components/',
    '@assets': 'assets/',
    '@store': 'store/',
    // '@design': 'design/index.scss',
    '@plugins': 'plugins/',
    '@APIs': 'API/',
    '@page': 'router/pages/',
    '@forms': 'router/forms/',
    '@widgets': 'router/widgets',
    // '@compositions': 'composition/',
    '@libs': 'libs/',
    '@mixins': 'mixins',
    '@exceptions': 'exceptions/'

}

module.exports = {
  webpack: {},
  jest: {},
}

for (const alias in aliases) {
  module.exports.webpack[alias] = resolveSrc(aliases[alias])
  module.exports.jest['^' + alias + '/(.*)$'] =
    '<rootDir>/resources/js/' + aliases[alias] + '/$1'
}
