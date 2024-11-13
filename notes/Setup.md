# Setup

## Issue Running Sail

I opted to install php 8.1 locally, as the docker-compose has Laravel Sail runtime set as 8.1
e.g `context: ./vendor/laravel/sail/runtimes/8.1` and install the dependencies this way instead of using the docker command. I installed it with the following command:

`composer install --ignore-platform-reqs`

I then tried to run Sail but recieved the following error:

```bash
0.277 Ign:1 http://archive.ubuntu.com/ubuntu impish InRelease
0.291 Ign:2 http://archive.ubuntu.com/ubuntu impish-updates InRelease
0.305 Ign:3 http://archive.ubuntu.com/ubuntu impish-backports InRelease
0.317 Err:4 http://archive.ubuntu.com/ubuntu impish Release
0.317   404  Not Found [IP: 185.125.190.83 80]
0.329 Err:5 http://archive.ubuntu.com/ubuntu impish-updates Release
0.329   404  Not Found [IP: 185.125.190.83 80]
0.343 Err:6 http://archive.ubuntu.com/ubuntu impish-backports Release
0.343   404  Not Found [IP: 185.125.190.83 80]
0.417 Ign:7 http://security.ubuntu.com/ubuntu impish-security InRelease
0.501 Err:8 http://security.ubuntu.com/ubuntu impish-security Release
0.501   404  Not Found [IP: 91.189.91.83 80]
0.503 Reading package lists...
0.509 E: The repository 'http://archive.ubuntu.com/ubuntu impish Release' does not have a Release file.
0.509 E: The repository 'http://archive.ubuntu.com/ubuntu impish-updates Release' does not have a Release file.
0.509 E: The repository 'http://archive.ubuntu.com/ubuntu impish-backports Release' does not have a Release file.
0.509 E: The repository 'http://security.ubuntu.com/ubuntu impish-security Release' does not have a Release file.
```

The issue is 2 fold:

1. The Laravel Sail Docker file is set to use Ubuntu 21.10 which is no longer supported.
2. The impish repositories are no longer available.

To fix this I updated `laravel/sail` using the following command:

`composer require laravel/sail --with-all-dependencies --ignore-platform-reqs`

This updated Laravel Sail to the latest compatible version and updated the Docker file to use Ubuntu 22.04.

The project could now be accessed after running `sail up -d`
