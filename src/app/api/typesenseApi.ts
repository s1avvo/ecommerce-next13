import { SearchClient as TypesenseSearchClient } from "typesense";
import Typesense from "typesense/src/Typesense";

export const searchClient = new TypesenseSearchClient({
	nodes: [
		{
			host: `${process.env.TYPESENSE_HOST}`,
			port: 443,
			protocol: "https",
		},
	],
	apiKey: `${process.env.TYPESENSE_API_KEY}`,
	connectionTimeoutSeconds: 2,
});

export const adminClient = new Typesense.Client({
	nodes: [
		{
			host: `${process.env.TYPESENSE_HOST}`,
			port: 443,
			protocol: "https",
		},
	],
	apiKey: `${process.env.TYPESENSE_API_KEY_ADMIN}`,
	connectionTimeoutSeconds: 2,
});
