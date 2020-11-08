
export default

{
  name: 'Pragma',
  id: 'pragma',
  description: 'These tests check how caches handle the deprecated `Pragma` header in reqeusts and responses.',
  spec_anchors: ['field.pragma'],
  tests: [
    {
      name: 'Does HTTP cache use a stored fresh response when request contains `Pragma: no-cache`?',
      id: 'pragma-request-no-cache',
      kind: 'check',
      requests: [
        {
          response_headers: [
            ['Cache-Control', 'max-age=3600']
          ],
          setup: true
        },
        {
          request_headers: [
            ['Pragma', 'no-cache']
          ],
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a stored fresh response when request contains `Pragma: unrecognised-extension`?',
      id: 'pragma-request-extension',
      kind: 'check',
      requests: [
        {
          response_headers: [
            ['Cache-Control', 'max-age=3600']
          ],
          setup: true
        },
        {
          request_headers: [
            ['Pragma', 'unrecognised-extension']
          ],
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a stored and otherwise fresh response when it contains `Pragma: no-cache`?',
      id: 'pragma-response-no-cache',
      kind: 'check',
      requests: [
        {
          response_headers: [
            ['Cache-Control', 'max-age=3600'],
            ['Pragma', 'no-cache']
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a stored and heuristically fresh response when it contains `Pragma: no-cache`?',
      id: 'pragma-response-no-cache-heuristic',
      kind: 'check',
      requests: [
        {
          response_headers: [
            ['Last-Modified', -10000],
            ['Pragma', 'no-cache']
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache use a stored and otherwise fresh response when it contains `Pragma: unrecognised-extension`?',
      id: 'pragma-response-extension',
      kind: 'check',
      requests: [
        {
          response_headers: [
            ['Cache-Control', 'max-age=3600'],
            ['Pragma', 'unrecognised-extension']
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    }
  ]
}
