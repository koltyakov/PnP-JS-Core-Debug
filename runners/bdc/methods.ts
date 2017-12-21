import * as fs from 'fs';
import * as path from 'path';

import { Web, setup } from './../../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../../utils/pnpnode';
import './../../utils/setup';

init({
  config: {
    configPath: './config/private.bdc.json'
  }
}).then(async settings => {

  const listName = 'ID3Vnext';
  const web = new Web(settings.siteUrl);
  const list = web.lists.getByTitle(listName);

  let items = await list
    .renderListData(`
      <View>
        <Method Name="AllItems">
          <Filter Name="Object_Type" Value="Workflow" />
          <Filter Name="Operation" Value="List" />
        </Method>
        <Query>
          <ViewFields>
            <FieldRef Name="Main_Json" />
          </ViewFields>
        </Query>
      </View>
    `);

  console.log(items.Row[0].Main_Json);

}).catch(res => {
  console.log(res);
});
