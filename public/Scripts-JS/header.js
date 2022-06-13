const headerElements = {
    motto: "Clearity - Together we can",
    listItemsData: {
        SignIn: {
            href: "Login",
            className: "SignIn"
        },
        SignUp: {
            href: "SignUp",
            className: "SignUp"
        },
        Logout: {
            href: "/api/LogOut",
            className: "Logout"
        }
    },
    profileButton: {
        href: {
            user: "UP",
            superuser: "SU",
            admin: "AP"
        },
        className: "profileButton",
        src: "../Resources/Profile/profile-icon.svg",
        alterText: "Profile"
    }
}
let accountType;

function setAccountType(json) {
    accountType = json.accountType;
}


(async() => {
    try {
        const res = await fetch('/api/GetAccountType');
        const data = await res.json();

        setAccountType(data)
        buildHeader();

    } catch (err) {
        console.log(err);
    }
})();


function buildHeader() {
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
        ref.href = listItemsData[listItemData].href;

        const bttn = document.createElement('button');
        bttn.textContent = listItemData;
        bttn.className = listItemsData[listItemData].className;
        ref.append(bttn);

        listItem.append(ref);

        list.append(listItem)
    }





    // Logout button
    console.log(`.${headerElements.listItemsData.Logout.className}`);
    const logoutButton = list.querySelector(`.${headerElements.listItemsData.Logout.className}`);
    // logoutButton.href = null;
    // logoutButton.addEventListener('click', async (e) => {
    //     // e.preventDefault();
    //
    //     const res = await fetch('/api/LogOut');
    //     const data = await res.json();
    // })

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

    console.log(accountType)

    if ( accountType == undefined){

        logoutButton.style.display = "none";
        profileButton.style.display = "none";
    } else {
        const signInButton = list.querySelector(`.${headerElements.listItemsData.SignIn.className}`);
        const signupButton = list.querySelector(`.${headerElements.listItemsData.SignUp.className}`);

        signInButton.style.display = "none";
        signupButton.style.display = "none";
    }

    header.append(list);


}

// const headerElements = {
//     motto: "Clearity - Together we can",
//     listItemsData: {
//         SignIn: {
//             href: "Login",
//             className: "SignIn"
//         },
//         SignUp: {
//             href: "SignUp",
//             className: "SignUp"
//         },
//         Logout: {
//             href: "",
//             className: "Logout"
//         }
//     },
//     profileButton: {
//         href: {
//             user: "UP",
//             superuser: "SU",
//             admin: "AP"
//         },
//         className: "profileButton",
//         src: "../Resources/Profile/profile-icon.svg",
//         alterText: "Profile"
//     }
// }
// let accountType;
//
// function setAccountType(json) {
//     accountType = json.accountType;
// }
//
//
// (async() => {
//     try {
//         const res = await fetch('/api/GetAccountType');
//         const data = await res.json();
//
//         setAccountType(data)
//         buildHeader();
//
//     } catch (err) {
//         console.log(err);
//     }
// })();
//
//
// function buildHeader() {
//     const header = document.querySelector('body header');
//
//     // Build motto
//     const motto = document.createElement('p');
//     motto.textContent = headerElements.motto;
//     header.append(motto);
//
//     // Build ul list
//     const list = document.createElement('ul');
//
//     const listItemsData = headerElements.listItemsData;
//
//     for(const listItemData of Object.keys(listItemsData)) {
//         const listItem = document.createElement('li');
//
//         const ref = document.createElement('a');
//         ref.href = listItemsData[listItemData].href;
//
//         const bttn = document.createElement('button');
//         bttn.textContent = listItemData;
//         bttn.className = listItemsData[listItemData].className;
//         ref.append(bttn);
//
//         listItem.append(ref);
//
//         list.append(listItem)
//     }
//
//
//
//
//
//     // Logout button
//     console.log(`.${headerElements.listItemsData.Logout.className}`);
//     const logoutButton = list.querySelector(`.${headerElements.listItemsData.Logout.className}`);
//     logoutButton.href = null;
//     logoutButton.addEventListener('click', async (e) => {
//         // e.preventDefault();
//
//         const res = await fetch('/api/LogOut');
//         const data = await res.json();
//     })
//
//     // Build profile button
//     const listItem = document.createElement('li');
//
//     const profileButton = document.createElement('a');
//     profileButton.href = headerElements.profileButton.href[accountType];
//
//     const profileIcon = document.createElement('img');
//     profileIcon.className = headerElements.profileButton.className;
//     profileIcon.src = headerElements.profileButton.src;
//     profileIcon.alt = headerElements.profileButton.alterText;
//     profileButton.append(profileIcon);
//
//     listItem.append(profileButton);
//
//     list.append(listItem);
//
//     console.log(accountType)
//
//     if ( accountType == undefined){
//
//         logoutButton.style.display = "none";
//         profileButton.style.display = "none";
//     } else {
//         const signInButton = list.querySelector(`.${headerElements.listItemsData.SignIn.className}`);
//         const signupButton = list.querySelector(`.${headerElements.listItemsData.SignUp.className}`);
//
//         signInButton.style.display = "none";
//         signupButton.style.display = "none";
//     }
//
//     header.append(list);
//
//
// }

