const header = document.createElement('header');
header.classList.add('bg-gray-800', 'py-4', 'px-6', 'text-white');

const logo = document.createElement('h1');
logo.classList.add('text-2xl', 'font-bold');
logo.textContent = 'My Website';

const nav = document.createElement('nav');
nav.classList.add('flex', 'space-x-4');

const homeLink = document.createElement('a');
homeLink.classList.add('text-white', 'hover:text-gray-300');
homeLink.href = '/';
homeLink.textContent = 'Home';

const aboutLink = document.createElement('a');
aboutLink.classList.add('text-white', 'hover:text-gray-300');
aboutLink.href = '/about';
aboutLink.textContent = 'About';

nav.appendChild(homeLink);
nav.appendChild(aboutLink);

header.appendChild(logo);
header.appendChild(nav);

document.body.appendChild(header);