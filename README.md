# lw2-backend

db structure:

```
users
	id              uuid*
	username        text
	pw_hash         text  (md5)
	email           text
	permissions     int   (0 - read only, 1 - non-destruct write, 2 - destruct write, 3 - admin)

cases
	id              uuid*
	name            text                (doe, john)
	number          text            		(123456 / AB12345)
	iis             text  		nullable
	notes           text arr	nullable
	vols            uuid arr	nullable
	flags           text arr 	nullable	(rf, od, re, 30, ci)
	is_restricted   bool	  	nullable

vols
	id              uuid*
	name            text 			         	(cl01 / sf01 etc)
	notes           text arr  nullable
	call            text      nullable
	in_box          bool
	box_id          uuid      nullable

boxes
	id		          uuid*
	call		        text
	contains        uuid arr	nullable
```
