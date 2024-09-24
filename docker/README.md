# Poplook Laravel docker setup

1. Create docker volume pointing to your source:
` $ docker volume create --driver local -o o=bind -o type=none -o device=/path/to/poplook-v2-laravel poplook-v2-laravel`

2. Check your uid and gid using the `id` command, and add it to `.env` file

For example, if `id` shows this:
```
$ id
uid=1432(doubleukay) gid=5231(doubleukay) groups=1000(doubleukay),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),120(lpadmin),131(lxd),132(sambashare),997(docker),998(vboxsf)
```

Then add this to `.env`
```
PHP_UID=1432
PHP_GID=5231

APP_NAME=Laravel
...
```

3. Run containers:
`docker compose --env-file=.env up --build`


Storage:
ln -s ../storage/app/public public/storage