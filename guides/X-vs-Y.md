# X vs. Y

Important differences to understand between key concepts.

## Live Tables vs. Live Objects
 
In its simplest form, a Live Table is a Postgres table that's coupled with a live data source. Most of the time, when referring to a Live Table, we're referring to the Postgres table itself. The actual data source for the table is defined by what we call a Live Object. Programmatically, Live Objects are defined using TypeScript classes — you can think of them as data models that use custom indexing logic to represent something specific in web3, such as a Uniswap Pool, an ENS Profile, or an Allo Project.

When a Live Object is published to Spec, it gets fully indexed over all chain histories it depends on. The data itself is indexed into the Spec network, which is a shared ecosystem of data that everyone in the community has access to. Every Live Object, therefore, has a master copy of all of its data that lives within the Spec network.

Spec users can then create personalized Live Tables — with custom filters, naming conventions, constraints, etc. — using any of the Live Objects in the ecosystem as the underlying data source. There are a few core reasons for this design and why the Live Object abstraction was created in the first place:

1. **Long-term data accuracy** — Indexing a Live Object's data into the Spec network first, before being used to create Live Tables, removes the need for the author to host any type of infrastructure in order to maintain the continuous indexing of the Live Object over time. The author could outright delete their team's Postgres instance and the indexing of the Live Object wouldn't be affected.

2. **Replication across database environments** — Using the Spec network as the primary location for a Live Object's data makes replicating your Live Tables across database environments incredibly simple and efficient, espcially when working on a team of many developers.

3. **Creating a community-driven ecosystem** — Way too many people in web3 are all after the same data for the community to be indexing it in silos. The shared ecosystem of data ensures that everyone benefits anytime a single Live Object is published, allowing the community to build on what's been built.

## Live Objects vs. Subgraphs

Many key differences exist between subgraphs and Live Objects, so let's just focus on those specific to authorship:

1. **Design pattern** — Subgraphs are centered around *events*, while Live Objects are centered around *data models*. Live Objects do handle events for indexing, but the data model itself is the focal point. It's actually very common for multiple Live Objects to handle the same event — logic is simply separated based on how that particular event affects *that specific Live Object*.

3. **Relationships** — Within a subgraph, entities have very tight, formal relationships with explicit foreign keys. In contrast, Live Objects are only ever loosely related; the formal, foreign-key-style relationships between data models are only ever created *in your database* when adding Live Tables and relating them in some unique way.

4. **Primary keys** — Subgraph entities are primarily identified with `id` properties. Unfortunately, for data models that are **unique by** a composite group of contextual properties, these `id` properties still end up needing to be defined in a lengthy format such as:
    ```javascript
    const id = `id-${propertyOne}-${propertyTwo}-${propertyThree}...`
    ```
    Live Objects take a more intuitive approach, simply requiring a `uniqueBy` array of properties to be defined on the class — this is then respected as the primary unique constraint for the model.
    ```typescript
    @Spec({ 
        uniqueBy: ['address', 'tokenId', 'chainId'] 
    })
    class Example extends LiveObject {
        // ...
    ```