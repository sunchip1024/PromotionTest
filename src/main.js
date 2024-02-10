import { Initialize as WholeInitialize } from "./scripts/WholeRotation";
import { Initialize as PartInitialize, ActiveModel as PartActiveModel } from "./scripts/PartRotation";

const PAGE_SIZE = 3;

function Initialize() {
    let page = 0;

    function onClickLeft() {
        page = ((page + PAGE_SIZE) - 1) % PAGE_SIZE;
        PartActiveModel(page);
    }

    function onClickRight() {
        page = (page + 1) % PAGE_SIZE;
        PartActiveModel(page);
    }

    const LEFT_BUTTON = document.querySelector("#slide2-prev");
    LEFT_BUTTON.addEventListener("click", onClickLeft);

    const RIGHT_BUTTON = document.querySelector("#slide2-next");
    RIGHT_BUTTON.addEventListener("click", onClickRight);

    WholeInitialize();
    PartInitialize();
}

Initialize();