export function expandBook(element) {
    const button = element.querySelector("#overlay-button");
    let src = "https://picsum.photos/800/600";

    button.addEventListener("click", () => {
        if (element.id !== "clicked-card") {
            const cardText = element.querySelector("#card-text");
            const cardTitle = element.querySelector("#card-title");
            const cardSubtitle = element.querySelector("#card-subtitle");
            const body = element.querySelector("#no-style");
            const info = element.querySelector("#invisible-info-bubble");
            const image = element.querySelector("#hidden-image");

            cardText.id = "card-text-selected";
            cardTitle.id = "card-title-selected";
            cardSubtitle.id = "card-subtitle-selected";
            body.id = "clicked-body";
            element.id = "clicked-card";
            info.id = "info-bubble";
            info.style.marginTop = "2em";
            image.id = "book-image";
            image.src = src;
            return;
        }
        const cardText = element.querySelector("#card-text-selected");
        const cardTitle = element.querySelector("#card-title-selected");
        const cardSubtitle = element.querySelector("#card-subtitle-selected");
        const body = element.querySelector("#clicked-body");
        const info = element.querySelector("#info-bubble");
        const image = element.querySelector("#book-image");

        cardText.id = "card-text";
        cardTitle.id = "card-title";
        cardSubtitle.id = "card-subtitle";
        body.id = "no-style";
        element.id = "base-card";
        info.id = "invisible-info-bubble";
        image.id = "hidden-image";
    });
}
