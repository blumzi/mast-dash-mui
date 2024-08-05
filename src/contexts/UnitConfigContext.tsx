// UnitConfigContext.tsx
import React, { createContext, useState, useMemo, ReactNode, useContext, useEffect } from 'react';
import { useSitesContext } from './SitesContext';
import { controlApi } from '../components/Api';

// type UnitConfig {
//   "count": 2,
//   "fields": [
//     {
//       "name": "_id",
//       "path": [
//         "_id"
//       ],
//       "count": 2,
//       "type": "ObjectId",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "ObjectId",
//           "path": [
//             "_id"
//           ],
//           "count": 2,
//           "probability": 1,
//           "unique": 2,
//           "hasDuplicates": false,
//           "values": [
//             "6667f000043f2952d41ad21b",
//             "666a9bba1809fa6c1b1d2641"
//           ],
//           "bsonType": "ObjectId"
//         }
//       ]
//     },
//     {
//       "name": "autofocus",
//       "path": [
//         "autofocus"
//       ],
//       "count": 1,
//       "type": [
//         "Document",
//         "Undefined"
//       ],
//       "probability": 0.5,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "autofocus"
//           ],
//           "count": 1,
//           "probability": 0.5,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "binning",
//               "path": [
//                 "autofocus",
//                 "binning"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "autofocus",
//                     "binning"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     2
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             },
//             {
//               "name": "exposure",
//               "path": [
//                 "autofocus",
//                 "exposure"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "autofocus",
//                     "exposure"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     5
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             },
//             {
//               "name": "images",
//               "path": [
//                 "autofocus",
//                 "images"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "autofocus",
//                     "images"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     5
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             },
//             {
//               "name": "spacing",
//               "path": [
//                 "autofocus",
//                 "spacing"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "autofocus",
//                     "spacing"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     100
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "name": "Undefined",
//           "bsonType": "Undefined",
//           "unique": 1,
//           "hasDuplicates": false,
//           "path": [
//             "autofocus"
//           ],
//           "count": 1,
//           "probability": 0.5
//         }
//       ]
//     },
//     {
//       "name": "camera",
//       "path": [
//         "camera"
//       ],
//       "count": 1,
//       "type": [
//         "Document",
//         "Undefined"
//       ],
//       "probability": 0.5,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "camera"
//           ],
//           "count": 1,
//           "probability": 0.5,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "ascom_driver",
//               "path": [
//                 "camera",
//                 "ascom_driver"
//               ],
//               "count": 1,
//               "type": "String",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "camera",
//                     "ascom_driver"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "ASCOM.ASICamera2.Camera"
//                   ],
//                   "bsonType": "String"
//                 }
//               ]
//             },
//             {
//               "name": "offset",
//               "path": [
//                 "camera",
//                 "offset"
//               ],
//               "count": 1,
//               "type": "Document",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Document",
//                   "path": [
//                     "camera",
//                     "offset"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "bsonType": "Document",
//                   "fields": [
//                     {
//                       "name": "x",
//                       "path": [
//                         "camera",
//                         "offset",
//                         "x"
//                       ],
//                       "count": 1,
//                       "type": "Double",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "Double",
//                           "path": [
//                             "camera",
//                             "offset",
//                             "x"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             0
//                           ],
//                           "bsonType": "Double"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "y",
//                       "path": [
//                         "camera",
//                         "offset",
//                         "y"
//                       ],
//                       "count": 1,
//                       "type": "Double",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "Double",
//                           "path": [
//                             "camera",
//                             "offset",
//                             "y"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             0
//                           ],
//                           "bsonType": "Double"
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "name": "pixel_scale_at_bin1",
//               "path": [
//                 "camera",
//                 "pixel_scale_at_bin1"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "camera",
//                     "pixel_scale_at_bin1"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     0.2612
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             },
//             {
//               "name": "power",
//               "path": [
//                 "camera",
//                 "power"
//               ],
//               "count": 1,
//               "type": "Document",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Document",
//                   "path": [
//                     "camera",
//                     "power"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "bsonType": "Document",
//                   "fields": [
//                     {
//                       "name": "delay_after_on",
//                       "path": [
//                         "camera",
//                         "power",
//                         "delay_after_on"
//                       ],
//                       "count": 1,
//                       "type": "Int32",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "Int32",
//                           "path": [
//                             "camera",
//                             "power",
//                             "delay_after_on"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             2
//                           ],
//                           "bsonType": "Int32"
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "name": "temp_check_interval",
//               "path": [
//                 "camera",
//                 "temp_check_interval"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "camera",
//                     "temp_check_interval"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     10
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "name": "Undefined",
//           "bsonType": "Undefined",
//           "unique": 1,
//           "hasDuplicates": false,
//           "path": [
//             "camera"
//           ],
//           "count": 1,
//           "probability": 0.5
//         }
//       ]
//     },
//     {
//       "name": "covers",
//       "path": [
//         "covers"
//       ],
//       "count": 1,
//       "type": [
//         "Document",
//         "Undefined"
//       ],
//       "probability": 0.5,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "covers"
//           ],
//           "count": 1,
//           "probability": 0.5,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "ascom_driver",
//               "path": [
//                 "covers",
//                 "ascom_driver"
//               ],
//               "count": 1,
//               "type": "String",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "covers",
//                     "ascom_driver"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "ASCOM.PlaneWave.CoverCalibrator"
//                   ],
//                   "bsonType": "String"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "name": "Undefined",
//           "bsonType": "Undefined",
//           "unique": 1,
//           "hasDuplicates": false,
//           "path": [
//             "covers"
//           ],
//           "count": 1,
//           "probability": 0.5
//         }
//       ]
//     },
//     {
//       "name": "focuser",
//       "path": [
//         "focuser"
//       ],
//       "count": 2,
//       "type": "Document",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "focuser"
//           ],
//           "count": 2,
//           "probability": 1,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "ascom_driver",
//               "path": [
//                 "focuser",
//                 "ascom_driver"
//               ],
//               "count": 1,
//               "type": [
//                 "String",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "focuser",
//                     "ascom_driver"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "ASCOM.PWI4.Focuser"
//                   ],
//                   "bsonType": "String"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "focuser",
//                     "ascom_driver"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "known_as_good_position",
//               "path": [
//                 "focuser",
//                 "known_as_good_position"
//               ],
//               "count": 2,
//               "type": [
//                 "Int32",
//                 "Double"
//               ],
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "focuser",
//                     "known_as_good_position"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     15000
//                   ],
//                   "bsonType": "Int32"
//                 },
//                 {
//                   "name": "Double",
//                   "path": [
//                     "focuser",
//                     "known_as_good_position"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     33458
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "name": "global",
//       "path": [
//         "global"
//       ],
//       "count": 2,
//       "type": "Document",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "global"
//           ],
//           "count": 2,
//           "probability": 1,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "log_level",
//               "path": [
//                 "global",
//                 "log_level"
//               ],
//               "count": 2,
//               "type": "String",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "global",
//                     "log_level"
//                   ],
//                   "count": 2,
//                   "probability": 1,
//                   "unique": 2,
//                   "hasDuplicates": false,
//                   "values": [
//                     "debug",
//                     "info"
//                   ],
//                   "bsonType": "String"
//                 }
//               ]
//             },
//             {
//               "name": "top_folder",
//               "path": [
//                 "global",
//                 "top_folder"
//               ],
//               "count": 1,
//               "type": [
//                 "String",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "global",
//                     "top_folder"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "C:\\MAST"
//                   ],
//                   "bsonType": "String"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "global",
//                     "top_folder"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "name": "guiding",
//       "path": [
//         "guiding"
//       ],
//       "count": 1,
//       "type": [
//         "Document",
//         "Undefined"
//       ],
//       "probability": 0.5,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "guiding"
//           ],
//           "count": 1,
//           "probability": 0.5,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "binning",
//               "path": [
//                 "guiding",
//                 "binning"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "guiding",
//                     "binning"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     1
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             },
//             {
//               "name": "exposure",
//               "path": [
//                 "guiding",
//                 "exposure"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "guiding",
//                     "exposure"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     3
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             },
//             {
//               "name": "gain",
//               "path": [
//                 "guiding",
//                 "gain"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "guiding",
//                     "gain"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     170
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             },
//             {
//               "name": "interval",
//               "path": [
//                 "guiding",
//                 "interval"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "guiding",
//                     "interval"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     10
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             },
//             {
//               "name": "min_dec_correction_arcsec",
//               "path": [
//                 "guiding",
//                 "min_dec_correction_arcsec"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "guiding",
//                     "min_dec_correction_arcsec"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     0.2
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             },
//             {
//               "name": "min_ra_correction_arcsec",
//               "path": [
//                 "guiding",
//                 "min_ra_correction_arcsec"
//               ],
//               "count": 1,
//               "type": "Double",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Double",
//                   "path": [
//                     "guiding",
//                     "min_ra_correction_arcsec"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     0.2
//                   ],
//                   "bsonType": "Double"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "name": "Undefined",
//           "bsonType": "Undefined",
//           "unique": 1,
//           "hasDuplicates": false,
//           "path": [
//             "guiding"
//           ],
//           "count": 1,
//           "probability": 0.5
//         }
//       ]
//     },
//     {
//       "name": "mount",
//       "path": [
//         "mount"
//       ],
//       "count": 2,
//       "type": "Document",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "mount"
//           ],
//           "count": 2,
//           "probability": 1,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "stam",
//               "path": [
//                 "mount",
//                 "stam"
//               ],
//               "count": 1,
//               "type": [
//                 "String",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "mount",
//                     "stam"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "stam"
//                   ],
//                   "bsonType": "String"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "mount",
//                     "stam"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "name": "name",
//       "path": [
//         "name"
//       ],
//       "count": 2,
//       "type": "String",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "String",
//           "path": [
//             "name"
//           ],
//           "count": 2,
//           "probability": 1,
//           "unique": 2,
//           "hasDuplicates": false,
//           "values": [
//             "common",
//             "mastw"
//           ],
//           "bsonType": "String"
//         }
//       ]
//     },
//     {
//       "name": "power_switch",
//       "path": [
//         "power_switch"
//       ],
//       "count": 2,
//       "type": "Document",
//       "probability": 1,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "power_switch"
//           ],
//           "count": 2,
//           "probability": 1,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "cycle_time",
//               "path": [
//                 "power_switch",
//                 "cycle_time"
//               ],
//               "count": 1,
//               "type": [
//                 "Int32",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "power_switch",
//                     "cycle_time"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     3
//                   ],
//                   "bsonType": "Int32"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "cycle_time"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "delay_after_on",
//               "path": [
//                 "power_switch",
//                 "delay_after_on"
//               ],
//               "count": 1,
//               "type": [
//                 "Int32",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "power_switch",
//                     "delay_after_on"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     3
//                   ],
//                   "bsonType": "Int32"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "delay_after_on"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "network",
//               "path": [
//                 "power_switch",
//                 "network"
//               ],
//               "count": 2,
//               "type": "Document",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Document",
//                   "path": [
//                     "power_switch",
//                     "network"
//                   ],
//                   "count": 2,
//                   "probability": 1,
//                   "bsonType": "Document",
//                   "fields": [
//                     {
//                       "name": "host",
//                       "path": [
//                         "power_switch",
//                         "network",
//                         "host"
//                       ],
//                       "count": 2,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "network",
//                             "host"
//                           ],
//                           "count": 2,
//                           "probability": 1,
//                           "unique": 2,
//                           "hasDuplicates": false,
//                           "values": [
//                             "auto",
//                             "mastpsw.weizmann.ac.il"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "ipaddr",
//                       "path": [
//                         "power_switch",
//                         "network",
//                         "ipaddr"
//                       ],
//                       "count": 1,
//                       "type": [
//                         "String",
//                         "Undefined"
//                       ],
//                       "probability": 0.5,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "network",
//                             "ipaddr"
//                           ],
//                           "count": 1,
//                           "probability": 0.5,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "10.23.4.72"
//                           ],
//                           "bsonType": "String"
//                         },
//                         {
//                           "name": "Undefined",
//                           "bsonType": "Undefined",
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "path": [
//                             "power_switch",
//                             "network",
//                             "ipaddr"
//                           ],
//                           "count": 1,
//                           "probability": 0.5
//                         }
//                       ]
//                     },
//                     {
//                       "name": "port",
//                       "path": [
//                         "power_switch",
//                         "network",
//                         "port"
//                       ],
//                       "count": 1,
//                       "type": [
//                         "Int32",
//                         "Undefined"
//                       ],
//                       "probability": 0.5,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "Int32",
//                           "path": [
//                             "power_switch",
//                             "network",
//                             "port"
//                           ],
//                           "count": 1,
//                           "probability": 0.5,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             80
//                           ],
//                           "bsonType": "Int32"
//                         },
//                         {
//                           "name": "Undefined",
//                           "bsonType": "Undefined",
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "path": [
//                             "power_switch",
//                             "network",
//                             "port"
//                           ],
//                           "count": 1,
//                           "probability": 0.5
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "name": "outlets",
//               "path": [
//                 "power_switch",
//                 "outlets"
//               ],
//               "count": 1,
//               "type": [
//                 "Document",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Document",
//                   "path": [
//                     "power_switch",
//                     "outlets"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "bsonType": "Document",
//                   "fields": [
//                     {
//                       "name": "1",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "1"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "1"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Mount"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "2",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "2"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "2"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Stage"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "3",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "3"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "3"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Camera"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "4",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "4"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "4"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Focuser"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "5",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "5"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "5"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Covers"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "6",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "6"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "6"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Computer"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "7",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "7"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "7"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Outlet 7"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     },
//                     {
//                       "name": "8",
//                       "path": [
//                         "power_switch",
//                         "outlets",
//                         "8"
//                       ],
//                       "count": 1,
//                       "type": "String",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "String",
//                           "path": [
//                             "power_switch",
//                             "outlets",
//                             "8"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             "Outlet 8"
//                           ],
//                           "bsonType": "String"
//                         }
//                       ]
//                     }
//                   ]
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "outlets"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "password",
//               "path": [
//                 "power_switch",
//                 "password"
//               ],
//               "count": 1,
//               "type": [
//                 "String",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "power_switch",
//                     "password"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "1234"
//                   ],
//                   "bsonType": "String"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "password"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "timeout",
//               "path": [
//                 "power_switch",
//                 "timeout"
//               ],
//               "count": 1,
//               "type": [
//                 "Int32",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "power_switch",
//                     "timeout"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     2
//                   ],
//                   "bsonType": "Int32"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "timeout"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             },
//             {
//               "name": "userid",
//               "path": [
//                 "power_switch",
//                 "userid"
//               ],
//               "count": 1,
//               "type": [
//                 "String",
//                 "Undefined"
//               ],
//               "probability": 0.5,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "String",
//                   "path": [
//                     "power_switch",
//                     "userid"
//                   ],
//                   "count": 1,
//                   "probability": 0.5,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     "admin"
//                   ],
//                   "bsonType": "String"
//                 },
//                 {
//                   "name": "Undefined",
//                   "bsonType": "Undefined",
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "path": [
//                     "power_switch",
//                     "userid"
//                   ],
//                   "count": 1,
//                   "probability": 0.5
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "name": "stage",
//       "path": [
//         "stage"
//       ],
//       "count": 1,
//       "type": [
//         "Document",
//         "Undefined"
//       ],
//       "probability": 0.5,
//       "hasDuplicates": false,
//       "types": [
//         {
//           "name": "Document",
//           "path": [
//             "stage"
//           ],
//           "count": 1,
//           "probability": 0.5,
//           "bsonType": "Document",
//           "fields": [
//             {
//               "name": "image_position",
//               "path": [
//                 "stage",
//                 "image_position"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "stage",
//                     "image_position"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     10000
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             },
//             {
//               "name": "power",
//               "path": [
//                 "stage",
//                 "power"
//               ],
//               "count": 1,
//               "type": "Document",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Document",
//                   "path": [
//                     "stage",
//                     "power"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "bsonType": "Document",
//                   "fields": [
//                     {
//                       "name": "delay_after_on",
//                       "path": [
//                         "stage",
//                         "power",
//                         "delay_after_on"
//                       ],
//                       "count": 1,
//                       "type": "Int32",
//                       "probability": 1,
//                       "hasDuplicates": false,
//                       "types": [
//                         {
//                           "name": "Int32",
//                           "path": [
//                             "stage",
//                             "power",
//                             "delay_after_on"
//                           ],
//                           "count": 1,
//                           "probability": 1,
//                           "unique": 1,
//                           "hasDuplicates": false,
//                           "values": [
//                             5
//                           ],
//                           "bsonType": "Int32"
//                         }
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             },
//             {
//               "name": "spectra_position",
//               "path": [
//                 "stage",
//                 "spectra_position"
//               ],
//               "count": 1,
//               "type": "Int32",
//               "probability": 1,
//               "hasDuplicates": false,
//               "types": [
//                 {
//                   "name": "Int32",
//                   "path": [
//                     "stage",
//                     "spectra_position"
//                   ],
//                   "count": 1,
//                   "probability": 1,
//                   "unique": 1,
//                   "hasDuplicates": false,
//                   "values": [
//                     100000
//                   ],
//                   "bsonType": "Int32"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "name": "Undefined",
//           "bsonType": "Undefined",
//           "unique": 1,
//           "hasDuplicates": false,
//           "path": [
//             "stage"
//           ],
//           "count": 1,
//           "probability": 0.5
//         }
//       ]
//     }
//   ]
// }

type UnitConfigContextType = {
  configs: { [unitName: string]: never };
  setUnitConfig: (unitName: string, config: never) => void;
};

const UnitConfigContext = createContext<UnitConfigContextType | undefined>(undefined);

export const UnitConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [configs, setConfigs] = useState<{ [unitName: string]: never }>({});
  const { selectedSite } = useSitesContext();

  const setUnitConfig = (unitName: string, stat: never) => {
    setConfigs((prevConfigs) => ({
      ...prevConfigs,
      [unitName]: stat
    }));
  };

  useEffect(() => {
    const fetchDeployedUnitsConfig = () => {
      if (selectedSite) {
        const { deployed } = selectedSite;
        deployed.map((unit) => fetchUnitConfig(unit));
      }
    };

    fetchDeployedUnitsConfig();
    const interval = setInterval(fetchDeployedUnitsConfig, 60000); // Fetch every 60 seconds

    return () => clearInterval(interval);
  }, [selectedSite]);

  function fetchUnitConfig(unitName: string) {
    controlApi(selectedSite, `config/get_unit/${unitName}`)
      .then((config) => {
        setConfigs((prevConfig) => ({ ...prevConfig, [unitName]: config }));
      })
      .catch(() => {
        setConfigs((prevConfig) => ({ ...prevConfig, [unitName]: {} }));
      });
  }

  const value = useMemo(
    () => ({
      configs,
      setUnitConfig
    }),
    [configs]
  );

  return <UnitConfigContext.Provider value={value}>{children}</UnitConfigContext.Provider>;
};

export const useUnitConfigContext = () => {
  const context = useContext(UnitConfigContext);
  if (!context) {
    throw new Error('useUnitConfigContext must be used within a SitesProvider');
  }
  return context;
};
