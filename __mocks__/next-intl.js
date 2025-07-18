const React = require('react');

module.exports = {
  __esModule: true,
  useTranslations: () => {
    const translate = (key, opts = {}) => {
      switch (key) {
        case 'rating_count':
          return `${opts.rating} (${opts.count})`;
        case 'pagination_info':
          return `${opts.startItem}-${opts.endItem} of ${opts.totalItems}`;
        case 'search_by_title':
          return 'Search by title...';
        case 'search_lbl':
          return 'Search';
        case 'search_products':
          return 'Search Products';
        case 'min':
          return 'Min';
        case 'max':
          return 'Max';
        case 'category':
          return 'Category';
        case 'products':
          return 'Products';
        case 'my_store':
          return 'My Store';
        case 'shopping_cart':
          return 'Shopping Cart';
        case 'cart':
          return 'Sepet';
        case 'cart_empty':
          return 'Your cart is empty';
        case 'cart_empty_desc':
          return 'Start shopping to add items to your cart.';
        case 'continue_shopping':
          return 'Continue Shopping';
        case 'add_to_cart':
          return 'Add to Cart';
        case 'currency':
          return `$${opts.price}`;
        case 'all_categories':
          return 'All Categories';
        case 'sort_by':
          return 'Sort By';
        case 'default':
          return 'Default';
        case 'price_low_to_high':
          return 'Price: Low to High';
        case 'price_high_to_low':
          return 'Price: High to Low';
        case 'rating':
          return 'Rating';
        case 'title_az':
          return 'Title A-Z';
        case 'price_range':
          return 'Price Range';
        case 'clear_filters':
          return 'Clear Filters';
        case 'add_quantity_to_cart':
          return `Add ${opts.quantity ?? 1} to Cart`;
        case 'quantity':
          return 'Quantity';
        case 'no_products_found':
          return 'No products found';
        case 'no_products_found_desc':
          return 'Try adjusting your filters or search.';
        case 'home':
          return 'Home';
        default:
          return key;
      }
    };
    return translate;
  },
  useFormatter: () => ((val) => val),
  defineRouting: (config) => config,
  NextIntlClientProvider: function MockNextIntlClientProvider({ children }) {
    return React.createElement(React.Fragment, null, children);
  },
  default: function NextIntlClientProvider({ children }) { return React.createElement(React.Fragment, null, children); },
};
