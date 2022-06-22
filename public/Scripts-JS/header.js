import { getServerData } from './getServerData.js';


let accountType;

function setAccountType(json) {
    accountType = json.accountType;
}

function BuildPopUp(header, headerElements, serverSettings){
    const popUp = document.createElement('div');
    popUp.className = headerElements.popUp.className;


    const bttn = headerElements.listItemsData.GetStatistics
    const popUp_content = document.createElement('div');
    popUp_content.className = bttn.popUp_content.className;

    const form = document.createElement('form');
    const select = document.createElement('select');
    select.className = bttn.popUp_content.selectClassName;

    for(const optionData of Object.keys(bttn.popUp_content.selectOptions)) {
        const option = document.createElement('option');
        option.value = bttn.popUp_content.selectOptions[optionData]
        option.textContent = optionData

        select.append(option)
    }

    form.append(select)

    const br = document.createElement('br');
    form.append(br);

    const button = document.createElement('button');
    button.textContent = bttn.popUp_content.button.text;
    button.type = 'submit';

    form.append(button)

    popUp_content.append(form);

    popUp.append(popUp_content);

    header.append(popUp);
    popUp.style.display = 'none';

    const ExportButtonSettings = headerElements.listItemsData.GetStatistics;

    const exportContent = popUp.querySelector(`.${ExportButtonSettings.popUp_content.className}`);
    const exportContentForm = exportContent.querySelector('form');


    // On click event for ExportStats button -> popUp
    exportContentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const select = exportContentForm.querySelector('select');
        const optionValue = select.options[select.selectedIndex].value;
        let filePath = ''

        for(const fp of Object.values(serverSettings.statisticsFileLocation)){
            if(fp.includes(optionValue)){
                filePath = fp;
                break;
            }
        }

        fetch(ExportButtonSettings.popUp_content.button.fetchRoute, {
            method: ExportButtonSettings.popUp_content.button.method,
            headers : { 'content-type' : 'application/json'},
            body: JSON.stringify({fileLocation: filePath})
        })
            .then(res => res.blob())
            .then(result => {
                const blob = new Blob([result], {type: 'application/octet-stream'});
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = filePath.split('/').pop();
                a.click();
                popUp.style.display = 'none';
            })
            .catch(err => {
                console.log(err)
            });
    });

    window.onclick = function(event) {
        if (event.target === popUp) {
            popUp.style.display = "none";
        }
    }
}

function buildHeader(headerElements, serverSettings) {
    const header = document.querySelector('body header');

    // Build motto
    const motto = document.createElement('p');
    motto.textContent = headerElements.motto;
    header.append(motto);

    // Build ul list
    const list = document.createElement('ul');

    const listItemsData = headerElements.listItemsData;

    for(const listItemData of Object.keys(listItemsData)) {
        const listItem = document.createElement('li');

        const ref = document.createElement('a');
        if(listItemsData[listItemData].href){
            ref.href = listItemsData[listItemData].href;
        }

        const bttn = document.createElement('button');
        bttn.textContent = listItemData;
        bttn.className = listItemsData[listItemData].className;
        ref.append(bttn);

        listItem.append(ref);

        list.append(listItem)
    }

    // Logout button
    const logoutButton = list.querySelector(`.${headerElements.listItemsData.Logout.className}`);

    // Build profile button
    const listItem = document.createElement('li');

    const profileButton = document.createElement('a');
    profileButton.href = headerElements.profileButton.href[accountType];

    const profileIcon = document.createElement('img');
    profileIcon.className = headerElements.profileButton.className;
    profileIcon.src = headerElements.profileButton.src;
    profileIcon.alt = headerElements.profileButton.alterText;
    profileButton.append(profileIcon);

    listItem.append(profileButton);

    list.append(listItem);
    header.append(list);

    // Build popUp
    BuildPopUp(header, headerElements, serverSettings)

    const expStatsButton = list.querySelector(`.${headerElements.listItemsData.GetStatistics.className}`);

    const popUp = header.querySelector(`.${headerElements.popUp.className}`);
    const expStatsPopUp = popUp.querySelector(`.${headerElements.listItemsData.GetStatistics.popUp_content.className}`)

    expStatsButton.addEventListener('click', () => {
        expStatsPopUp.style.display = 'block';
        popUp.style.display = 'block'
    });

    if ( accountType === undefined){

        logoutButton.style.display = "none";
        profileButton.style.display = "none";
        expStatsButton.style.display = "none";
    } else {
        const signInButton = list.querySelector(`.${headerElements.listItemsData.SignIn.className}`);
        const signupButton = list.querySelector(`.${headerElements.listItemsData.SignUp.className}`);

        signInButton.style.display = "none";
        signupButton.style.display = "none";
        expStatsButton.style.display = "block";
    }

}


getServerData().then(({userData, serverSettings}) => {
    const headerElements = {
        motto: "Clearity - Together we can",
        popUp: {
            className: 'popUp',
            content_className: 'popUp-content'
        },
        listItemsData: {
            GetStatistics: {
                className: "GetStatistics",
                popUp_content: {
                    className: 'ExportContent',
                    selectClassName: 'select',
                    selectOptions: {
                        html: '.html',
                        csv: '.csv',
                        pdf: '.pdf'
                    },
                    button: {
                        text: 'Download',
                        fetchRoute: `${serverSettings.statisticsRoutes.getStatistics_client.route}`,
                        method: `${serverSettings.statisticsRoutes.getStatistics_client.method}`
                    }

                }
            },
            SignIn: {
                href: `${serverSettings.staticRoutes.login.route}`,
                className: "SignIn"
            },
            SignUp: {
                href: `${serverSettings.staticRoutes.signup.route}`,
                className: "SignUp"
            },
            Logout: {
                href: `${serverSettings.authRoutes.logout.route}`,
                className: "Logout"
            }
        },
        profileButton: {
            href: {
                user: `${serverSettings.staticRoutes.up.route}`,
                superuser: `${serverSettings.staticRoutes.sup.route}`,
                admin: `${serverSettings.staticRoutes.ap.route}`
            },
            className: "profileButton",
            src: "Resources/Profile/profile-icon.svg",
            alterText: "Profile"
        }
    }

    setAccountType(userData);
    buildHeader(headerElements, serverSettings);


})