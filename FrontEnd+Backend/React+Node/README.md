You need not install anything apart from docker to run this application since it has been dockerized.

just run  the following command in your cmd -->
docker-compose up --build

The UI should will be available at localhost:3001
Th server serves data at port localhost:3000

Keeping the time constraints in mind , the code has been minimalistic.
Also since the primary objective of the assignment was to showcase web crawling & api functionality , the UI used to display is extremely basic in nature with no styles & design whatsoever .

Initial loading will display all 100 movies without any filters applied . User can select filters & then click on Go button . Accordingly the filtered movie lists will be fetched & displayed . 

Cheers ! :)