## First Steps

- Install Docker
- Install NodeJS
- Run ```npm install``` in a terminal

## Run OpenSearch

- Run ```npm run compose:up``` in a terminal

## Run Data Insertion Script

- Run ```node ./src/index.js``` in a terminal

## Dashboards

[Dashboard](http://localhost:5601) login:

```
Username: admin
Password: Endsumme273!
```

Select ```Global``` Tenant and ```Confirm```

#### Configure Index Pattern

1. Go to [Index Patterns](http://localhost:5601/app/management/opensearch-dashboards/indexPatterns)
2. Click ```Create index pattern```
3. Type ```dtype*``` and click ```Next step```
4. Select ```timestamp``` as your Time field and click ```Create index pattern```

#### Configure a visualization

1. Go to [Visualize](http://localhost:5601/app/visualize#/)
2. Click ```Create new visualization```
3. Select from:
	- Line
	- Area
	- Vertical Bar
4. Select ```dtype*```
5. Add a ```X-axis Bucket``` with Aggregation ```Date Histogram``` and Field ```timestamp```
6. Add whatever Metrics you want
7. Select your preferred time range
8. Run your visualization by clicking ```Update```

#### Export visualization to Ionite

After running a successful Visualization do the following

1. Click on ```Inspect``` in the Navbar
2. Select ```View: Requests```
3. Go to tab ```Request```
4. Copy everything by clicking the small documents icon on the right
5. Open a text editor and use the following structure

```json
{
	"index": [
		REPLACE_ME_WITH_DEVICE_TYPE_ID
		->
		GO_TO_DEVICE_TYPE_CONFIG_AND_COPY_NUMBER_FROM_URL
	],
	"body": INSERT_BODY_FROM_CLIPBOARD
}
```

Inside the query body look for the following range structure and replace to your preference

```json
{
	"range": {
		"timestamp": {
			"lte": "now",
			"gte": "now-1d",
			"format": "strict_date_optional_time"
		}
	}
}
```

Go to a graph configuration in Ionite and do the following

1. Select ```Custom Query``` on tab ```1. General```
2. Open expandable ```Custom Query``` and insert query on tab ```2 Measurement```
3. Select your ```Device Type``` and add a field for every ```Y-axis metric``` you have in your visualization
4. Look for this structure in your query and put the aggregation number in to the ```Field``` field

```json
{
	"aggs": {
		"1": { // <- THIS IS USED TO MAP AGGREGATIONS TO GRAPH FIELDS
			"sum_bucket": { 
				"buckets_path": "1-bucket>1-metric"
			}
		}
	}
}
```
