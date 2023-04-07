const nameList = document.getElementById('name-list');
const searchInput = document.getElementById('search');


searchInput.addEventListener('input', () => {
    
    const nameElements = nameList.getElementsByTagName('li');
    const searchQuery = searchInput.value.trim().toLowerCase();

    for (const nameElement of nameElements) {
        const nameText = nameElement.textContent.trim().toLowerCase();
        if (nameText.includes(searchQuery)) {
            nameElement.classList.remove('d-none');

        } else {
            nameElement.classList.add('d-none');
        }
    }
});
