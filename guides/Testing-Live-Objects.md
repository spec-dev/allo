# Testing Live Objects

It's easy to test your Live Objects locally using live production data from the Spec network.

## Requirements

* [Spec CLI](./CLI-Setup.md)
* [Deno](https://deno.com/manual@v1.33.1/getting_started/installation) >= 1.3 (we also highly recommend the Deno/Denoland VSCode extension)
* [Postgres](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) >= 14

## Prerequisites

1) Go ahead and cache whatever version of the Spec core library is being used with the Live Objects you are looking to test. This exact version/url can be found inside of `imports.json` in the root folder:
```bash
$ deno cache https://esm.sh/@spec.dev/core@0.0.106
```

2) Make sure Postgres is up and running locally:
```bash
$ psql
```

## How testing works

The Live Object testing process will:

1) Create a local Postgres table with the same structure as your Live Object (this is where test data will be indexed into).
2) Subscribe to all inputs (events & contract calls) that your Live Object depends on.
3) Route any new inputs (events & contract calls) into their respective handler functions within your Live Object.
4) If testing on historical data, the requested historical range of event/call data will be pulled from Spec's APIs and routed through your handlers one by one.

## Testing on new events

To test a single Live Object:

```bash
$ spec test object Project
```

To test multiple at the same time:

```bash
$ spec test objects Project,ProjectOwner
```

To test all Live Objects in this folder simultaneously:

```bash
$ spec test objects .
```

## Testing on historical event data

Being able to test Live Objects on a range of historical input data is great, especially if those events or contract calls don't occur on-chain very often.

> [!IMPORTANT]  
> If you are testing a Live Object that resolves metadata from IPFS (using our `resolveMetadata` function), the testing process will take much longer (not surprisingly), so it's recommended to test these Live Objects on a shorter range of data than others.

Test a Live Object on the previous 30 days of input events/calls:

```bash
$ spec test object ProjectOwner --recent
```

Test a Live Object from a specific day onwards:

```bash
$ spec test object ProjectOwner --from 5.1.2023
```

Test a Live Object on its entire history of input data.

```bash
$ spec test object ProjectOwner --all-time
```
