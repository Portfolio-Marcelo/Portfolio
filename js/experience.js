document.addEventListener("DOMContentLoaded", () => {
    fetch("json/experience.json")
    .then(response => response.json())
    .then(data => {
        const experienceContainer = document.getElementById("exp-content");
        const cardList = document.createElement("div");
        cardList.classList.add("exp-card-list");

        experienceContainer.appendChild(cardList);
        data.experiences.forEach(experience => {  
            const card = document.createElement("article");
            card.classList.add("exp-card");

            card.innerHTML = `
                <aside class="experience-img">
                    <img src="${experience.img}"></img>
                </aside>
                <aside class="experience-info">
                    <h3>${experience.title}</h3>
                    <span>${experience.position}</span>
                    <p>${experience.description}</p>
                </aside>
            `;
            card.addEventListener("click", () => {
                redirect(experience.enlace);
            });

            //event.button === 1 es el botón scroll
            card.addEventListener("mousedown", (event) => {
                if (event.button === 1) {
                    window.open(experience.enlace, "_blank");
                    event.preventDefault();
                }
            });

            cardList.appendChild(card);
        });
    })
});

function redirect(link){
    window.location.href = link;
}