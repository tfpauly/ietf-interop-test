export default

{
  name: 'Age Parsing',
  id: 'age-parse',
  description: 'These tests check how implementations parse the `Age` response header.',
  spec_anchors: ['field.age', 'expiration.model'],
  tests: [
    {
      name: 'HTTP cache should consider a response with a non-numeric `Age` header to be stale',
      id: 'age-parse-nonnumeric',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', 'abc', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with a negative `Age` header to be stale',
      id: 'age-parse-negative',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '-7200', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with a float `Age` header to be stale',
      id: 'age-parse-float',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '7200.0', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with a `Age` header with `old, 0` to be stale',
      id: 'age-parse-suffix',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '7200,0', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with a `Age` header with `0, old` to be stale',
      id: 'age-parse-prefix',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '0,7200', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with two `Age` header lines to be stale (old, `0`)',
      id: 'age-parse-suffix-twoline',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '7200', false],
            ['Age', '0', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with two `Age` header lines to be stale (`0`, old)',
      id: 'age-parse-prefix-twoline',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '0', false],
            ['Age', '7200', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with `Age: 0, 0` to be stale',
      id: 'age-parse-dup-0',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '0, 0', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with two `Age: 0` header lines to be stale',
      id: 'age-parse-dup-0-twoline',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '0', false],
            ['Age', '0', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with two `Age: 3600` header lines to be stale',
      id: 'age-parse-dup-old',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=10000'],
            ['Age', '3600, 3600', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with alphabetic parameter on `Age` header to be stale',
      id: 'age-parse-parameter',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '7200;foo=bar', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    },
    {
      name: 'HTTP cache should consider a response with numeric parameter on `Age` header to be stale',
      id: 'age-parse-numeric-parameter',
      depends_on: ['freshness-max-age-age'],
      requests: [
        {
          response_headers: [
            ['Date', 0],
            ['Cache-Control', 'max-age=3600'],
            ['Age', '7200;foo=111', false]
          ],
          setup: true,
          pause_after: true
        },
        {
          expected_type: 'not_cached'
        }
      ]
    }
  ]
}
