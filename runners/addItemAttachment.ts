import * as fs from 'fs';
import * as path from 'path';

import { Web, setup } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'List with attachments';

  let web = new Web(settings.siteUrl);
  let listsRes = await web.lists.select('Id').filter(`Title eq '${listName}'`).get();

  if (listsRes.length === 0) {
    await web.lists.add(listName);
  }

  let list = web.lists.getByTitle(listName);

  let newItem = await list.items.add({
    Title: 'Test item with attachment'
  });

  let filePath = path.join(__dirname, './assets/testAttachment.txt');
  let content = fs.readFileSync(filePath).buffer;
  let fileName = path.parse(filePath).name + path.parse(filePath).ext;

  newItem.item.attachmentFiles.add(fileName, content)
    .then(console.log)
    .catch(err => {
      console.log(err, err.data.responseBody.error);
    });

}).catch(console.log);
