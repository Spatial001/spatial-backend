docker:
		docker-compose build
run:
		docker-compose up -d	
down: 
		docker-compose down
dev:
		mode=development docker-compose up -d