
export default

{
  name: 'Expires Parsing',
  id: 'expires-parse',
  description: 'These tests check how caches parse the `Expires` response header.',
  spec_anchors: ['field.expires'],
  tests: [
    {
      name: 'Does HTTP cache reuse a response with an `Expires` that is exactly 32 bits?',
      id: 'freshness-expires-32bit',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Tue 19 Jan 2038 14:14:08 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` that is far in the future?',
      id: 'freshness-expires-far-future',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Sun 21 Nov 2286 04:46:39 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` in obsolete RFC 850 format?',
      id: 'freshness-expires-rfc850',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thursday, 18-Aug-50 02:01:18 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` in ANSI C\'s asctime() format?',
      id: 'freshness-expires-ansi-c',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu Aug  8 02:01:18 2050', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` using wrong case (weekday)?',
      id: 'freshness-expires-wrong-case-weekday',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'THU, 18 Aug 2050 02:01:18 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` using wrong case (month)?',
      id: 'freshness-expires-wrong-case-month',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 AUG 2050 02:01:18 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an `Expires` using wrong case (tz)?',
      id: 'freshness-expires-wrong-case-tz',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 02:01:18 gMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (UTC)?',
      id: 'freshness-expires-invalid-utc',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 02:01:18 UTC', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (other tz)?',
      id: 'freshness-expires-invalid-aest',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 02:01:18 AEST', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (two-digit year)?',
      id: 'freshness-expires-invalid-2-digit-year',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 50 02:01:18 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (missing comma)?',
      id: 'freshness-expires-invalid-no-comma',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu 18 Aug 2050 02:01:18 GMT', false],
            ['Date', 0]
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
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (multiple spaces)?',
      id: 'freshness-expires-invalid-multiple-spaces',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18  Aug  2050 02:01:18 GMT', false],
            ['Date', 0]
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (date dashes)?',
      id: 'freshness-expires-invalid-date-dashes',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18-Aug-2050 02:01:18 GMT', false],
            ['Date', 0]
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (time periods)?',
      id: 'freshness-expires-invalid-time-periods',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 02.01.18 GMT', false],
            ['Date', 0]
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (1-digit hour)?',
      id: 'freshness-expires-invalid-1-digit-hour',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 2:01:18 GMT', false],
            ['Date', 0]
          ],
          setup: true
        },
        {
          expected_type: 'cached'
        }
      ]
    },
    {
      name: 'Does HTTP cache reuse a response with an invalid `Expires` (multiple lines)?',
      id: 'freshness-expires-invalid-multiple-lines',
      kind: 'check',
      depends_on: ['freshness-expires-future'],
      requests: [
        {
          response_headers: [
            ['Expires', 'Thu, 18 Aug 2050 2:01:18 GMT', false],
            ['Expires', 'Thu, 18 Aug 2050 2:01:19 GMT', false],
            ['Date', 0]
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
