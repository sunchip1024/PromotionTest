import { execute as WholeExecute } from "./scripts/WholeRotation";
import { execute as PartExecute } from "./scripts/PartRotation";

function Initialize() {
    let page = 0;
    const PAGE_SIZE = 3;

    function onClickLeft() {
        page = ((page + PAGE_SIZE) - 1) % PAGE_SIZE;
        PartExecute(page);
        console.log("Page : " + page.toString());
    }

    function onClickRight() {
        page = (page + 1) % PAGE_SIZE;
        PartExecute(page);
        console.log("Page : " + page.toString());
    }

    const LEFT_BUTTON = document.querySelector("#slide2-prev");
    LEFT_BUTTON.addEventListener("click", onClickLeft);

    const RIGHT_BUTTON = document.querySelector("#slide2-next");
    RIGHT_BUTTON.addEventListener("click", onClickRight);

    WholeExecute();
    PartExecute(page);
}

Initialize();