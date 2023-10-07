import { Client, SearchClient } from "typesense";

export const searchClient = new SearchClient({
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

export const adminClient = new Client({
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
