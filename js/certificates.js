document.addEventListener("DOMContentLoaded", () => {
    fetch("json/certificates.json")
    .then(response => response.json())
    .then(data => {
        const certificatesContainer = document.getElementById("crt-content");
        const cardList = document.createElement("div");
        cardList.classList.add("crt-card-list");

        certificatesContainer.appendChild(cardList);
        data.certificates.forEach(certificate => {
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("crt-card-container");  
            const card = document.createElement("article");
            card.classList.add("crt-card");

            card.innerHTML = `
                <aside class="certificate-img">
                    <img src="${certificate.img}"></img>
                </aside>
                <aside class="certificate-info">
                    <h3>${certificate.title}</h3>
                    <span>${certificate.subtitle}</span>
                    <p>${certificate.habilities}</p>
                </aside>
            `;
            card.addEventListener("click", () => {
                redirect(certificate.enlace);
            });

            //event.button === 1 es el botón scroll
            card.addEventListener("mousedown", (event) => {
                if (event.button === 1) {
                    window.open(certificate.enlace, "_blank");
                    event.preventDefault();
                }
            });

            cardContainer.appendChild(card);

            cardList.appendChild(cardContainer);
        });
    })
});

function redirect(link){
    window.location.href = link;
}