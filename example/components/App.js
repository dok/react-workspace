import React, { Component } from 'react';
import Workspace from 'react-pane';
import '../styles/main.scss';
import '../app.scss';

export default class App extends Component {
  // onChange(root, tabs) {
  //   console.log('new root: ', root);
  //   console.log('tabs: ', tabs);
  // }
  render() {
    const root = {
      axis: 'x',
      children: [
        {
          axis: 'y',
          size: 50,
          children: [
            {
              axis: 'x',
              size: 70,
              children: [
                {
                  size: 30,
                  sidebar: true // sidebar
                },
                {
                  axis: 'y',
                  size: 70,
                  children: [
                    {
                      editor: true // editor
                    },
                    {
                      block: true // block
                    }
                  ]
                }
              ]
            },
            {
              size: 30,
              logs: true // logs
            }
          ]
        },
        {
          size: 50,
          browser: true // browser
        }
      ]
    };

    const components = {
      sidebar: (
        <div style={{background: 'green', width: '100%', height: '100%'}}>
          <ul style={{marginTop: 0}}>
            <li>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dolor suscipit provident nobis, tempore, deleniti laboriosam tempora. Veritatis explicabo, corrupti. Maxime cupiditate vero quisquam ab dignissimos id voluptates sed magni sint culpa veniam eius in, inventore veritatis consequatur! Ipsam asperiores adipisci, consectetur quasi perspiciatis voluptates hic reprehenderit eligendi vitae quaerat.</p>
            </li>
            <li>
              <p>Dolorum harum, quasi. A sunt neque ullam, veniam sit, maiores qui ad odit voluptatem fugiat laborum maxime blanditiis cupiditate beatae, libero cumque consequuntur rem? Architecto quo suscipit maxime! Quis similique eius obcaecati, vero sed facere voluptas dolores error, assumenda repellat excepturi eos amet! Beatae cum sed, nemo quisquam, blanditiis tempore.</p>
            </li>
            <li>
              <p>Modi eligendi labore temporibus provident veniam saepe soluta, quisquam aut voluptatum omnis deleniti quaerat dignissimos fugiat, autem ut maiores sit maxime minima nihil corporis. Exercitationem quisquam dolorem doloremque tempore corporis dolorum atque impedit provident ab assumenda deserunt sapiente dolores, unde numquam temporibus obcaecati iure voluptatum doloribus nam, voluptatem fugiat labore.</p>
            </li>
            <li>
              <p>Consequatur cupiditate veritatis sint saepe qui fugiat, quidem sunt voluptate placeat quas quasi quisquam animi earum atque aspernatur eum a dolore aperiam facilis, rem! Cupiditate doloribus maiores, repudiandae ut nobis distinctio amet totam quas accusantium soluta, inventore, quidem. Eaque minus eveniet quae, inventore ipsa reiciendis enim nobis! Error, perspiciatis, aut?</p>
            </li>
            <li>
              <p>Soluta, et quisquam. Consequuntur temporibus voluptas sunt, sed ab dolorum magni ratione delectus eos harum adipisci, eaque expedita recusandae accusamus nostrum aperiam velit ea quisquam a porro vero ipsum rerum dolores molestias. Minus soluta excepturi amet ullam et sit impedit, similique facilis tenetur ad! Veritatis accusantium magnam quos saepe sint.</p>
            </li>
            <li>
              <p>Provident vero quia nobis magnam esse fugiat numquam suscipit, dolorum voluptas delectus inventore, amet dolor hic odit iste, eos ad? Illum expedita, odio est porro, distinctio itaque vel quas aliquam nostrum maiores repellendus. Quas sequi eaque harum, sapiente ipsa maiores fugiat voluptatem repellendus beatae. Reprehenderit dolorum iste libero corporis sapiente.</p>
            </li>
            <li>
              <p>Enim eum iusto dolore. Provident magni quas ipsam reprehenderit alias expedita obcaecati laboriosam iste recusandae saepe quam animi eaque autem nostrum velit, voluptate molestiae nihil amet earum nesciunt. Laborum a eius natus iusto voluptates. Natus distinctio repellat nobis? Obcaecati unde doloribus sapiente quibusdam fugiat consequatur doloremque tempore accusamus quia magnam.</p>
            </li>
            <li>
              <p>Blanditiis corrupti, doloremque iure quibusdam quia sapiente aliquam, alias perferendis. Accusantium eum illo excepturi atque consectetur amet sapiente error, blanditiis impedit dolor, accusamus doloremque reprehenderit beatae magnam aliquid nisi unde sint. Quisquam possimus facere unde quaerat odio beatae modi? Eum qui, nemo numquam quam, cupiditate laudantium corrupti tempore. Recusandae, consequuntur.</p>
            </li>
            <li>
              <p>Minima ex eum ipsum ratione error ullam consectetur enim rerum, quis sint veritatis dicta, est ipsam deserunt debitis nesciunt praesentium unde illo, necessitatibus quas distinctio! Quasi vel, eligendi voluptatum sapiente. Error id, laboriosam quo quis expedita inventore. Ratione recusandae autem, voluptatibus eaque aspernatur. Perferendis amet neque minus eius suscipit quisquam.</p>
            </li>
            <li>
              <p>Rerum magnam possimus deleniti fugiat. Totam pariatur ipsum aspernatur doloremque repellendus aperiam ipsam distinctio quam obcaecati earum? Nihil, blanditiis, incidunt. Laborum veniam doloremque, cumque voluptatibus quibusdam dolore ut, ducimus quasi impedit soluta! Recusandae nesciunt, mollitia dignissimos molestiae vel velit inventore eos placeat itaque est esse dicta minima non harum ea.</p>
            </li>
            <li>
              <p>Maxime mollitia recusandae corporis suscipit necessitatibus numquam dicta nisi, facilis placeat repellat nam quos officiis nesciunt, veritatis unde dolor. Adipisci debitis ipsa sed praesentium molestiae beatae saepe, sit neque fugit blanditiis ex corporis veniam expedita ad mollitia nulla nam id eaque a ducimus voluptatibus fuga maiores iure est? Doloribus, ducimus.</p>
            </li>
            <li>
              <p>Eius distinctio corrupti numquam dolorem beatae soluta omnis temporibus atque sit, accusantium esse necessitatibus commodi officia ad. Possimus veniam enim, eveniet in distinctio voluptatem cumque. Voluptatum cum, hic atque. Consequatur a itaque sint sapiente dolores, nam dolore qui unde aspernatur consectetur, delectus quidem similique mollitia magni! Facere quo est atque?</p>
            </li>
            <li>
              <p>Suscipit, dicta quas molestiae perspiciatis reiciendis, officia accusamus neque necessitatibus, magni tenetur omnis! Ratione in obcaecati, cumque nesciunt omnis vitae. Placeat dicta non excepturi expedita amet, libero nemo similique eos repellat officiis neque sunt iste. Reprehenderit veritatis illo minus atque dolores voluptatum a sunt porro molestiae corporis amet nisi, aut.</p>
            </li>
            <li>
              <p>Doloribus tenetur vero asperiores facilis, quam nobis. Repellendus quas animi quisquam officia cupiditate commodi non cum vitae, eum provident quibusdam delectus. Cum pariatur explicabo quam architecto maxime ullam doloribus quia incidunt adipisci, libero esse dolores alias aliquid tempore praesentium! Tempora laudantium doloremque sequi facere nobis dolore dignissimos. Sint, dolor, deserunt?</p>
            </li>
            <li>
              <p>Explicabo illo quod sapiente dolore totam quae eligendi nostrum iste quis voluptatibus quo a, odit aspernatur facere culpa quas incidunt, dolores repudiandae amet repellat officiis. Aut eum delectus, soluta facere quod veniam eligendi est a cumque, fuga doloribus, repudiandae sunt maxime expedita ea officia accusamus fugiat voluptates tempora. Qui, atque?</p>
            </li>
          </ul>
        </div>
      ),
      editor: (
        <div style={{background: 'red', width: '100%', height: '100%'}}/>
      ),
      block: (
        <div style={{background: 'yellow', width: '100%', height: '100%'}}/>
      ),
      logs: (
        <div style={{background: 'blue', width: '100%', height: '100%'}}/>
      ),
      configs: (
        <div style={{background: 'orange', width: '100%', height: '100%'}}/>
      ),
      browser: (
        <div style={{background: 'gray', width: '100%', height: '100%'}}/>
      ),
    };

    const tabs = {
      'children[0].children[0].children[0]': ['sidebar'],
      'children[0].children[0].children[1].children[0]': ['editor'],
      'children[0].children[0].children[1].children[1]': ['block'],
      'children[0].children[1]': ['logs', 'configs'],
      'children[1]': ['browser'],
    };

    return (
      <div>
        <Workspace onChange={this.onChange} 
                   root={root} 
                   tabs={tabs} 
                   components={components}/>
      </div>
    );
  }
}
