
export default [
  {
    file: 'chrome.json',
    name: 'Chrome',
    type: 'browser',
    version: '79.0.3945.130'
  },
  {
    file: 'firefox.json',
    name: 'Firefox',
    type: 'browser',
    version: '73.0b9',
    link: 'https://github.com/http-tests/cache-tests/wiki/Firefox'
  },
  {
    file: 'safari.json',
    name: 'Safari',
    type: 'browser',
    version: '14.0 (15610.1.28.1.9, 15610)'
  },
  {
    file: 'nginx.json',
    name: 'nginx',
    type: 'rev-proxy',
    version: '1.18.0-6ubuntu2',
    link: 'https://github.com/http-tests/cache-tests/wiki/nginx'
  },
  {
    file: 'squid.json',
    name: 'Squid',
    type: 'rev-proxy',
    version: '4.13-1ubuntu2',
    link: 'https://github.com/http-tests/cache-tests/wiki/Squid'
  },
  {
    file: 'trafficserver.json',
    name: 'ATS',
    type: 'rev-proxy',
    version: '8.0.8+ds-2',
    link: 'https://github.com/http-tests/cache-tests/wiki/Traffic-Server'
  },
  {
    file: 'apache.json',
    name: 'httpd',
    type: 'rev-proxy',
    version: '2.4.46-1ubuntu1',
    link: 'https://github.com/http-tests/cache-tests/wiki/Apache-httpd'
  },
  {
    file: 'varnish.json',
    name: 'Varnish',
    type: 'rev-proxy',
    version: '6.4.0-3',
    link: 'https://github.com/http-tests/cache-tests/wiki/Varnish'
  },
  {
    file: 'nuster.json',
    name: 'nuster',
    type: 'rev-proxy',
    version: 'master',
    link: 'https://github.com/http-tests/cache-tests/wiki/nuster'
  },
  {
    file: 'fastly.json',
    name: 'Fastly',
    type: 'cdn',
    version: '06-05-2019',
    link: 'https://github.com/http-tests/cache-tests/wiki/Fastly'
  }
]
