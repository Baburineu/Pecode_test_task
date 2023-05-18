import LoginPage from '../pageobjects/login.page.ts'
import SecurePage from '../pageobjects/secure.page.ts'
import MainPage from '../pageobjects/main.page.ts';
import ProductPage from '../pageobjects/product.page.ts';
import Modal from '../pageobjects/components/modal.component.ts';


describe('Testing Allo marketplace', () => {
    it('TC-001: Verify if the price filter working correctly for the following marketplace', async () => {
        //TODO:
        // Summary: “Verify if the price filter working
        // correctly for the following marketplaces”
        // 1. Open marketplace url. Verify it.
        // 2. Open category and subcategory if it is necessary.
        // 3. Navigate to the filters section, for the following
        // marketplaces it is located on the left side. Apply 2 3 filters.
        // 4.Verify that all the items on the page are sorted
        // correctly by the from and to price filters you entered.

        const filterOptions = {
            'Виробник': 'Apple',
            'Ємність акумулятора': '3000 - 3999 мАг',
            'Рік випуску': '2019'
        }

        await MainPage.openAndVerifyURL();
        await MainPage.navigateToCategory('Смартфони та телефони', 'Samsung');
        await MainPage.selectFilterByPrice(5000, 30000);
        await MainPage.selectFilterBySectionAndType(filterOptions);
        await expect(MainPage.verifyPriceFilterApplied(5000, 30000)).toBeTruthy();
        await MainPage.selectSortBy('від дешевих до дорогих')
        await expect(MainPage.verifyItemsSortedByPrice()).toBeTruthy();
    })

    it('TC-002: Add items to the basket', async () => {
        //TODO:
        // Summary: Add items to the basket”
        // 1. Open marketplace url. Verify it.
        // 2. Open category and subcategory if it is necessary.
        // 3. Add any item to the basket.
        // 4. Select another category and add an item from that category.
        // 5. Verify information of items inside the basket.
        // 6. Verify that the price is calculated correctly.
        // 7. Verify that the delete item button is clickable.

        const itemsToBuy = ['Apple iPhone 13 128GB Starlight (MLPG3)', 'Apple iPad Air 2022 Wi-Fi 64GB Starlight'];
        const expectedBasketInfo = [
            ['Apple iPhone 13 128GB Starlight (MLPG3)', 1, 31499],
            ['Планшет Apple iPad Air 2022 Wi-Fi 64GB Starlight (MM9F3)', 1, 29499]
        ]

        await MainPage.openAndVerifyURL();
        await MainPage.navigateToCategory('Смартфони та телефони', 'Apple');
        await MainPage.addItemToBasket(itemsToBuy[0]);
        await Modal.closeModalBasket()
        await MainPage.openCatalog()
        await MainPage.navigateToCategory('Apple', 'iPad Air 2022')
        await MainPage.openProductPage(itemsToBuy[1]);
        await ProductPage.productBuy()
        await Modal.closeModalBasket()
        await MainPage.verifyBasketItemCount(itemsToBuy.length);
        await MainPage.verifyBasketItemInfo(expectedBasketInfo);
        await MainPage.verifyBasketTotalPrice();
        await MainPage.verifyBasketDeleteButton('Air');
    })

    it('TC-003: Search the item', async () => {
        //TODO:
        // Summary: “Search the item”
        // 1. Open marketplace url. Verify it.
        // 2. Search random item by name.
        // 3. Verify that all items are correctly displayed according to your searching request (only on the first page)

        const itemsNames = ['Samsung Galaxy S23', 'Microsoft Surface', 'pro max'];
        const randomIndex = Math.floor(Math.random() * itemsNames.length);

        await MainPage.openAndVerifyURL();
        await expect(browser).toHaveTitle('АЛЛО - національний маркетплейс із найширшим асортиментом');
        await MainPage.searchItem(itemsNames[randomIndex]);
        await MainPage.verifySearchResults(itemsNames[randomIndex]);
    });

    it('TC-004: One of your test cases should be failed', async () => {
        //TODO: 1 your own test. One of your test cases should be failed.
        const itemName = 'apple pad';

        await MainPage.openAndVerifyURL();
        await MainPage.searchItem(itemName);

        // TODO: Report a bug: After searching for "apple pad", only two "Apple Pencil" are found in the
        //  result
        await MainPage.verifySearchResults(itemName);
    });
})
