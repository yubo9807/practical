import { TreeSearch } from ".";

export default () => {

  const treeData = [
    {
      title: '1',
      children: [
        { title: '1-1' },
        { title: '1-2' },
      ]
    },
    { title: '2' },
    { 
      title: '3',
      children: [
        {
          title: '3-1',
          children: [
            {
              title: '3-1-1',
              children: [
                { title: '3-1-1-1' }
              ]
            },
            { title: '3-1-2' },
          ]
        },
        {
          title: '3-2',
          children: [
            { title: '3-2-1' },
            { title: '3-2-2' },
          ]
        }
      ]
    },
    {
      title: '4',
      children: [
        { title: '4-1' }
      ]
    }
  ]

  const t = new TreeSearch({
    data: treeData,
    queryKey: 'title',
  });

  
  const result = t.search('-2');
  const container = document.getElementById('container');
  container.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

  treeData[2].children.push({ title: '3-n-1', children: [] });
  console.log(t.search('3-n-1'));
}