import * as fs from 'fs';
import * as path from 'path';

import { Web, setup } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'ID3Vnext';
  const web = new Web(settings.siteUrl);
  const list = web.lists.getByTitle(listName);

  let listsRes = await web.lists.select('Id').filter(`Title eq '${listName}'`).get();

  if (listsRes.length === 0) {
    await web.lists.add(listName);
    const itemsToAdd = [
      { Title: 'Item 1' },
      { Title: 'Item 2' },
      { Title: 'Item 3' }
    ];
    for (let item of itemsToAdd) {
      await list.items.add(item);
    }
  }

  let items = await list
    .renderListData(`
      <View>
        <Query>
          <ViewFields>
            <FieldRef Name="Title" />
          </ViewFields>
        </Query>
      </View>
    `);

  console.log(items);

}).catch(res => {
  console.log(res);
});
