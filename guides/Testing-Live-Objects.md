# Testing Live Objects

It's easy to test your Live Objects locally using live production data from the Spec network.

## Requirements

* [Spec CLI](./CLI-Setup.md)
* [Deno](https://deno.com/manual@v1.33.1/getting_started/installation) >= 1.3 (we also highly recommend the Deno/Denoland VSCode extension)
* [Postgres](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) >= 14

## Prerequisites

#### 1) Go ahead and cache whatever version of the Spec core library is being used with the Live Objects you are looking to test. This exact version/url can be found inside of `imports.json` in the root folder:
```bash
$ deno cache https://esm.sh/@spec.dev/core@0.0.106
```

#### 2) Make sure Postgres is up and running locally:
```bash
$ psql
```

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

The Live Object testing process will:<br>
1) Create a Postgres table for each Live Object in your local database.
2) Subscribe to all inputs (events & contract calls) that your Live Objects depend on.
3) Route new inputs (events & contract calls) into their respective Live Object handler functions.

## Testing on historical event data

Being able to test Live Objects on a range of historical input data is great, especially if those events or contract calls don't occur on-chain very often.

Test a Live Object on the previous 30 days of input events/calls:

```bash
$ spec test object ProjectOwner --recent
```

Test a Live Object from a specific day forward:

```bash
$ spec test object ProjectOwner --from 5.1.2023
```

Test a Live Object on its entire history of input data.

```bash
$ spec test object ProjectOwner --all-time
```
