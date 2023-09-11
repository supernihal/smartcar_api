
# Nihal_Razak-SDK

## The Smartcar API Spec

  

### Vehicle Info

  

**Request:**

```

GET /vehicles/:id

  

```

  

**Response:**

  

```

{

"vin": "1213231",

"color": "Metallic Silver",

"doorCount": 4,

"driveTrain": "v8"

}

  

```

  

###Security

  

**Request:**

  

```

GET /vehicles/:id/doors

  

```

  

**Response:**

  

```

[

{

"location": "frontLeft",

"locked": true

},

{

"location": "frontRight",

"locked": true

},

{

"location": "backLeft",

"locked": true

},

{

"location": "backRight",

"locked": false

}

]

  

```

  

###Fuel Range

  

**Request:**

  

```

GET /vehicles/:id/fuel

  

```

  

**Response:**

  

```

{

"percent": 30.2

}

  

```

  

### Battery Range

  

**Request:**

  

```

GET /vehicles/:id/battery

  

```

  

**Response:**

  

```

{

"percent": 50.3

}

  

```

  

###Start/Stop Engine

  

**Request:**

  

```

POST /vehicles/:id/engine

Content-Type: application/json

  

{

"action": "START|STOP"

}

  

```

  

**Response:**

  

```

{

"status": "success|error"

}

```

## Development

-  `npm run build` to compile TS -> JS. This is configured to incrementaly compile files in `src` outout to `dist`.

-  `npm run watch` to compile files in `src` to `dist`, watching for any changes and incrementaly rebuilding whenever file changes are made in `src`.

-  `npm run clean` to remove `dist`.

  

## Running

`npm run start`
- uses `ts-node` to run the entrypoint `src/index.ts`
## Test

`npm run test`