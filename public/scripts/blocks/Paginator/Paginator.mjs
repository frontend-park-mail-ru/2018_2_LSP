import { Block } from '../Block/Block.mjs';
import Users from '../../services/users.js';
import { Leaders } from '../../components/Leaders/Leaders.mjs';

export class Paginator extends Block {
    constructor() {
        const paginator = document.createElement('table');
        super(paginator);
        this.paginator = paginator;
        this.page = 1;

        const callback = function(page) {
            Users.leaders((err, response) => {
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    const leadersPage = new Leaders(response);
                    leadersPage.render();
                } else {
                    alert(response.error);
                }
            }, {page:page});   
        }

        const tr = document.createElement('tr');
        tr.classList.add('head');
        const thleft = document.createElement('th');
        const aleft = Block.Create('a', [], {'href':'pageMinus'});
        aleft.setText('<-');
        //aleft.event('click', callback(this.page-1));
        thleft.appendChild(aleft.getElement());
        tr.appendChild(thleft);

        const thright = document.createElement('th');
        const aright = Block.Create('a', [], {'href':'pagePlus'});
        aright.setText('->');
        aright.event('click', callback(this.page+1));
        thright.appendChild(aright.getElement());
        tr.appendChild(thright);
        this.paginator.appendChild(tr);
    }


}

// _paginator() {
//     const tr = document.createElement('tr');
//     tr.classList.add('head');
//         const thleft = document.createElement('th');
//         const aleft = document.createElement('a');
//         aleft.href = 'pageMinus';
//         aleft.textContent = '<-';
//         thleft.appendChild(aleft);
//         tr.appendChild(thleft);

//         const thright = document.createElement('th');
//         const aright = document.createElement('a');
//         aright.href = 'page' + i;
//         aright.textContent = '->';
//         thright.appendChild(aright);
//         tr.appendChild(thright);
//     }
//     thead.appendChild(tr);
//     this.table.appendChild(thead);
// }

// _paginator() {
//     const paginator = document.createElement('table');
//     const tr = document.createElement('tr');
//     tr.classList.add('head');
//     for (let i = 0; i < count; i++) {
//         const th = document.createElement('th');
//         const a = document.createElement('a');
//         a.href = 'page' + i;
//         a.textContent = string(i);
//         th.appendChild(a);
//         tr.appendChild(th);
//     }
//     thead.appendChild(tr);
//     this.table.appendChild(thead);
// }


// paginator(page) {
//     const totalPages = 3;
//     for (let i = 0; i < totalPages; i++) {
//         if (document.getElementById('page'+page)) {
//             document.getElementById().style.display = 'none';
//         }
//     }
//     if (document.getElementById('page'+page)) {
//         document.getElementById().style.display = 'block';
//     }
// }