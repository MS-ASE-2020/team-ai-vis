# AI + VIS

## Getting Started

### Prerequisites

* Install visual studio code from https://code.visualstudio.com/
* Install nodejs from https://nodejs.org/en/ 
* Install yarn from https://yarnpkg.com/

### Installation

```shell
$ git clone https://github.com/MS-ASE-2020/team-ai-vis.git
$ cd team-ai-vis/src
$ yarn install
```

### Development

#### Preview with hot-reloads

```shell
$ yarn serve
```

Visit [http://localhost:8080/](http://localhost:8080/).

#### Git

1. Confirm you are now working on `master` branch. If not, switch to it:

```shell
(not master)$ git checkout master
(master)    $
```

2. Make sure your `master` branch is up to date.

```shell
(master)    $ git pull --rebase origin master
```

3. Create a new branch (`dev` in this example) and switch to it.

```shell
(master)    $ git checkout -b dev
(dev)       $
```

4. Make some changes and commit.

5. Make sure your branch is up to date and push your commits.

```shell
(dev)       $ git pull --rebase origin master
```

* For the first time

```shell
(dev)       $ git push --set-upstream origin dev
```

* For the next times

```shell
(dev)       $ git push
```

6. Create a new pull request.

* Go to [https://github.com/MS-ASE-2020/team-ai-vis/pulls](https://github.com/MS-ASE-2020/team-ai-vis/pulls)
* Click `New pull request`
* Set the compare branch as `dev` and click `Create pull request`
* Select some reviewers if necessary
* Wait for all reviewers' approvals
* Click `Rebase and merge`
