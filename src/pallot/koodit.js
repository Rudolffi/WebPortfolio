let codeBox;
let theme = false; // false == dark; true == light
let orangeKeyWords = ['for', 'let'];
let purpleKeyWords = ['length', 'connections'];
let yellowKeyWords = ['big_box', `&lt;div&gt;`,'&lt;/div&gt;',`&lt;h1&gt;`,'&lt;/h1&gt;', `&lt;p&gt;`,'&lt;/p&gt;'];
let greenKeyWords = ['flex', 'row', 'center', '50px', '100%'];
let koodiTeksti_1 = `
for(let i = 0; i < particlesArray.length; i++){
  particlesArray[i].connections = [];
}
                                .big_box {
                                    display: flex;
                                    flex-direction: row;
                                    width: 100%;
                                    margin-top: 50px;
                                    text-align: center;
                                }
            <div>
                <h1> Ryhmä 11 </h1>
                <p> Is the Best </p>
            </div>
`;
export function init(){
    codeBox = document.getElementById('example-box');
    let typewriter = document.createElement('pre');
    const myArray = koodiTeksti_1.split(/(?=[,().;\s])|(?<=[,().;\s])/g);
    let text = {html : koodiTeksti_1}
    koodiTeksti_1 = text.html;

    koodiTeksti_1 = '<p class="codes anim-typewriter">';
    let row_code = '';
    for(let i = 0; i < myArray.length; i++){
        if (myArray[i].includes('<') || myArray[i].includes('>')){
            myArray[i] = myArray[i].replace('<', "&lt;");
            myArray[i] = myArray[i].replace('>', "&gt;");
        }
        if (orangeKeyWords.includes(myArray[i])){
            myArray[i] = `<span class="orangeKeyWords">${myArray[i]}</span>`;
        }
        if (purpleKeyWords.includes(myArray[i])){
            myArray[i] = `<span class="purpleKeyWords">${myArray[i]}</span>`;
        }
        if (yellowKeyWords.includes(myArray[i])){
            myArray[i] = `<span class="yellowKeyWords">${myArray[i]}</span>`;
        }
        if (greenKeyWords.includes(myArray[i])){
            myArray[i] = `<span class="greenKeyWords">${myArray[i]}</span>`;
        }

        row_code += myArray[i];

        if(myArray[i].includes("\n")){
            let st = "--n:" + row_code.length;
            row_code = `<p class=\"codes anim-typewriter\" style=${st}>` + row_code + `</p>`;
            koodiTeksti_1 += row_code;
            row_code = ``;
        }
    }
    koodiTeksti_1 += "</p>";
    //typewriter.style = "--n:" + koodiTeksti_1.length;
    //typewriter.className = 'anim-typewriter';
    typewriter.innerHTML = koodiTeksti_1;
    //let t = setupTypewriter(typewriter);
    //t.type();
    codeBox.appendChild(typewriter);

    window.addEventListener('resize', function(){
    });
}