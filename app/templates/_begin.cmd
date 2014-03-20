@echo on
set ip=127.0.0.1
set host=%systemroot%\system32\drivers\etc\hosts
copy %host%  %host%_tmp_<%= name %>

@echo %ip% www.<%= name %>.com>>%host%

call ./start.cmd