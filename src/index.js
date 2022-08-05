const {Client} = require('@opensearch-project/opensearch');

const client = new Client({
	node: 'https://localhost:9200',
	auth: {
		username: 'admin',
		password: 'Endsumme273!'
	},
	ssl: {
		rejectUnauthorized: false
	},
	resurrectStrategy: 'optimistic'
});

(async () => {
	
	const datasource = [];
	
	/*
	 * Current date minus 100 days
	 */
	const timestamp = new Date();
	timestamp.setDate(
		timestamp.getDate() - 100
	);
	
	// Run this 100 times
	for (let i = 0; i < 100; i++) {
		
		datasource.push({
			device: 1,
			timestamp,
			payload: {
				xovis: {
					fw: 5
				}
			}
		});
		
		// Increment date by one
		// on each iteration
		timestamp.setDate(
			timestamp.getDate() + 1
		);
		
	}
	
	await client.helpers.bulk({
		datasource, onDocument() {
			
			return {
				index: {
					_index: 'dtype_1' // <- dtype_{DEVICE_TYPE_ID}
				}
			};
			
		}
	});
	
})();
