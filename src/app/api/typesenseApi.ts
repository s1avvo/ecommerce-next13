import { SearchClient as TypesenseSearchClient } from "typesense";

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
