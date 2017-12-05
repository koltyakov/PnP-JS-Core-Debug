import { Web } from './../../PnP-JS-Core/src/pnp';
import { initEnvironment as init } from './../utils/pnpnode';
import './../utils/setup';

init().then(async settings => {

  const listName = 'List with changes';
  const changes = [
    { Title: 'Change 1' },
    { Title: 'Change 2' },
    { Title: 'Change 3' }
  ];

  let web = new Web(settings.siteUrl);
  let listsRes = await web.lists.select('Id').filter(`Title eq '${listName}'`).get();

  if (listsRes.length === 0) {
    await web.lists.add(listName);
  }

  let list = web.lists.getByTitle(listName);
  let item = await list.items.add({
    Title: 'before changes'
  });

  let { CurrentChangeToken } = await list.select('CurrentChangeToken').get();

  console.log(`Change token: ${CurrentChangeToken.StringValue}`);

  for (let change of changes) {
    await item.item.update(change);
  }

  let itemsChanges = await list
    .getListItemChangesSinceToken({
      // ViewName: '',
      // Query: `
      //   <Where>
      //     <Contains>
      //       <FieldRef Name='Title' />
      //       <Value Type='Text'>${changes[changes.length - 1].Title}</Value>
      //     </Contains>
      //   </Where>
      // `,
      // Contains: `
      //   <Contains>
      //     <FieldRef Name='Title'/>
      //     <Value Type='Text'>${changes[changes.length - 1].Title}</Value>
      //   </Contains>
      // `,
      QueryOptions: `
        <QueryOptions>
          <IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns>
          <DateInUtc>False</DateInUtc>
          <IncludePermissions>TRUE</IncludePermissions>
          <IncludeAttachmentUrls>FALSE</IncludeAttachmentUrls>
        </QueryOptions>
      `,
      ChangeToken: CurrentChangeToken.StringValue
    });

  console.log('Items changes:');
  console.log(JSON.stringify(itemsChanges, null, 2));

  // https://msdn.microsoft.com/en-us/library/office/dn292554.aspx

}).catch(console.log);
