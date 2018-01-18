import * as fs from 'fs';
import * as path from 'path';

import { Web, setup } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'MyList';

  let web = new Web(settings.siteUrl);
  let defaultView = await web.lists.getByTitle(listName).defaultView.get();
  let defaultViewFields = await web.lists.getByTitle(listName).defaultView.fields.get();

  console.log(defaultView, defaultViewFields);

}).catch(console.log);
