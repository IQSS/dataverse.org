import data from "../../data/journal-collections.json";

// Every published journal collection on Harvard Dataverse, alphabetical, each linking to its collection.
export default function JournalCollections() {
  return <section className="journal-collections" aria-labelledby="journal-collections-heading">
    <h2 id="journal-collections-heading">All {data.journals.length} Journal Collections on Harvard Dataverse</h2>
    <ul>{data.journals.map((journal) => <li key={journal.url}><a href={journal.url}>{journal.name}</a> <span>since {journal.since}</span></li>)}</ul>
  </section>;
}
