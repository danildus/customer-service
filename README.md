1. go to php container \
        `docker exec -it PHP_CONTAINER_ID sh` \
   and run \
        `bin/console doctrine:migrations:migrate`
2. Check for table is create correctly \
        `docker exec -it POSTGRES_CONTAINER_ID sh` \
   and run \
        `psql -U adminer`
3. also, if be needed run fixtures \
    `bin/console doctrine:fixtures:load`
4. follow the link http://localhost:8098/
