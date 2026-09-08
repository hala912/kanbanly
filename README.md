cd $env:USERPROFILE
pg_ctl -D "$env:USERPROFILE\scoop\apps\postgresql\current\data" -l logfile start

psql -U postgres