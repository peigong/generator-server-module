@echo off 
set host=%systemroot%\system32\drivers\etc\hosts
move %host%_tmp_<%= name %> %host%
