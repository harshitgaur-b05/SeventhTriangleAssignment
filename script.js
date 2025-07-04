// https://interveiw-mock-api.vercel.app/api/getProducts

(async function () {
   
    async function FetchData(){
        const res = await fetch('https://interveiw-mock-api.vercel.app/api/getProducts')
        const object = await res.json();

        const data = object.data
        console.log(data[0]);
     
        return data;
    }

    function buildCard({img, title, price}){
        //create elemets
        //4 section in card image title price addto cart 
        const card = document.createElement('div');
        const imageSection = document.createElement('div');
        const image = document.createElement('img');
        card.className = 'product-card';
        imageSection.className = 'image-section';
        // 1. Image section
        image.setAttribute('src', img);
        image.setAttribute('class', 'image_part')
        imageSection.appendChild(image)
        
        
        // 2. Title section
        const titleSection = document.createElement('section');
        const titleElement = document.createElement('h3');
        titleSection.className = 'title-section';
        titleElement.textContent = title;
        titleSection.appendChild(titleElement);
        // 3. Price section
        const priceSection = document.createElement('section');
        priceSection.className = 'price-section';

        const priceElement = document.createElement('p');
        priceElement.textContent = 'Rs. ' + price;

        priceSection.appendChild(priceElement);

        // 4. Add to cart section
        const addToCartSection = document.createElement('section');
        addToCartSection.className = 'add_to_cart_section';

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'ADD TO CART';

        // Add hover effect
        addToCartButton.addEventListener('mouseenter', () => {
            addToCartButton.style.background = '#1e293b';
        });

        addToCartButton.addEventListener('mouseleave', () => {
            addToCartButton.style.background = '#334155';
        });

        addToCartSection.appendChild(addToCartButton);

        // Assemble the card
        card.appendChild(imageSection);
        card.appendChild(titleSection);
        card.appendChild(priceSection);
        card.appendChild(addToCartSection);

        return card;
    }

    //for extracting card details 
    async function Card({product}){
        
        const {title, image, variants} = product
        const prodImg = image.src;
        const price = variants[0].price
        console.log(title, price, prodImg);

        const card = buildCard({ img: prodImg, title, price });
        prodSection.appendChild(card)
    }

    const apiData = await FetchData();
    const selectedSort = document.getElementById('sortSelect')

    //sorting logic
    let sortedData = [...apiData]
    
    if(selectedSort){
        selectedSort.addEventListener('change', (e) => {
            e.preventDefault();
            const selectedOption = e.target.value;
            console.log(selectedOption);
           
            // Clear existing products before rendering sorted ones
            prodSection.innerHTML = '';
            
            if(selectedOption === 'low'){
                sortedData.sort((a, b) => (
                    a.product.variants[0].price - b.product.variants[0].price
                ))
            }
            else if(selectedOption === 'high'){
                sortedData.sort((a, b) => (
                    b.product.variants[0].price - a.product.variants[0].price
                ))
            }
            else {
                // Reset to original order if no specific sort is selected
                sortedData = [...apiData];
            }
            
            renderProducts(sortedData)
        })
    }

    async function renderProducts(dataToRender){
        dataToRender.forEach(element => {
            Card(element)
        });
    }

    const productPanel = document.getElementById('productPannel_h2')
    productPanel.textContent = `${apiData.length} Products`
    const emptylp = document.getElementById('empty-space-id')
    const prodSection = document.getElementById('product_showcase')
    const btnld = document.getElementById('load-btn');

    btnld.addEventListener('click', (e) => {
        e.preventDefault()
        btnld.innerHTML = `<div class="loader"></div>`
        setTimeout(() => {
            emptylp.style.display = 'none';
            prodSection.style.display = "grid";
            renderProducts(sortedData);
        }, 2000)
    })

})();