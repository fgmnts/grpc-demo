# gRPC demo

## docker-compose

From the repo root directory:

```sh
$ docker-compose pull prereqs node-server envoy commonjs-client
$ docker-compose up node-server envoy commonjs-client
```

Open a browser tab, and visit http://localhost:8081/additiontest.html.

To shutdown: `docker-compose down`.