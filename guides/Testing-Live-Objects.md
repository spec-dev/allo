# Testing Live Objects

It's easy to test your Live Objects locally using live production data from the Spec network.

### Table of Contents

* [Requirements](#requirements)
* [Prerequisites](#prerequisites)
* [How testing works under the hood](#how-testing-works-under-the-hood)
* [Testing on new events](#testing-on-new-events)
* [Testing on historical event data](#testing-on-historical-event-data)
* [Nuances of local testing](#nuances-of-local-testing)
* [Next steps](#next-steps)

## Requirements

* [Spec CLI](./CLI-Setup.md)
* [Deno](https://deno.com/manual@v1.33.1/getting_started/installation) >= 1.3 (we also highly recommend the Deno VSCode extension by "denoland" with the purple icon)
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

## How testing works under the hood

The Live Object testing process is designed to simulate how Spec will index your Live Object into the Spec network when it's officially published. With that in mind, whenever you test a Live Object, the following steps will take place:

1. A local Postgres database named `live-object-testing` will be created (if not already).
2. A Postgres schema for your Live Object's namespace will be created inside your `live-object-testing` database (e.g. `allo`).
3. A Postgres table with the exact same structure and `snake_cased` name as your Live Object will be created within your namespace's schema (e.g. `allo.project_owner`).
4. If testing your Live Object on a range of historical event data, your requested date range of events will be pulled from Spec's APIs and routed through your event handlers one by one, in chronological order. This will result in your Live Object actually indexing data into its test table.
5. All of your Live Object's input events will be directly subcribed to over websockets. This way, any new events will be routed through their respective handlers, allowing you to test the indexing of new data in real time.

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

> [!IMPORTANT]
> If you are testing a Live Object that resolves metadata from IPFS (using our [`resolveMetadata`](./Writing-Live-Objects.md#resolving-metadata) function), the testing process will take much longer (not surprisingly), so it's recommended to test these Live Objects on a shorter range of data than others.

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

## Nuances of local testing

### Metadata resolution

As mentioned in the above section, if you are testing a Live Object that resolves metadata from IPFS (using our [`resolveMetadata`](./Writing-Live-Objects.md#resolving-metadata) function), the testing process will take much longer (not surprisingly), so it's recommended to test these Live Objects on a shorter range of data than others.

### Factory contract group additions

Calls to [`this.addContractToGroup(...)`](./Contract-Groups.md#adding-contracts-to-a-group-dynamically-factory-groups) are only simulated in the local testing environment. This action is only functional when a published Live Object is running within the Spec network. This is to ensure no contracts are accidentally added to a production contract group while hacking on the early stages of a new Live Object. Instead, these simulated contract group additions will show up in the logs when running `spec test object` so that you at least know what will happen in production.

## Next Steps

Once your Live Object is written and tested, it can then be published to the Spec network for indexing. We're still putting the final pieces in place to fully automate this step with a `spec publish` command, so for now, just reach out to us directly when you're ready to publish.