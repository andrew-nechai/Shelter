//console.log("ПРОСЬБА ДЛЯ ПРОВЕРЯЮЩИХ: проверяйте верстку для телефонов путем уменьшения ширины окна браузера, иначе если вы будете делать это в responsive, там будет видно бургер меню (это ошибка самого хрома скорее всего)")
function burgerAction() {
    let burgerIconWrapp = document.querySelector('.burger-menu__icon_wrapper');
    let burgerIcon = document.querySelector('.burger-menu__icon');
    let burgerMenu = document.querySelector('.burger-menu');
    let logo = document.getElementById('logo');
    let body = document.getElementsByTagName('body')[0];
    let darkBg = document.querySelector('.burger-menu__black-bg');
    
    burgerIconWrapp.addEventListener('click', (e) => {
        changeBurger();
    });
    
    darkBg.addEventListener('click', (e) => {
        changeBurger();
    });
    
    
    function changeBurger() {
        burgerIconWrapp.classList.toggle("burger-menu__icon_active");
        burgerMenu.classList.toggle("invisable");
        burgerMenu.classList.toggle("burger-menu_active");
        burgerMenu.classList.toggle("hiddeny-overflow");
        logo.classList.toggle("logo_hide");
        body.classList.toggle('hiddeny-overflow');
        darkBg.classList.toggle('burger-menu__black-bg_active');
    }
}



//слайдер
function sliderAction() {
    const slidesBlocks = document.querySelectorAll('.slides');

    const btnLeft = document.querySelector('.slider__btn-left');
    const btnRight = document.querySelector('.slider__btn-right');
    let isEnabled = true;
    let currentItem = 0;

    function changeCurrentItem(n) {
        currentItem = (n + slidesBlocks.length) % slidesBlocks.length;
    }

    function hideItem(direction) {
        isEnabled = false;
        slidesBlocks[currentItem].classList.add(direction);
        slidesBlocks[currentItem].addEventListener('animationend', function() {
            this.classList.remove('active', direction);
        });
    }

    function showItem(direction) {
        slidesBlocks[currentItem].classList.add('next', direction);
        slidesBlocks[currentItem].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    }

    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }


    //random values
    let pets = [];
    let prevMasVsPets = []

    const request = new XMLHttpRequest();
    request.open('GET', './pets.json');

    request.onload = () => {
        pets = JSON.parse(request.response);

        innerSlidesInBlock(prevMasVsPets);
        changeCurrentItem(currentItem);
    }

    request.send();


    function innerSlidesInBlock(prevMas) {
        let genMas = getRandomInt(0, 7, prevMas);
        slidesBlocks[currentItem].innerHTML = "";
        for (let i = 0; i<3; i++){
            let block = document.createElement('div');
            block.classList.add('slide');
            block.innerHTML = `<div class="slide__image">
                    <img src="${pets[genMas[i]].img}">
                </div>
                <div class="slide__title">${pets[genMas[i]].name}</div>
                <button class="slide__button">Learn more</button>`;
            block.addEventListener('click', () => {modalConfig(mas)});
            slidesBlocks[currentItem].appendChild(block);
            let mas = pets[genMas[i]];
        }
        prevMasVsPets = genMas;
    }

    function getRandomInt(min, max, prevValues = []) {
        let resMas = [];
        let v = Math.floor(Math.random() * (max - min)) + min;
        
        let flag = true;
        for (let i = 0; i < 3; i++) {
            while (prevValues.includes(v) || resMas.includes(v)) {
                if (v == max) {
                    v--;
                    flag = true;
                    continue;
                }
                if (v == min) {
                    v++;
                    flag=false;
                    continue;
                }
                if (flag) {
                    v--
                } else {
                    v++;
                }
            }
            resMas.push(v);
        }
        return resMas
    }

    console.log(getRandomInt(0, 7, [1,2,3]));

    btnLeft.addEventListener('click', (e) => {
        if (isEnabled) {
            previousItem(currentItem);
            innerSlidesInBlock(prevMasVsPets);
        }
    });

    btnRight.addEventListener('click', (e) => {
        if (isEnabled) {
            nextItem(currentItem);
            innerSlidesInBlock(prevMasVsPets);
        }
    });

}

function modalConfig(pet) {
    const bgBlack = document.querySelector(".modal-window__black-bg");

    let block = document.createElement('div');
    block.classList.add("modal-window_w");

    let block2 = document.createElement('div');
    block2.classList.add("modal-window");
    block2.classList.add("to-top");
    
    let block3 = document.createElement('div');
    block3.classList.add('modal-window__black-bg');
    block3.classList.add('to-opacityOn');

    block2.innerHTML = `
            <div class="cross-wrapper">
                <div class="slider__btn slider__btn_hovered btn-cross">
                    <img src="assets/images/cross.svg" alt="X">
                </div>
            </div>
            <div class="modal-window__wrapper">
                    <div class="modal-window__pet-wrap">
                        <img src="${pet.img}" alt="Pet">
                    </div>
                    <div class="modal-window__description">
                        <div class="modal-window__title-wrap">
                            <h3 class="modal-window__title">${pet.name}</h3>
                        </div>
                        <div class="modal-window__subtitle">${pet.breed}</div>
                        <div class="modal-window__addinfo">
                            ${pet.description}
                        </div>
                        <div class="modal-window__list-wrap">
                            <ul class="modal-window__list" type="disc">
                                <li class="modal-window__listitem"><span>Age: </span><span>${pet.age}</span></li>
                                <li class="modal-window__listitem"><span>Inoculations: </span><span>${pet.inoculations[0]}</span></li>
                                <li class="modal-window__listitem"><span>Diseases: </span><span>${pet.diseases[0]}</span></li>
                                <li class="modal-window__listitem"><span>Parasites: </span><span>${pet.parasites[0]}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`;
    block.append(block2);
    block.append(block3)

    document.body.prepend(block);


    function hideModal() {
        block2.classList.remove('to-top');
        block2.classList.add('from-top');
        block2.addEventListener('animationend', () => {hide()});
        block3.classList.remove('to-opacityOn');
        block3.classList.add('to-opacityOff');

        function hide() {
            block.parentNode.removeChild(block);
            document.body.classList.remove("hiddeny-overflow");
        }
    }

    document.querySelector(".cross-wrapper").addEventListener('click', (e) => {
        hideModal();
    })

    let cross = document.querySelector(".btn-cross").addEventListener("click", (e) => {
        hideModal();
    });

    block3.addEventListener('click', (e) => {
        hideModal();
    })

    document.body.classList.add("hiddeny-overflow");
}
