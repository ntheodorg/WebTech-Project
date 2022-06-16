// let userData = { accountType: 'unloaded'};
// let ok = 0;

// function fun1(){
//     fetch('/api/GetAccountType')
//         .then(response => response.json())
//         .then(json => {
//
//             userData = json;
//             console.log(userData)
//             ok = 1
//         })
//         .catch(err => {
//             console.log(err);
//             userData = {}
//             ok = 1
//         });
//
// }




// while(ok == 0) {
//     ok = 1;
// }
// console.log(userData)
// function fun2(){
//     // fun1()
// }
// fun2()


export async function getServerData() {
    let userData
    let serverSettings
    try {
        const res = await fetch('/api/GetUserData');
        userData = await res.json();

    } catch (err) {
        console.log(err);
        userData = {}
    }
    try {
        const res = await fetch('/api/GetServerSettings');
        serverSettings = await res.json();

    } catch (err) {
        console.log(err);
        serverSettings = {}
    }

    return {userData, serverSettings}
};

