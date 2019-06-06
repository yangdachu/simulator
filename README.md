# [![BannerGithubSimulator](https://user-images.githubusercontent.com/27515937/59030338-62150880-8869-11e9-86f9-b6c1c72eaf19.png)](http://hkube.io)

> Dashboard is a web-based HKube user interface.

![DashboardPreview](https://user-images.githubusercontent.com/27515937/59031674-051b5180-886d-11e9-9806-ecce2e3ba8f0.png)

## Overview

Dashboard is an implementation of **Hkube Restful API**.

> Check Full Rest API [documentation](http://hkube.io/spec), and
> [Swagger-UI](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/kube-HPC/api-server/master/api/rest-api/swagger.json).

Use Dashboard for **deploying** and **monitoring** user
[algorithms](http://hkube.io/learn/algorithms/)
and [pipelines](http://hkube.io/learn/pipelines/).

### Accessing the Dashboard UI

- `https://<KUBERNETES-MASTER-IP>/hkube/simulator/`

### Features

The Dashboard follows two main concepts **Operations** and **Tables**.

#### Operations

Actions which deploying data to HKube.
Use Operations sidebar for adding `pipelines`, `algorithms` etc.

![Add Algo](https://user-images.githubusercontent.com/27515937/59032095-1d3fa080-886e-11e9-91bc-73d0a49137d7.png)

![Add Pipeline](https://user-images.githubusercontent.com/27515937/59032098-1e70cd80-886e-11e9-8ac5-bc72b742f6f9.png)

#### Tables

View Tables for monitoring HKube data.
Navigate Tables panel for viewing information about `pipelines` structures, `algorithm` info etc.

![Jobs Graph](https://user-images.githubusercontent.com/27515937/59032299-a2c35080-886e-11e9-83cf-0fc4d0ab8d3c.png)
