const spinner = document.querySelector("#spinner");
const message = document.querySelector("#massage");
const image = document.querySelector("#image");
const promptX = document.querySelector("#prompt");
const size = document.querySelector("#size");
const imageForm = document.querySelector("#image-form");

const showSpinner = () => {
    spinner.classList.add("show");
};

const removeSpinner = () => {
    spinner.classList.remove("show");
};

const generateImageRequest = async (prompt, size) => {
    try {
        showSpinner();
        message.textContent = "";
        image.src = "";

        const rs = await fetch("/openai/generateimage", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, size }),
        });

        if (rs.status !== 200) {
            removeSpinner();
            throw new Error("That image could not be generated");
        }

        const data = await rs.json();
        const imageUrl = data.data;

        image.src = imageUrl;

        removeSpinner();
    } catch (e) {
        message.textContent = e;
    }
};

const onSubmit = e => {
    e.preventDefault();

    if (promptX.value === "") {
        alert("Please add some text");
        return;
    }

    generateImageRequest(promptX.value, size.value);
};

imageForm.addEventListener("submit", onSubmit);
