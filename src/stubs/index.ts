import { Ticket } from '../models';

export const tickets: Ticket[] = [
  {
    "price": 29224,
    "carrier": "S7",
    "segments": [
      {
        "origin": "MOW",
        "destination": "HKT",
        "date": "2021-09-30T00:18:00.000Z",
        "stops": [],
        "duration": 1785
      },
      {
        "origin": "HKT",
        "destination": "MOW",
        "date": "2021-10-20T04:37:00.000Z",
        "stops": [
          "BKK",
          "HKG",
          "AUH"
        ],
        "duration": 1394
      }
    ]
  },
  {
    "price": 55913,
    "carrier": "MH",
    "segments": [
      {
        "origin": "MOW",
        "destination": "HKT",
        "date": "2021-09-30T15:14:00.000Z",
        "stops": [
          "SHA",
          "DXB"
        ],
        "duration": 1223
      },
      {
        "origin": "HKT",
        "destination": "MOW",
        "date": "2021-10-20T12:48:00.000Z",
        "stops": [
          "KUL"
        ],
        "duration": 1362
      }
    ]
  }
]
