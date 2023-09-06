# Nihal_Razak-SDK
SDK in Typescript that makes this API accessible to other developers.
The SDK only needs to cover the movie and quote endpoints:

- /movie
- /movie/{id}
- /movie/{id}/quote
- /quote
- /quote/{id}

## Development
- `npm run build` to compile TS -> JS. This is configured to incrementaly compile files in `src` outout to `dist`.
- `npm run watch` to compile files in `src` to `dist`, watching for any changes and incrementaly rebuilding whenever file changes are made in `src`.
- `npm run clean` to remove `dist`.

## Running                               
`npm run start`

- uses `ts-node` to run the entrypoint `src/index.ts`

## SDK Design and Usage
Please read [Design and Usage Documentation](https://github.com/supernihal/nihal_razak_SDK/blob/main/design.md) carefully.
## Test
`npm run test`
