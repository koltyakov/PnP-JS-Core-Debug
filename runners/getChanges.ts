import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'List with changes';
  const itemsToAdd = [
    { Title: 'Item 1' },
    { Title: 'Item 2' },
    { Title: 'Item 3' }
  ];

  let web = new Web(settings.siteUrl);
  let listsRes = await web.lists.select('Id').filter(`Title eq '${listName}'`).get();

  if (listsRes.length === 0) {
    await web.lists.add(listName);
  }

  let list = web.lists.getByTitle(listName);

  let { CurrentChangeToken } = await list.select('CurrentChangeToken').get();

  console.log(`Change token: ${CurrentChangeToken.StringValue}`);

  for (let item of itemsToAdd) {
    await list.items.add(item);
  }

  let listChanges = await list.getChanges({
    Item: true,
    Add: true,
    DeleteObject: true,
    Update: true,
    Restore: true,
    ChangeTokenStart: {
      ...CurrentChangeToken
    }
  });

  console.log('List changes:');
  console.log(JSON.stringify(listChanges, null, 2));

}).catch(console.log);
