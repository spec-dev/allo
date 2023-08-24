# Testing Live Objects

It's easy to test your Live Objects locally using live production data from the Spec network.

## Requirements

* [Spec CLI](./CLI-Setup.md)
* [Deno](https://deno.com/manual@v1.33.1/getting_started/installation) >= 1.3 (we also highly recommend the Deno/Denoland VSCode extension)
* [Postgres](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/) >= 14

## Prerequisites

1) Go ahead and cache whatever version of the Spec core library is being used with the Live Objects you are looking to test. This exact version/url can be found inside of [`imports.json`](../imports.json) in the root folder:
```bash
$ deno cache https://esm.sh/@spec.dev/core@0.0.106
```

2) Make sure Postgres is up and running locally:
```bash
$ psql
```

## Under the hood

The Live Object testing process is designed to simulate how Spec will index your Live Object into the Spec network when it's officially published. With that in mind, whenever you test a Live Object, the following steps will take place:

1. A local Postgres database named `live-object-testing` will be created (if not already).
2. A Postgres schema for your Live Object's namespace will be created inside your `live-object-testing` database (e.g. `allo`).
3. A Postgres table with the exact same structure and `snake_cased` name as your Live Object will be created within your namespace's schema (e.g. `allo.project_owner`).
4. If testing your Live Object on historical events, the requested range of data will be pulled from Spec's APIs and routed through your handlers one by one, in chronological order. This will cause your Live Object to actually index data into its test table created in step 3.
5. Each of the events your Live Object depends on are directly subcribed to in Spec's event network, routing all new events through your Live Object handlers to index data in realtime.

After you're done testing a Live Object, feel free to `psql` into your Live Object testing database and check out exactly how data is being indexed. For example:
```
$ psql live-object-testing
psql (14.6 (Homebrew))
Type "help" for help.

live-object-testing=# select * from allo.project_owner;
 id | project_id | account_address | is_active | block_hash | block_number | block_timestamp | chain_id 
----+------------+-----------------+-----------+------------+--------------+-----------------+----------
...
```

## Testing on new events

To test a single Live Object:

```bash
$ spec test object ProjectOwner
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
<br>
> [!IMPORTANT]  
> If you are testing a Live Object that resolves metadata from IPFS (using our `resolveMetadata` function), the testing process will take much longer (not surprisingly), so it's recommended to test these Live Objects on a shorter range of data than others.
<br>
To test a Live Object on the previous 30 days of input events/calls:

```bash
$ spec test object ProjectOwner --recent
```

To test a Live Object from a specific day onwards:

```bash
$ spec test object ProjectOwner --from 5.1.2023
```

To test a Live Object on its entire history of input data.

```bash
$ spec test object ProjectOwner --all-time
```
