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

  let filePath = path.join(__dirname, './assets/pnp-node.png');

  let content = fs.readFileSync(filePath); // .toString(); // Will work
  // let content = fs.readFileSync(filePath).buffer; // Won't work

  // let content = await ((): Promise<any> => {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(filePath, null, (err, nb) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(nb);
  //     });
  //   });
  // })();

  let fileName = path.parse(filePath).name + path.parse(filePath).ext;

  newItem.item.attachmentFiles.add(fileName, content as any)
    .then(result => {
      console.log(result.data.ServerRelativePath);
    })
    .catch(err => {
      console.log(err, err.data.responseBody.error);
    });

}).catch(console.log);
