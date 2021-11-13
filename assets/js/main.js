$(() => {
    let productsBlock = $('.products .container');
    let basketBlock = $('.basket .container');

    let productsTitleElement = $('.products .title');
    let productsTitle = productsTitleElement.html();

    let basketTitleElement = $('.basket .title');
    let basketTitle = basketTitleElement.html();

    let createProductTemplate = product => {
        return `
            <div class="product card flex-column flex-align-center flex-justify-center mtb-5">
                <img class="card-img-top mtb-10 w-20" src="` + product.image + `" alt="Product image cap">
                <div class="card-body">
                    <h3 class="card-title">` + product.title + `</h3>
                    <h6 class="card-description">` + product.description + `</h6>
                    <div class="price-wrapper flex-row flex-justify-sb">
                        <h5 class="card-text">$` + product.price + `</h5>
                        <h5 class="card-text">Left: ` + product.leftover + `</h5>
                    </div>
                </div>
            </div>
        `;
    };

    let products = [{
            title: "Product 1",
            description: "Product 1 Description",
            price: 50,
            image: "assets/img/products/product-1.png",
            leftover: 10,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 2",
            description: "Product 2 Description",
            price: 94,
            image: "assets/img/products/product-2.png",
            leftover: 6,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 3",
            description: "Product 3 Description",
            price: 666,
            image: "assets/img/products/product-3.png",
            leftover: 9,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 4",
            description: "Product 4 Description",
            price: 25,
            image: "assets/img/products/product-4.png",
            leftover: 100,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 5",
            description: "Product 5 Description",
            price: 100,
            image: "assets/img/products/product-5.png",
            leftover: 13,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 6",
            description: "Product 6 Description",
            price: 1000,
            image: "assets/img/products/product-6.png",
            leftover: 3,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 7",
            description: "Product 7 Description",
            price: 2500,
            image: "assets/img/products/product-7.png",
            leftover: 5,
            getTemplate: function() { return createProductTemplate(this); }
        },
        {
            title: "Product 8",
            description: "Product 8 Description",
            price: 10000,
            image: "assets/img/products/product-8.png",
            leftover: 1,
            getTemplate: function() { return createProductTemplate(this); }
        },
    ];

    let basket = [];

    products.forEach((product, i) => {
        product.id = i;
        let basketProduct = Object.assign({}, product);
        basketProduct.leftover = 0;
        basket.push(basketProduct);
    });

    let getProductById = id => {
        return products.filter((pr, i) => pr.id === id)[0];
    };

    let getBasketProductById = id => {
        return basket.filter((pr, i) => pr.id === id)[0];
    };

    let getBasketTotalPrice = () => {
        let price = 0;
        basket.forEach(product => {
            price += product.price * product.leftover;
        });

        return price;
    };

    let productOnClick = (element, product) => {
        if (product.leftover > 0) {
            product.leftover--;
            getBasketProductById(product.id).leftover++;
            updateProductsList();
        }
    };

    let basketProductOnClick = (element, product) => {
        if (product.leftover > 0) {
            product.leftover--;
            getProductById(product.id).leftover++;
            updateProductsList();
        }
    };

    let selectAllProducts = () => {
        products.forEach(product => {
            getBasketProductById(product.id).leftover += product.leftover;
            product.leftover = 0;
        });
        updateProductsList();
    }

    let deselectAllProducts = () => {
        basket.forEach(product => {
            getProductById(product.id).leftover += product.leftover;
            product.leftover = 0;
        });
        updateProductsList();
    };

    $('.select-all-link').on('click', selectAllProducts);
    $('.deselect-all-link').on('click', deselectAllProducts);

    let updateProductsList = () => {
        productsBlock.empty();
        basketBlock.empty();

        basketTitleElement.html(basketTitle + " - $" + getBasketTotalPrice());

        let i = 0;
        products.forEach(product => {
            productsBlock.append(product.getTemplate());
            let element = productsBlock.children().eq(i++);
            if (product.leftover !== 0) {
                element.on('click', () => productOnClick(element, product));
            } else {
                element.addClass('sold-out');
            }
        });
        i = 0;
        basket.forEach(product => {
            if (product.leftover !== 0) {
                basketBlock.append(product.getTemplate());
                let element = basketBlock.children().eq(i++);
                element.on('click', () => basketProductOnClick(element, product));
            }
        });
    }

    updateProductsList();
});