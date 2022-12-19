const Color = {
    Red: 1,
    Orange: 2,
    Yellow: 3,
    Green: 4,
    Blue: 5,
    Indigo: 6,
    Violet: 7
};

const Material = {
    Wood: 1,
    Copper: 2,
    Silver: 3,
    Gold: 4,
    Platinum: 5
};

const Shape = {
    Dot: 1,
    Line: 2,
    Triangle: 3,
    Square: 4,
    Pentagon: 5,
    Hexagon: 6,
    '7-gon': 7,
    '8-gon': 8,
    '9-gon': 9,
    '10-gon': 10,
    '11-gon': 11,
    '12-gon': 12
};

const Size = {
    Small: 1,
    Medium: 2,
    Large: 3,
    XLarge: 4,
    XXLarge: 5,
};

const Property = {
    Color,
    Material,
    Shape,
    Size
};

const wcst = document.querySelector(".wcst-outer");
const wcstLevel = wcst.querySelector(".wcst-level");
const wcstList = wcst.querySelector(".wcst-list");

function invertMap(map) {
    return Object.entries(map).reduce((a, b) => (a[b[1]] = b[0], a), {});
}

function shuffle(array) {
    const copy = [...array];
    array.forEach(() => {
        const a = random(0, array.length);
        const b = random(0, array.length);
        [copy[a], copy[b]] = [copy[b], copy[a]];
    });
    return copy;
}

function random(start = 0, end = 1) {
    if (start && Array.isArray(start))
        return start[Math.floor(Math.random() * start.length)];
    return start + Math.floor((Math.random() * (end - start)));
}

function coinFlip() {
    return Math.random() > 0.5;
}

function fieldSorter(fields) {
    return function (a, b) {
        return fields
            .map(o => {
                let dir = 1;
                if (o[0] === '-') (dir = -1, o = o.substring(1))
                return a[o] > b[o]
                    ? dir
                    : a[o] < b[o]
                        ? -(dir)
                        : 0;
            })
            .reduce((p, n) => p ? p : n, 0);
    };
}

function checkOrder(expectedCards) {

    const userCardEls = [...wcstList.children];
    const userCards = userCardEls
        .map(c => JSON.parse(c.getAttribute('data-obj')));

    for (let i = 0; i < expectedCards.length; i++) {
        const expectedCard = expectedCards[i];
        const userCard = userCards[i];
        if (JSON.stringify(expectedCard) === JSON.stringify(userCard)) {
            userCardEls[i].classList.remove('wcst-list-item--wrong');
            userCardEls[i].classList.add('wcst-list-item--right');
        }
        else {
            userCardEls[i].classList.remove('wcst-list-item--right');
            userCardEls[i].classList.add('wcst-list-item--wrong');
        }
    }

    return userCardEls.every(el => el.classList.contains('wcst-list-item--right'));
}

function makeDraggable(el, opts = {}) {

    const { onDragStart, onDragEnd } = opts;

    let CUSTOM_CLASS = "draggable";
    let ACTIVE_CLASS = "dragging"
    el.classList.add(CUSTOM_CLASS);
    el.addEventListener("mousedown", mdHandler);
    el.addEventListener("touchstart", mdHandler);

    function mdHandler(mdevt) {

        if (onDragStart)
            onDragStart(el);

        let { x, y } = el.getBoundingClientRect();
        let originX = x;
        let originY = y;

        el.classList.add(ACTIVE_CLASS);
        el.style.position = "relative";

        let draggables = [...document.querySelectorAll(`.${CUSTOM_CLASS}`)];
        let inactiveDraggables = draggables
            .filter(draggable => !draggable.classList.contains(ACTIVE_CLASS));

        let colliding;
        function mmHandler(mmevt) {

            let pointerX;
            let pointerY;
            if ("changedTouches" in mmevt) {
                pointerX = mmevt.changedTouches[0].pageX;
                pointerY = mmevt.changedTouches[0].pageY;
            } else {
                pointerX = mmevt.pageX;
                pointerY = mmevt.pageY;
            }

            colliding = inactiveDraggables.filter(draggable => {
                let { x, y, width, height } = draggable.getBoundingClientRect();
                return pointerX > x
                    && pointerX < x + width
                    && pointerY > y
                    && pointerY < y + height;
            })[0];

            draggables.forEach(draggable =>
                draggable.style.removeProperty("opacity")
            );

            if (colliding) {
                colliding.style.opacity = ".5";
            }

            el.style.top = (pointerY - originY) + "px";
            el.style.left = (pointerX - originX) + "px";
            el.style.transform = "translate(-50%, -50%)";
        }

        function muHandler(muevt) {
            el.classList.remove(ACTIVE_CLASS);
            el.style.removeProperty("position");
            el.style.removeProperty("top");
            el.style.removeProperty("left");
            el.style.removeProperty("transform");

            draggables.forEach(draggable =>
                draggable.style.removeProperty("opacity")
            );

            if (colliding) {
                let parent = el.parentNode;
                let children = [...parent.children];
                let elIndex = children.indexOf(el);
                let collIndex = children.indexOf(colliding);

                [children[elIndex], children[collIndex]] = [children[collIndex], children[elIndex]];

                parent.innerHTML = '';
                children.forEach(child => parent.appendChild(child));

                if (onDragEnd)
                    onDragEnd(el, colliding);
            }

            document.removeEventListener("mousemove", mmHandler);
            document.removeEventListener("mouseup", muHandler);
            document.removeEventListener("touchmove", mmHandler);
            document.removeEventListener("touchend", muHandler);
        }

        document.addEventListener("mousemove", mmHandler);
        document.addEventListener("mouseup", muHandler);
        document.addEventListener("touchmove", mmHandler);
        document.addEventListener("touchend", muHandler);
    }
}

function addCard(card) {

    const sentence = shuffle(
        Object.entries(card)
            .map(tuple =>
                invertMap(Property[tuple[0]])[tuple[1]]
            )
    )
    .join(' ');

    let div = document.createElement("DIV");
    div.classList.add("wcst-list-item");
    let span = document.createElement("SPAN");
    span.classList.add("word-node");
    span.innerText = sentence;
    div.appendChild(span);

    div.setAttribute('data-obj', JSON.stringify(card));

    wcstList.appendChild(div);
    return div;
}

function generateCards(length, minWidth, cb) {

    wcstList.innerHTML = '';

    const propertyKeys = Object.keys(Property);

    const selQtyProperty = random(minWidth, propertyKeys.length);
    const selStart = random(0, propertyKeys.length);

    let selPropertyKeys = Array(selQtyProperty).fill(0)
        .map((_, i) => propertyKeys[(i + selStart) % propertyKeys.length]);
    selPropertyKeys = shuffle(selPropertyKeys);
    const selPropertyKeysWithOrder = selPropertyKeys.map(key => coinFlip() ? '-' + key : key);

    const cards = Array(length).fill(0)
        .map(() => { // This could be done with .reduce()
            const r = {};
            selPropertyKeys.map(key =>
                r[key] = Property[key][random(Object.keys(Property[key]))]
            )
            return r;
        });

    const expectedCards = cards.sort(fieldSorter(selPropertyKeysWithOrder));
    let userCards = shuffle(expectedCards);
    while(JSON.stringify(expectedCards) === JSON.stringify(userCards))
        userCards = shuffle(expectedCards);

    userCards.forEach(c =>
        makeDraggable(
            addCard(c),
            {
                onDragEnd: () => {
                    if (!checkOrder(expectedCards))
                        return;
                    wcstList.innerHTML = `
<div class="wcst-resume">
    <div class="wcst-resume__intro">The ruleset was</div>
    <div class="wcst-resume__ruleset">${selPropertyKeysWithOrder.join(' > ')}</div>
</div>
                    `;
                    const next = document.createElement('BUTTON');
                    next.innerText = 'NEXT';
                    next.onclick = cb;
                    wcstList.firstElementChild.appendChild(next)
                }
            }
        )
    );

    checkOrder(expectedCards);
}