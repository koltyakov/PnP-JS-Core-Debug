# PnP JS Core Debug

Allows debuggins local sources of PnP JS Core right in TypeScript with live requests to SharePoint environment in Node.js.

## Prerequisites

- Node.js
- TypeScript
- TSLint
- Gulp

### Install Node.js global modules

```bash
npm install typescript tslint ts-node gulp -g
```

## Fork projects

- [PnP JS Core](https://github.com/SharePoint/PnP-JS-Core)
- [PnP JS Core Debug](https://github.com/koltyakov/PnP-JS-Core-Debug)

## Clone forks

Projects' folders should be located in the same root folder.

```bash
git clone https://github.com/[namespace]/PnP-JS-Core
git clone https://github.com/[namespace]/PnP-JS-Core-Debug
```

`[namespace]` stands for you or your company GitHub account.

## Install dependencies

Dependencies should be restored in both projetcs' folders with:

```bash
npm install
```

or

```bash
yarn install
```

## VS Code is our editor of choise

Open both project in VS Code. Workspaces is the best option here.

![](/assets/vscode_workspace.png)

## Upstream for PnP JS Core

Add upstream for PnP JS Core (one time operation).
In `PnP JS Core`'s folder:

```bash
git remote add upstream https://github.com/SharePoint/PnP-JS-Core
```

This will allow syncing your repository sources with main repo with:

```bash
git fetch upstream dev
```

## Feature branch

It's recommended using feature branches for code changes related to a specific feature or bug fix.

Before creating a feture branch make sure:

- Feature branch is based on PnP JS Core `dev` branch.
- Local branch is synced with remote `upstream` branch (this can be done with feature branch too).

```bash
git checkout dev
git fetch upstream dev
git checkout -b [name_of_your_new_branch]
```

It's better to prefix feature branch with `dev-`.

## Connecting tools with SharePoint

On firts run SharePoint environment connection should be initiated:

### Run npm task

```bash
npm run init
```

You'll be prompted with SharePoint web url and credentials, just follow the wizard:

![](/assets/auth_init.png)

Read [more](https://github.com/s-KaiNet/node-sp-auth) about supported auth scenarios.

### Configuration files

Connection is saved to config files which is better to exclude from git repository.
By default config path is `./config/private.json`. Passwords in configs are stored in encrypted way.

Config sample:

```json
{
  "siteUrl": "https://contoso.sharepoint.com/sites/dev-a",
  "strategy": "UserCredentials",
  "username": "andrew.koltyakov@contoso.onmicrosoft.com",
  "password": "bcccd4e6025...ZH+ZY5X2A=="
}
```

## Making changes

Now you can apply changes to PnP JS Core project sources (your local copy).
Follow [Getting Started: Contribute](https://github.com/SharePoint/PnP-JS-Core/wiki/Getting-Started:-Contribute) wiki page's instructions.

## Debugging with PnP JS Core Debug

In `PnP-JS-Core-Debug/runners` project's folder create a `.ts` file.

Wrap file with:

```TypeScript
import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  let web = new Web(settings.siteUrl);
  // executing methods to test

}).catch(console.log);
```

Place debug brake points in PnP JS Core `.ts` sources or your custom code.
Open a runner which executes logic to test and start a debugger for current file.

![](/assets/vscode_debug_01.png)

Now all the power of VS Code debugger is our oyster!

![](/assets/vscode_debug_02.png)
