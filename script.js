let backdrop = document.querySelector(".backdrop");
let canvas = document.querySelector(".nav__bar");
let thumbnailActv = document.getElementsByClassName("thumbnail");
let cart = document.querySelector(".cart");
let cartBox = document.getElementsByClassName("cart__box")[0];
 

function offCanvas() {
    canvas.classList.add('nav__bar-active');
    backdrop.classList.add("active");
}

// Cart button

cart.addEventListener('click', function() {
        cartBox.classList.toggle('active');
});


// Thumbnail 
let thumbnail = document.getElementsByClassName('thumbnail');

for (let i = 0; i < thumbnail.length; i++ ) {
    thumbnail[i].addEventListener('click', () => {
        for (let i =0; i < thumbnail.length; i++) {
            thumbnail[i].classList.remove('thumbnail-active');
        }
        thumbnail[i].classList.add('thumbnail-active');
    })
}

function closeCanvas() {
    canvas.classList.remove("nav__bar-active");
    backdrop.classList.remove("active");
}

// Slider animation

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("img-slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideIndex-1].style.display = "block";
}

// Backdrop slider animation

let slide = 1;
slideShow(slide);

function nextSlides(n) {
    slideShow(slide += n);
}

function activeSlide(n) {
    slideShow(slide = n);
}

function slideShow(n) {
    let i;
    let slides = document.getElementsByClassName("img-slider");
    if (n > slides.length) {slide = 1}
    if (n < 1) {slide = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slide-1].style.display = "block";
}

function cartEmpty() {
    let cart = document.querySelector('.cart__content');
    cart.innerHTML = '<p>The cart is empty</p>';
    cart.classList.add('empty');
    let cartTitle = document.querySelector('.cart__box').firstElementChild;
    cartTitle.style.color = 'hsl(220, 14%, 75%)';   
}

// Quantity

let quantity = document.getElementById("quantity");
let incrementBtn = document.querySelector('.increment');
let decrementBtn = document.querySelector('.decrement');
let i = 1;
incrementBtn.addEventListener('click', () => {
    quantity.value = i++;
    quantityChanged();
})

decrementBtn.addEventListener('click', () => {
    quantity.value = i--;
    quantityChanged();
})


for (let i = 0; i < quantity.length; i++) {
    let input = quantity[i];
    input.addEventListener('change', quantityChanged);
}

let addToCart = document.getElementsByClassName('add-to-cart');
for (let i = 0; i < addToCart.length; i++) {
    let button = addToCart[i];
    button.addEventListener('click', addToCartClicked);
}

function quantityChanged() {
    if (isNaN(quantity.value) || quantity.value <= 0) {
        quantity.value = 1;
    }
    updateCartTotal()
}

function updateCartTotal() {
    let cartContent = document.querySelector('.cart__content');
    let cartItems = cartContent.getElementsByClassName('item');
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i];
        let priceEl = cartContent.getElementsByClassName('item__price')[0];
        let quantityEl = cartContent.getElementsByClassName('item__quantity')[0];
        
        let price = parseFloat(priceEl.innerText.replace('$', ''));
        let quantity = quantityEl.innerText;
        total = (price * quantity).toFixed(2);

    }
    document.querySelector('.total__price').innerText = '$' + total;
}

function addToCartClicked(event) {
    let button = event.target;
    let title = document.querySelector('.title').innerText;
    let price = document.querySelector('.price').innerText;
    let image = document.querySelector('.img-slide').children[0].src;
    let quantity = document.querySelector('#quantity').value;
    let cartContent = document.querySelector('.cart__content');
    let cartTitle = document.querySelector('.cart__box').firstElementChild;
    cartTitle.style.color = 'black'; 
    cartContent.classList.remove('empty');

    let cartIcon = document.querySelector('.cart');
    let cartCount = document.createElement('span');
    cartCount.classList.add('cart__count');
    cartCount.innerText = 1;
    cartIcon.append(cartCount);

    console.log(title, price, image, quantity);
    addItemToCart(title, price, image, quantity);
    updateCartTotal();
    let removeBtn = document.querySelector('.remove__cart');

    removeBtn.addEventListener('click', () => {
        let cartItem = document.querySelector('.item');
        cartContent.removeChild(cartItem);
        cartIcon.removeChild(cartCount);
        cartEmpty()
    })
}

function addItemToCart(title, price, image, quantity) {
    let cartContent = document.querySelector('.cart__content');
    let cartItem = document.createElement('div');
    cartItem.classList.add('item');
    // if (cartContent.innerHTML === '<p>The cart is empty!</p>') {
    //     console.log(cartContent.innerHTML);
        cartContent.innerHTML = '';
        cartItemContent = 
        `
        <img src="${image}" alt="" />
        <div class="item__description">
            <h4 class="item__name">${title}</h4>
            <p class="checkout__price">
                <span class = "item__price">${price}</span> x <span class="item__quantity">${quantity}</span>
                <span class="total__price">0</span>
            </p>
        </div>
        <button class="remove__cart">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </button>`;
        cartItem.innerHTML = cartItemContent;
        cartContent.append(cartItem);
        let checkoutBtn = document.createElement('button');
        checkoutBtn.classList.add('checkout');
        checkoutBtn.innerHTML = 'Checkout';
        cartContent.append(checkoutBtn);

    // } else if (cartContent.contains(cartItem)) {
    //     let itemQuantity = document.querySelector('.item__quantity');
    //     itemQuantity.innerHTML = quantity;
    // }
}


let sliderImg = document.querySelectorAll('.img-slide');
let backdropSlider = document.querySelector('.backdrop-slider');
let sliderBackdrop = document.querySelector('.backdrop__slider');

sliderImg.forEach(el => {
    el.addEventListener('click', () => {
        sliderBackdrop.classList.add('backdrop__slider--active');
        backdropSlider.classList.add('backdrop-slider__active');
    } )
});

// close slider
let closeSlideBtn = document.querySelector('.close__backdrop-slide ');

closeSlideBtn.addEventListener('click', () => {
    backdropSlider.classList.remove('backdrop-slider__active');
    sliderBackdrop.classList.remove('backdrop__slider--active');

})
