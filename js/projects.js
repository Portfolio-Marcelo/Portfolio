document.addEventListener("DOMContentLoaded", () => {
    fetch("json/projects.json")
        .then(response => response.json())
        .then(data => {
            const experienceContainer = document.getElementById("prj-content");

            data.section.forEach(section => {
                const sectionElement = document.createElement("section");
                sectionElement.classList.add("prj-section");

                sectionElement.innerHTML = `
                    <header class="prj-section-type-header">
                        <h2>${section.header}</h2>
                    </header>
                    <main></main>
                `;

                const mainElement = sectionElement.querySelector("main");

                section.type.forEach(type => {
                    const typeElement = document.createElement("div");

                    typeElement.innerHTML = `
                        <header class="prj-section-type-header">
                            <h3>${type.title}</h3>
                        </header>
                        <div>
                            <main class="prj-card-list"></main>
                        </div>
                    `;

                    const cardList = typeElement.querySelector(".prj-card-list");

                    type.cards.forEach(card => {
                        const cardElement = document.createElement("div");
                        cardElement.classList.add("prj-card");

                        let descriptionHTML = "";
                        if (typeof card.main.description === "string") {
                            descriptionHTML = card.main.description;
                        } else if (Array.isArray(card.main.description)) {
                            card.main.description.forEach(item => {
                                if (typeof item === "string") {
                                    descriptionHTML += item;
                                } else if (typeof item === "object" && item.url) {
                                    descriptionHTML += `<a href="${item.url}" target="_blank">${item.text}</a>`;
                                }
                            });
                        }

                        cardElement.innerHTML = `
                            <header>
                                <img src="${card.header.img}" loading="lazy">
                                <div class="header-text">
                                    <h4>${card.header.title}</h4>
                                    <span>${card.header.tecnologies}</span>
                                </div>
                            </header>
                            <main>
                                <p>${descriptionHTML}</p>
                            </main>
                            <footer>
                                <p>${card.footer.type}</p>
                                <i class="${card.footer.icon}"></i>
                            </footer>
                        `;

                        cardList.appendChild(cardElement);
                    });

                    mainElement.appendChild(typeElement);
                });
                
                experienceContainer.appendChild(sectionElement);
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});
