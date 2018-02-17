import * as fs from 'fs';
import * as path from 'path';

import { Web, setup } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'MyList';

  const web = new Web(settings.siteUrl);
  const list = web.lists.getByTitle(listName);

  console.log(
    await list.items.select('Id').skip(23).top(5).get()
      .then(r => r.map(i => i.Id))
  );
  console.log(
    await list.items.select('Id').skip(23, true).top(5).get()
      .then(r => r.map(i => i.Id))
  );

}).catch(console.log);
