const navElements = {
    logo: {
        href: "Home",
        className: "logo",
        src: "Resources/Home/logo.png",
        alt: "Clearity"
    },
    listItemsData: {
        element1: {
            href: "Home",
            text: "Home"
        },
        element2: {
            href: "IasiMap",
            text: "Iasi Map"
        },
        element3: {
            href: "News",
            text: "News"
        }
    },
    currentClassName: "active"
}

function buildNavBar() {
    const nav = document.querySelector('body nav');

    // Build logo
    const logo = document.createElement('div');
    const logo_a = document.createElement('a');
    const logo_img = document.createElement('img');

    logo_a.href = navElements.logo.href;
    logo_img.className = navElements.logo.className;
    logo_img.src = navElements.logo.src;
    logo_img.alt = navElements.logo.alt;

    logo.append(logo_a);
    logo_a.append(logo_img);

    // Build ul list
    const list = document.createElement('ul');

    const listItemsData = navElements.listItemsData;

    for(const listItemData of Object.keys(listItemsData)) {
        const listItem = document.createElement('li');

        const ref = document.createElement('a');
        ref.href = listItemsData[listItemData].href;
        ref.textContent = listItemsData[listItemData].text;

        listItem.append(ref);

        list.append(listItem)
    }

    
    nav.append(logo);
    nav.append(list);

    // Add design on current page
    const current_url = document.location.href;
    const lastSegment = current_url.split('/').pop();
    const listItems = list.children;

    for(var i=0; i < listItems.length; i++){
        const listItem = listItems[i];
        const itemHref = listItem.querySelector('a');

        if(lastSegment === itemHref.getAttribute("href")){
            itemHref.className = navElements.currentClassName;
            break;
        }
    }
}


buildNavBar();